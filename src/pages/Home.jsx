import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaStar, FaSpinner } from 'react-icons/fa';
import SectionHeader from '../components/SectionHeader';
import MovieGrid from '../components/MovieGrid';
import MovieCard from '../components/MovieCard';
import { fetchTrendingMovies, fetchTopRatedMovies } from '../services/api';

const API_KEY = '3308647fabe47a844ab269e6eab19132';
const BASE_URL = 'https://api.themoviedb.org/3';

const Home = () => {
  const [topMovies, setTopMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [trendingShows, setTrendingShows] = useState([]);
  const [popularShows, setPopularShows] = useState([]);
  const [topShows, setTopShows] = useState([]);
  const [showGrid, setShowGrid] = useState(false);
  const [gridCategory, setGridCategory] = useState('');
  const [gridType, setGridType] = useState('movie');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('movies');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          trendingMoviesRes, 
          popularMoviesRes, 
          topMoviesRes, 
          trendingShowsRes,
          popularShowsRes,
          topShowsRes
        ] = await Promise.all([
          axios.get(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`),
          axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}`),
          axios.get(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`),
          axios.get(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}`),
          axios.get(`${BASE_URL}/tv/popular?api_key=${API_KEY}`),
          axios.get(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}`)
        ]);

        setTrendingMovies(trendingMoviesRes.data.results.slice(0, 10));
        setPopularMovies(popularMoviesRes.data.results.slice(0, 10));
        setTopMovies(topMoviesRes.data.results.slice(0, 10));
        setTrendingShows(trendingShowsRes.data.results.slice(0, 10));
        setPopularShows(popularShowsRes.data.results.slice(0, 10));
        setTopShows(topShowsRes.data.results.slice(0, 10));
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch content. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleViewAll = (category, type = 'movie') => {
    setGridCategory(category);
    setGridType(type);
    setShowGrid(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-primary">
      <div className="container mx-auto px-4 pt-20 pb-8">
        {/* Movies Sections */}
        <section className="mb-12">
          <SectionHeader 
            title="Trending Movies" 
            type="movie"
            category="trending"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {trendingMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} type="movie" />
            ))}
          </div>
        </section>

        <section className="mb-12">
          <SectionHeader 
            title="Popular Movies" 
            type="movie"
            category="popular"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {popularMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} type="movie" />
            ))}
          </div>
        </section>

        <section className="mb-12">
          <SectionHeader 
            title="Top Rated Movies" 
            type="movie"
            category="top_rated"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {topMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} type="movie" />
            ))}
          </div>
        </section>

        {/* TV Shows Sections */}
        <section className="mb-12">
          <SectionHeader 
            title="Trending TV Shows" 
            type="tv"
            category="trending"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {trendingShows.map(show => (
              <MovieCard 
                key={show.id} 
                movie={{
                  ...show,
                  title: show.name,
                  release_date: show.first_air_date
                }} 
                type="tv" 
              />
            ))}
          </div>
        </section>

        <section className="mb-12">
          <SectionHeader 
            title="Popular TV Shows" 
            type="tv"
            category="popular"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {popularShows.map(show => (
              <MovieCard 
                key={show.id} 
                movie={{
                  ...show,
                  title: show.name,
                  release_date: show.first_air_date
                }} 
                type="tv" 
              />
            ))}
          </div>
        </section>

        <section className="mb-12">
          <SectionHeader 
            title="Top Rated TV Shows" 
            type="tv"
            category="top_rated"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {topShows.map(show => (
              <MovieCard 
                key={show.id} 
                movie={{
                  ...show,
                  title: show.name,
                  release_date: show.first_air_date
                }} 
                type="tv" 
              />
            ))}
          </div>
        </section>

        {showGrid && (
          <MovieGrid
            category={gridCategory}
            type={gridType}
            onClose={() => setShowGrid(false)}
          />
        )}
      </div>
    </main>
  );
};

export default Home; 