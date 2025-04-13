import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaPlay } from 'react-icons/fa';

const API_KEY = '3308647fabe47a844ab269e6eab19132';
const BASE_URL = 'https://api.themoviedb.org/3';

const TrendingBanner = () => {
  const [trending, setTrending] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const [moviesRes, showsRes] = await Promise.all([
          axios.get(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`),
          axios.get(`${BASE_URL}/trending/tv/day?api_key=${API_KEY}`)
        ]);

        const movies = moviesRes.data.results.slice(0, 5).map(item => ({
          ...item,
          type: 'movie'
        }));
        const shows = showsRes.data.results.slice(0, 5).map(item => ({
          ...item,
          type: 'tv',
          title: item.name
        }));

        setTrending([...movies, ...shows]);
      } catch (error) {
        console.error('Error fetching trending:', error);
      }
    };

    fetchTrending();
  }, []);

  useEffect(() => {
    if (trending.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % trending.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [trending]);

  if (trending.length === 0) return null;

  const current = trending[currentIndex];

  return (
    <div className="bg-gradient-to-r from-black via-primary to-transparent h-12 flex items-center">
      <div className="container mx-auto px-4">
        <Link 
          to={`/${current.type}/${current.id}`}
          className="flex items-center gap-3 group"
        >
          <div className="flex items-center gap-2 text-accent">
            <FaPlay className="w-3 h-3" />
            <span className="text-sm font-medium uppercase tracking-wider">
              Trending Now
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-white/60">•</span>
            <h3 className="text-sm text-white/90 font-medium truncate group-hover:text-accent transition-colors">
              {current.title}
            </h3>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default TrendingBanner; 