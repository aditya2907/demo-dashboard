import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, List, ListItem, Typography } from '@mui/material';

const GlobalSearchTool = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.post('http://localhost:5000/search', { query });
            setResults(response.data);
        } catch (error) {
            console.error('Search error:', error);
        }
    };

    return (
        <div>
            <h1>Global Database Search Tool</h1>
            <TextField
                label="Search Query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                variant="outlined"
                fullWidth
                margin="normal"
            />
            <Button variant="contained" onClick={handleSearch}>
                Search
            </Button>
            <div>
                {results.length > 0 ? (
                    results.map((result, index) => (
                        <List key={index}>
                            <ListItem>
                                <Typography>
                                    <strong>Table:</strong> {result.table} | <strong>Column:</strong> {result.column} | <strong>Value:</strong> {result.value}
                                </Typography>
                            </ListItem>
                        </List>
                    ))
                ) : (
                    <Typography>No results found.</Typography>
                )}
            </div>
        </div>
    );
};

export default GlobalSearchTool;