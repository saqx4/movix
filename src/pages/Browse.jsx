import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';
import MovieCard from '../components/MovieCard';

const API_KEY = '3308647fabe47a844ab269e6eab19132';
const BASE_URL = 'https://api.themoviedb.org/3';

const CATEGORIES = [
  { id: 'popular', label: 'Popular' },
  { id: 'top_rated', label: 'Top Rated' },
  { id: 'trending', label: 'Trending' },
];

const Browse = () => {
  const { type, category: initialCategory } = useParams();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(initialCategory || 'popular');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const seenIds = useRef(new Set());

  // Reset data when type or category changes
  useEffect(() => {
    setItems([]);
    setPage(1);
    setHasMore(true);
    setLoading(true);
    seenIds.current.clear();
  }, [type, activeCategory]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        let endpoint;
        if (activeCategory === 'trending') {
          endpoint = `${BASE_URL}/trending/${type}/week?api_key=${API_KEY}&page=${page}`;
        } else {
          endpoint = `${BASE_URL}/${type}/${activeCategory}?api_key=${API_KEY}&page=${page}`;
        }

        const response = await axios.get(endpoint);
        const newItems = response.data.results.filter(item => {
          if (seenIds.current.has(item.id)) {
            return false;
          }
          seenIds.current.add(item.id);
          return true;
        });
        
        setItems(prev => page === 1 ? newItems : [...prev, ...newItems]);
        setHasMore(newItems.length > 0 && response.data.page < response.data.total_pages);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch content. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [type, activeCategory, page]);

  const handleScroll = () => {
    if (loading || !hasMore) return;
    
    const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 100;
    if (bottom) {
      setPage(prev => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, loading]);

  const handleCategoryChange = (newCategory) => {
    if (newCategory === activeCategory) return;
    setActiveCategory(newCategory);
    navigate(`/browse/${type}/${newCategory}`);
  };

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
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Link 
              to="/"
              className="text-accent hover:text-accent/80 transition-colors"
            >
              <FaArrowLeft size={20} />
            </Link>
            <h1 className="text-2xl font-bold text-white">
              {type === 'movie' ? 'Movies' : 'TV Shows'}
            </h1>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-4 border-b border-gray-700">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-4 py-2 text-sm font-medium transition-colors relative
                  ${activeCategory === cat.id 
                    ? 'text-accent' 
                    : 'text-gray-400 hover:text-gray-200'
                  }`}
              >
                {cat.label}
                {activeCategory === cat.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"></span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {items.map(item => (
            <MovieCard 
              key={item.id} 
              movie={{
                ...item,
                title: type === 'tv' ? item.name : item.title,
                release_date: type === 'tv' ? item.first_air_date : item.release_date
              }}
              type={type}
            />
          ))}
        </div>

        {loading && (
          <div className="flex justify-center my-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Browse; 