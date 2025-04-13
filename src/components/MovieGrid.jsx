import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import MovieCard from './MovieCard';
import './MovieGrid.css';

const MovieGrid = ({ movies, title }) => {
  const gridRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const gridItems = gridRef.current?.querySelectorAll('.grid-item') || [];
    gridItems.forEach((item) => observer.observe(item));

    return () => {
      gridItems.forEach((item) => observer.unobserve(item));
    };
  }, [movies]);

  if (!movies || movies.length === 0) {
    return (
      <div className="movie-section">
        <h2 className="section-title">{title}</h2>
        <p className="no-movies">No movies available</p>
      </div>
    );
  }

  return (
    <section className="py-8" ref={gridRef}>
      {title && (
        <div className="container mx-auto px-4 mb-6">
          <h2 className="text-2xl font-bold text-white">
            <span className="text-gradient">{title}</span>
          </h2>
        </div>
      )}
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {movies.map((movie, index) => (
            <div 
              key={`${movie.type}-${movie.id}`}
              className="grid-item opacity-0"
              style={{ '--item-index': index }}
            >
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

MovieGrid.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string,
      name: PropTypes.string,
      poster_path: PropTypes.string,
      vote_average: PropTypes.number,
      release_date: PropTypes.string,
      first_air_date: PropTypes.string,
      type: PropTypes.string
    })
  ).isRequired,
  title: PropTypes.string
};

export default MovieGrid; 