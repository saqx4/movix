import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaCalendarAlt, FaClock, FaStar } from 'react-icons/fa';
import VideoPlayer from '../components/VideoPlayer';

const API_KEY = '3308647fabe47a844ab269e6eab19132';
const BASE_URL = 'https://api.themoviedb.org/3';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=credits,videos`
        );
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie:', error);
        setError('Failed to fetch movie details');
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white">
        <p className="text-xl mb-4">{error || 'Movie not found'}</p>
        <button 
          onClick={() => window.history.back()}
          className="px-6 py-2 bg-accent rounded-lg hover:bg-accent/80 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-primary pt-16">
      {/* Backdrop */}
      <div 
        className="absolute top-0 left-0 right-0 h-[60vh] bg-cover bg-center bg-no-repeat opacity-20"
        style={{ 
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          maskImage: 'linear-gradient(to top, transparent, black)',
          WebkitMaskImage: 'linear-gradient(to top, transparent, black)'
        }}
      />

      <div className="container mx-auto px-4 relative">
        {showVideo ? (
          <div className="mb-8 rounded-xl overflow-hidden shadow-2xl">
            <VideoPlayer type="movie" id={id} />
          </div>
        ) : (
          <div className="grid md:grid-cols-[300px,1fr] gap-8">
            {/* Poster */}
            <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-2xl">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl font-bold text-white mb-4">{movie.title}</h1>
              
              <div className="flex flex-wrap gap-4 mb-6 text-sm">
                <div className="flex items-center gap-2 text-gray-300">
                  <FaCalendarAlt className="text-accent" />
                  {new Date(movie.release_date).getFullYear()}
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <FaClock className="text-accent" />
                  {movie.runtime} min
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <FaStar className="text-yellow-500" />
                  {movie.vote_average.toFixed(1)}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres.map(genre => (
                  <span 
                    key={genre.id}
                    className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              <p className="text-gray-300 mb-8">{movie.overview}</p>

              <button
                onClick={() => setShowVideo(true)}
                className="self-start px-8 py-3 bg-accent rounded-lg text-white font-semibold
                         hover:bg-accent/80 transition-colors"
              >
                Watch Now
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default MovieDetails; 