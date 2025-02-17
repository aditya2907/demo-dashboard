@app.route('/search', methods=['POST'])
def search_database():
    """Perform a Full-Text Search."""
    try:
        data = request.json
        keyword = data.get("query", "")

        if not keyword:
            return jsonify({"error": "Query parameter is required"}), 400

        conn = get_db_connection()
        cursor = conn.cursor()

        # Full-Text Query
        query = """
            SELECT TableName, ColumnName, Value
            FROM CONTAINSTABLE(YourTable, YourColumn, ?)
        """
        cursor.execute(query, keyword)

        # Fetch results
        results = [{"table": row[0], "column": row[1], "value": row[2]} for row in cursor.fetchall()]
        return jsonify(results)

    except Exception as e:
        return jsonify({"error": str(e)})
    finally:
        if 'cursor' in locals():
            cursor.close()
        if 'conn' in locals():
            conn.close()