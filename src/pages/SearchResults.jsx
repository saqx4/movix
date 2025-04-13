import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import SectionHeader from '../components/SectionHeader';
import { FaSpinner } from 'react-icons/fa';

const API_KEY = '3308647fabe47a844ab269e6eab19132';
const BASE_URL = 'https://api.themoviedb.org/3';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const encodedQuery = encodeURIComponent(query);
        const [moviesRes, showsRes] = await Promise.all([
          axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodedQuery}`),
          axios.get(`${BASE_URL}/search/tv?api_key=${API_KEY}&query=${encodedQuery}`)
        ]);

        const combinedResults = [
          ...moviesRes.data.results.map(item => ({ ...item, type: 'movie' })),
          ...showsRes.data.results.map(item => ({ ...item, type: 'tv' }))
        ].sort((a, b) => b.popularity - a.popularity);

        setResults(combinedResults);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setError('Failed to fetch search results. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (!query) {
    return (
      <div className="container mx-auto px-4 py-8">
        <SectionHeader title="Search Results" />
        <p className="text-gray-400 text-center mt-8">Please enter a search query.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <SectionHeader title={`Search Results for "${query}"`} />
      
      {loading ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <FaSpinner className="text-4xl text-accent animate-spin" />
        </div>
      ) : error ? (
        <div className="text-red-500 text-center mt-8">{error}</div>
      ) : results.length === 0 ? (
        <p className="text-gray-400 text-center mt-8">No results found for "{query}"</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-8">
          {results.map((item) => (
            <MovieCard
              key={`${item.type}-${item.id}`}
              movie={{
                ...item,
                title: item.title || item.name,
                release_date: item.release_date || item.first_air_date,
                type: item.type
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults; 