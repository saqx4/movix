import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const MovieCard = ({ movie, type }) => {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <Link 
      to={`/${type}/${movie.id}`}
      className="group relative block overflow-hidden rounded-lg bg-gray-900 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="aspect-[2/3] w-full">
        <img
          src={imageUrl}
          alt={movie.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
          <h3 className="text-sm font-medium text-white line-clamp-2 mb-1">
            {movie.title}
          </h3>
          <div className="flex items-center gap-2">
            <FaStar className="text-yellow-400 text-xs" />
            <span className="text-xs font-medium text-gray-300">
              {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
            </span>
            <span className="text-xs text-gray-400">
              {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    poster_path: PropTypes.string,
    vote_average: PropTypes.number,
    release_date: PropTypes.string
  }).isRequired,
  type: PropTypes.oneOf(['movie', 'tv']).isRequired
};

export default MovieCard; 