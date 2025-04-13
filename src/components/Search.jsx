import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaSearch, FaTimes, FaSpinner } from 'react-icons/fa';

const API_KEY = '3308647fabe47a844ab269e6eab19132';
const BASE_URL = 'https://api.themoviedb.org/3';

// Cache to store search results
const searchCache = new Map();

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const performSearch = useCallback(async (searchQuery) => {
    if (searchQuery.length < 2) {
      setResults([]);
      return;
    }

    // Check cache first
    const cachedResults = searchCache.get(searchQuery);
    if (cachedResults) {
      setResults(cachedResults);
      setIsOpen(true);
      return;
    }

    setIsLoading(true);

    try {
      const [moviesRes, showsRes] = await Promise.all([
        axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchQuery}`),
        axios.get(`${BASE_URL}/search/tv?api_key=${API_KEY}&query=${searchQuery}`)
      ]);

      const combinedResults = [
        ...moviesRes.data.results.map(item => ({ ...item, type: 'movie' })),
        ...showsRes.data.results.map(item => ({ ...item, type: 'tv' }))
      ]
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, 5);

      // Cache the results
      searchCache.set(searchQuery, combinedResults);
      
      setResults(combinedResults);
      setIsOpen(true);
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      performSearch(query);
    }, 500); // Increased debounce time to 500ms

    return () => clearTimeout(debounceTimer);
  }, [query, performSearch]);

  const handleSelect = (item) => {
    navigate(`/${item.type}/${item.id}`);
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={searchRef}>
      <div className="flex items-center bg-secondary rounded-lg px-4 py-2">
        {isLoading ? (
          <FaSpinner className="text-gray-400 mr-2 animate-spin" />
        ) : (
          <FaSearch className="text-gray-400 mr-2" />
        )}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies and TV shows..."
          className="bg-transparent text-white outline-none w-64"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setResults([]);
              setIsLoading(false);
            }}
            className="text-gray-400 hover:text-white"
          >
            <FaTimes />
          </button>
        )}
      </div>

      {isOpen && (results.length > 0 || isLoading) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-secondary rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-400">
              <FaSpinner className="animate-spin mx-auto mb-2" />
              <p>Searching...</p>
            </div>
          ) : (
            results.map((item) => (
              <div
                key={`${item.type}-${item.id}`}
                onClick={() => handleSelect(item)}
                className="flex items-center p-3 hover:bg-primary cursor-pointer"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
                  alt={item.title || item.name}
                  className="w-12 h-16 object-cover rounded"
                  loading="lazy"
                />
                <div className="ml-3">
                  <h3 className="text-white font-medium">
                    {item.title || item.name}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {item.type === 'movie' ? 'Movie' : 'TV Show'}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Search; 