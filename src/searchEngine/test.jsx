from flask import Flask, request, jsonify
from flask_cors import CORS
import pyodbc
import math

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Database connection setup
DB_CONFIG = {
    'server': 'YOUR_SERVER_NAME',
    'database': 'YOUR_DATABASE_NAME',
    'username': 'YOUR_USERNAME',
    'password': 'YOUR_PASSWORD'
}

def get_db_connection():
    conn = pyodbc.connect(
        f"DRIVER={{ODBC Driver 17 for SQL Server}};"
        f"SERVER={DB_CONFIG['server']};"
        f"DATABASE={DB_CONFIG['database']};"
        f"UID={DB_CONFIG['username']};"
        f"PWD={DB_CONFIG['password']}"
    )
    return conn

def get_table_column_mapping():
    """Fetch table and column mappings from INFORMATION_SCHEMA.COLUMNS."""
    table_column_mapping = {}
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        # Query to get table and column names
        cursor.execute("SELECT TABLE_NAME, COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS")
        for row in cursor.fetchall():
            table_name = row[0]
            column_name = row[1]
            if table_name not in table_column_mapping:
                table_column_mapping[table_name] = []
            table_column_mapping[table_name].append(column_name)
        cursor.close()
        conn.close()
    except Exception as e:
        print(f"Error fetching table-column mapping: {e}")
    return table_column_mapping

@app.route('/search', methods=['GET'])
def search():
    query = request.args.get('query', '')  # Get the search query
    page = int(request.args.get('page', 1))  # Pagination: current page
    per_page = int(request.args.get('per_page', 10))  # Results per page

    if not query:
        return jsonify({'error': 'No search query provided'}), 400

    try:
        TABLES_TO_SEARCH = get_table_column_mapping()  # Fetch dynamic table-column mapping
        results = []
        conn = get_db_connection()
        cursor = conn.cursor()

        # Search through each table and its columns
        for table, columns in TABLES_TO_SEARCH.items():
            where_clause = " OR ".join([f"{col} LIKE ?" for col in columns])
            sql_query = f"SELECT * FROM {table} WHERE {where_clause}"

            # Execute query with parameterized input
            cursor.execute(sql_query, *[f"%{query}%" for _ in columns])
            rows = cursor.fetchall()

            # Add results with table name as metadata
            for row in rows:
                results.append({
                    'table': table,
                    **dict(zip([column[0] for column in cursor.description], row))
                })

        # Pagination logic
        total_count = len(results)
        start_index = (page - 1) * per_page
        end_index = start_index + per_page
        paginated_results = results[start_index:end_index]

        cursor.close()
        conn.close()

        return jsonify({
            'results': paginated_results,
            'total': total_count,
            'page': page,
            'pages': math.ceil(total_count / per_page)
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)