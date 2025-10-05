import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SearchBar({ onResults }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    // Debounce search input to avoid excessive calls
    const delayDebounce = setTimeout(() => {
      if (query.trim() === '') {
        onResults([]); // empty results if no query
        return;
      }

      axios.get(`http://localhost:3000/api/employees/search?name=${query}`)
        .then(res => onResults(res.data))
        .catch(err => {
          console.error('Search error:', err);
          onResults([]);
        });
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query, onResults]);

  return (
    <input
      type="text"
      placeholder="Search employees by name..."
      value={query}
      onChange={e => setQuery(e.target.value)}
      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 my-4"
    />
  );
}

export default SearchBar;
