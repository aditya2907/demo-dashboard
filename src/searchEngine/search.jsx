import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchTool = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchResults = async (searchQuery, currentPage = 1) => {
    try {
      setError('');
      const response = await axios.get('http://localhost:5000/search', {
        params: {
          query: searchQuery,
          page: currentPage,
          per_page: 10, // Results per page
        },
      });

      setResults(response.data.results);
      setTotalPages(response.data.pages);
    } catch (err) {
      setError('Error fetching search results. Please try again.');
    }
  };

  const handleSearch = () => {
    setPage(1);
    fetchResults(query, 1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchResults(query, newPage);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>SQL Server Search Tool</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter search term"
        style={{ marginRight: '10px', padding: '5px' }}
      />
      <button onClick={handleSearch} style={{ padding: '5px 10px' }}>
        Search
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ marginTop: '20px' }}>
        {results.length > 0 ? (
          <>
            <p>Showing results for "{query}" (Page {page} of {totalPages}):</p>
            {results.map((row, index) => (
              <div key={index} style={{ marginBottom: '10px' }}>
                <strong>Table: {row.table}</strong>
                <ul>
                  {Object.entries(row).map(([key, value]) =>
                    key !== 'table' ? <li key={key}>{key}: {value}</li> : null
                  )}
                </ul>
              </div>
            ))}

            {/* Pagination Controls */}
            <div style={{ marginTop: '20px' }}>
              {page > 1 && (
                <button onClick={() => handlePageChange(page - 1)}>Previous</button>
              )}
              {page < totalPages && (
                <button onClick={() => handlePageChange(page + 1)}>Next</button>
              )}
            </div>
          </>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchTool;