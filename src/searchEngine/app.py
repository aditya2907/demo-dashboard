from flask import Flask, request, jsonify
import pyodbc
from fuzzywuzzy import fuzz

app = Flask(__name__)

# Configure database connection
DB_CONFIG = {
    "server": "your_server_name",
    "database": "your_database_name",
    "username": "your_username",
    "password": "your_password"
}

def get_db_connection():
    conn_str = f"DRIVER={{ODBC Driver 17 for SQL Server}};SERVER={DB_CONFIG['server']};DATABASE={DB_CONFIG['database']};UID={DB_CONFIG['username']};PWD={DB_CONFIG['password']}"
    return pyodbc.connect(conn_str)

def get_all_tables_and_columns():
    """Fetch all tables and their columns in the database."""
    conn = get_db_connection()
    cursor = conn.cursor()
    query = """
        SELECT TABLE_NAME, COLUMN_NAME
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_SCHEMA = 'dbo'
    """
    cursor.execute(query)
    results = cursor.fetchall()
    cursor.close()
    conn.close()
    return [{"table": row[0], "column": row[1]} for row in results]

@app.route('/search', methods=['POST'])
def search_database():
    """Search a keyword across all tables and columns in the database."""
    try:
        data = request.json
        keyword = data.get("query", "")

        if not keyword:
            return jsonify({"error": "Query parameter is required"}), 400

        # Get schema details
        schema = get_all_tables_and_columns()
        conn = get_db_connection()
        cursor = conn.cursor()

        results = []
        for entry in schema:
            table, column = entry['table'], entry['column']
            try:
                # Dynamic query for each column
                query = f"SELECT '{table}' AS TableName, '{column}' AS ColumnName, {column} AS Value FROM {table} WHERE CAST({column} AS NVARCHAR(MAX)) LIKE ?"
                cursor.execute(query, f"%{keyword}%")
                matches = cursor.fetchall()
                for match in matches:
                    results.append({
                        "table": match[0],
                        "column": match[1],
                        "value": match[2]
                    })
            except Exception as e:
                # Ignore tables/columns that cause errors (e.g., permissions, incompatible types)
                continue

        # Optional: Fuzzy match ranking
        if not results:
            all_values = [{"table": entry['table'], "column": entry['column'], "value": row[0]}
                          for entry in schema
                          for row in cursor.execute(f"SELECT {entry['column']} FROM {entry['table']}")]
            results = [
                result for result in all_values if fuzz.partial_ratio(keyword.lower(), str(result["value"]).lower()) > 70
            ]

        return jsonify(results)

    except Exception as e:
        return jsonify({"error": str(e)})
    finally:
        cursor.close()
        conn.close()

if __name__ == "__main__":
    app.run(debug=True)