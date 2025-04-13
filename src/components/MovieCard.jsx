import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaStar, FaPlay } from 'react-icons/fa';

const MovieCard = ({ movie }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/placeholder.jpg';

  return (
    <Link 
      to={`/${movie.type || 'movie'}/${movie.id}`}
      className="movie-card group relative block overflow-hidden rounded-lg bg-secondary"
      style={{ '--item-index': Math.random() * 5 }}
    >
      <div className="aspect-[2/3] relative overflow-hidden">
        {/* Loading shimmer effect */}
        <div className={`absolute inset-0 loading-shimmer ${isLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`} />
        
        {/* Movie poster */}
        <img
          src={imageUrl}
          alt={movie.title || movie.name}
          className={`w-full h-full object-cover transform transition-all duration-500 group-hover:scale-110 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsLoaded(true)}
          onError={(e) => {
            e.target.src = '/placeholder.jpg';
            setIsLoaded(true);
          }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transform group-hover:scale-100 scale-50 transition-all duration-300">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-accent/80 text-white backdrop-blur-sm">
            <FaPlay className="w-6 h-6 ml-1" />
          </div>
        </div>
      </div>

      {/* Content overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 overlay">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-accent/20 backdrop-blur-sm px-2 py-1 rounded-full">
              <FaStar className="w-3 h-3 text-accent" />
              <span className="text-xs font-medium">
                {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
              </span>
            </div>
            <span className="text-xs text-gray-300">
              {new Date(movie.release_date || movie.first_air_date).getFullYear() || 'N/A'}
            </span>
          </div>
          
          <h3 className="text-sm font-medium line-clamp-2 text-white group-hover:text-accent transition-colors">
            {movie.title || movie.name}
          </h3>
        </div>
      </div>

      {/* Hover border effect */}
      <div className="absolute inset-0 border-2 border-accent/0 group-hover:border-accent/50 rounded-lg transition-all duration-300" />
    </Link>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    name: PropTypes.string,
    poster_path: PropTypes.string,
    vote_average: PropTypes.number,
    release_date: PropTypes.string,
    first_air_date: PropTypes.string,
    type: PropTypes.string
  }).isRequired
};

export default MovieCard; 