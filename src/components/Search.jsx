import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaSearch, FaTimes, FaSpinner } from 'react-icons/fa';

const API_KEY = '3308647fabe47a844ab269e6eab19132';
const BASE_URL = 'https://api.themoviedb.org/3';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const searchMovies = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      setIsLoading(true);

      try {
        const encodedQuery = encodeURIComponent(query);
        const [moviesRes, showsRes] = await Promise.all([
          axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodedQuery}`),
          axios.get(`${BASE_URL}/search/tv?api_key=${API_KEY}&query=${encodedQuery}`)
        ]);

        const combinedResults = [
          ...moviesRes.data.results.map(item => ({ ...item, type: 'movie' })),
          ...showsRes.data.results.map(item => ({ ...item, type: 'tv' }))
        ]
          .sort((a, b) => b.popularity - a.popularity)
          .slice(0, 6);
        
        setResults(combinedResults);
      } catch (error) {
        console.error('Error searching:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      searchMovies();
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleSelect = (item) => {
    setQuery('');
    setResults([]);
    navigate(`/${item.type}/${item.id}`);
  };

  return (
    <div className="relative" ref={searchRef}>
      <div className="flex items-center bg-secondary/80 backdrop-blur-sm rounded-lg px-4 py-2">
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
          className="bg-transparent text-white outline-none w-64 placeholder-gray-400"
          autoComplete="off"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setResults([]);
            }}
            className="text-gray-400 hover:text-white ml-2"
          >
            <FaTimes />
          </button>
        )}
      </div>

      {query && (results.length > 0 || isLoading) && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-secondary/95 backdrop-blur-sm rounded-lg shadow-lg z-50 overflow-hidden border border-white/10">
          {isLoading ? (
            <div className="p-2 text-center text-gray-400">
              <FaSpinner className="animate-spin" />
            </div>
          ) : (
            <div>
              {results.map((item) => (
                <div
                  key={`${item.type}-${item.id}`}
                  onClick={() => handleSelect(item)}
                  className="flex items-center gap-3 p-2 hover:bg-white/10 cursor-pointer transition-colors"
                >
                  <img
                    src={item.poster_path 
                      ? `https://image.tmdb.org/t/p/w92${item.poster_path}`
                      : '/placeholder.jpg'}
                    alt={item.title || item.name}
                    className="w-10 h-14 object-cover rounded"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = '/placeholder.jpg';
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white text-sm font-medium truncate">
                      {item.title || item.name}
                    </h3>
                    <p className="text-gray-400 text-xs">
                      {item.type === 'movie' ? 'Movie' : 'TV Show'} • {
                        new Date(item.release_date || item.first_air_date).getFullYear() || 'N/A'
                      }
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search; 