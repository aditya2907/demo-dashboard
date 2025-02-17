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

# Define table-column mapping
TABLES_TO_SEARCH = {
    'Table1': ['Column1', 'Column2'],
    'Table2': ['Column3', 'Column4'],
    'Table3': ['Column5']
}

@app.route('/search', methods=['GET'])
def search():
    query = request.args.get('query', '')  # Get the search query
    page = int(request.args.get('page', 1))  # Pagination: current page
    per_page = int(request.args.get('per_page', 10))  # Results per page

    if not query:
        return jsonify({'error': 'No search query provided'}), 400

    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        results = []
        total_count = 0

        for table, columns in TABLES_TO_SEARCH.items():
            # Build dynamic SQL query for each table
            where_clause = " OR ".join([f"{col} LIKE ?" for col in columns])
            sql_query = f"SELECT * FROM {table} WHERE {where_clause}"

            # Execute query
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