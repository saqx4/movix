import { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaStar, FaTimes } from 'react-icons/fa';

const API_KEY = '3308647fabe47a844ab269e6eab19132';
const BASE_URL = 'https://api.themoviedb.org/3';

const RelatedMovies = ({ type, id, genre, onClose }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const lastMovieElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        let endpoint;
        if (type === 'similar') {
          endpoint = `${BASE_URL}/${genre}/${id}/similar?api_key=${API_KEY}&page=${page}`;
        } else {
          endpoint = `${BASE_URL}/discover/${genre}?api_key=${API_KEY}&with_genres=${type}&page=${page}`;
        }
        
        const response = await axios.get(endpoint);
        const newMovies = response.data.results;
        
        setMovies(prev => [...prev, ...newMovies]);
        setHasMore(newMovies.length > 0);
      } catch (error) {
        console.error('Error fetching related movies:', error);
      }
      setLoading(false);
    };

    fetchMovies();
  }, [page, type, id, genre]);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 overflow-y-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white">
            {type === 'similar' ? 'Similar Movies' : `${type} Movies`}
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-accent transition-colors"
          >
            <FaTimes size={24} />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {movies.map((movie, index) => {
            const isLastElement = index === movies.length - 1;
            return (
              <Link
                key={movie.id}
                to={`/${genre === 'movie' ? 'movie' : 'tv'}/${movie.id}`}
                ref={isLastElement ? lastMovieElementRef : null}
                className="movie-card group"
                onClick={onClose}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title || movie.name}
                  className="w-full h-[300px] object-cover"
                />
                <div className="movie-card-overlay p-4">
                  <h3 className="text-white font-semibold mb-2">
                    {movie.title || movie.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <FaStar className="text-yellow-400" />
                    <span className="text-white">
                      {movie.vote_average.toFixed(1)}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {loading && (
          <div className="flex justify-center mt-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RelatedMovies; 