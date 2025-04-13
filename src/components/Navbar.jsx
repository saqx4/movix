import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import Logo from './Logo';
import Disclaimer from './Disclaimer';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-secondary/80 backdrop-blur-md shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo />

          {/* Search Bar */}
          <form 
            onSubmit={handleSearch}
            className={`flex-1 max-w-xl mx-8 relative ${
              isSearchFocused ? 'flex' : 'hidden md:flex'
            }`}
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              placeholder="Search movies and TV shows..."
              className="w-full px-4 py-2 bg-gray-900/50 text-white rounded-full 
                       border border-gray-700 focus:border-accent focus:outline-none
                       placeholder:text-gray-400"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 
                       hover:text-accent transition-colors"
            >
              <FaSearch />
            </button>
          </form>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link 
              to="/browse/movie/popular" 
              className="text-gray-300 hover:text-accent transition-colors"
            >
              Movies
            </Link>
            <Link 
              to="/browse/tv/popular" 
              className="text-gray-300 hover:text-accent transition-colors"
            >
              TV Shows
            </Link>
            <Disclaimer />
          </div>

          {/* Mobile Search Toggle */}
          <button
            onClick={() => setIsSearchFocused(prev => !prev)}
            className="md:hidden text-gray-300 hover:text-accent transition-colors"
          >
            {isSearchFocused ? <FaTimes size={20} /> : <FaSearch size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchFocused && (
        <div className="md:hidden px-4 pb-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search movies and TV shows..."
              className="w-full px-4 py-2 bg-gray-900/50 text-white rounded-full 
                       border border-gray-700 focus:border-accent focus:outline-none
                       placeholder:text-gray-400"
              autoFocus
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 
                       hover:text-accent transition-colors"
            >
              <FaSearch />
            </button>
          </form>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 