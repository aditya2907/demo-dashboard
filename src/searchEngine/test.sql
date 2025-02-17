CREATE PROCEDURE SearchFullText
    @Keyword NVARCHAR(MAX),         -- The keyword to search
    @TopResults INT = NULL          -- Optional: Limit the number of results (default is unlimited)
AS
BEGIN
    SET NOCOUNT ON;

    -- Temporary table to store results
    CREATE TABLE #SearchResults (
        TableName NVARCHAR(128),
        ColumnName NVARCHAR(128),
        MatchedValue NVARCHAR(MAX)
    );

    -- Declare variables
    DECLARE @TableName NVARCHAR(128);
    DECLARE @ColumnName NVARCHAR(128);
    DECLARE @SQL NVARCHAR(MAX);

    -- Cursor to iterate through all full-text indexed tables and columns
    DECLARE FullTextCursor CURSOR FOR
    SELECT
        OBJECT_NAME(i.object_id) AS TableName,
        c.name AS ColumnName
    FROM sys.fulltext_index_columns fic
    JOIN sys.index_columns ic ON fic.column_id = ic.column_id AND fic.object_id = ic.object_id
    JOIN sys.columns c ON ic.object_id = c.object_id AND ic.column_id = c.column_id
    JOIN sys.fulltext_indexes i ON i.object_id = ic.object_id
    WHERE OBJECTPROPERTY(i.object_id, 'IsFulltextIndexed') = 1;

    OPEN FullTextCursor;

    FETCH NEXT FROM FullTextCursor INTO @TableName, @ColumnName;

    -- Iterate through each full-text indexed column
    WHILE @@FETCH_STATUS = 0
    BEGIN
        -- Build dynamic SQL for each table/column
        SET @SQL = '
            INSERT INTO #SearchResults (TableName, ColumnName, MatchedValue)
            SELECT ''' + @TableName + ''', ''' + @ColumnName + ''', ' + @ColumnName + '
            FROM ' + @TableName + '
            WHERE CONTAINS((' + @ColumnName + '), ''' + @Keyword + ''')';

        -- Execute dynamic SQL
        EXEC sp_executesql @SQL;

        FETCH NEXT FROM FullTextCursor INTO @TableName, @ColumnName;
    END;

    CLOSE FullTextCursor;
    DEALLOCATE FullTextCursor;

    -- Select final results
    IF @TopResults IS NOT NULL
    BEGIN
        SELECT TOP(@TopResults) TableName, ColumnName, MatchedValue
        FROM #SearchResults
        ORDER BY TableName, ColumnName;
    END
    ELSE
    BEGIN
        SELECT TableName, ColumnName, MatchedValue
        FROM #SearchResults
        ORDER BY TableName, ColumnName;
    END;

    -- Drop temporary table
    DROP TABLE #SearchResults;
END;