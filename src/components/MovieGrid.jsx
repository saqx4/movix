import PropTypes from 'prop-types';
import MovieCard from './MovieCard';
import './MovieGrid.css';

const MovieGrid = ({ movies, title }) => {
  if (!movies || movies.length === 0) {
    return (
      <div className="movie-section">
        <h2 className="section-title">{title}</h2>
        <p className="no-movies">No movies available</p>
      </div>
    );
  }

  return (
    <div className="movie-section">
      <h2 className="section-title">{title}</h2>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

MovieGrid.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default MovieGrid; 