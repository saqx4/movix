import { Link } from 'react-router-dom';
import { useState } from 'react';
import Search from './Search';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/90 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-accent via-purple-500 to-pink-500 p-[2px]">
              <div className="w-full h-full bg-primary rounded flex items-center justify-center">
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-5 h-5 text-accent group-hover:text-white transition-colors"
                  fill="currentColor"
                >
                  <path d="M4 8h16v8h-16zM2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-12c0-1.1-.9-2-2-2h-16c-1.1 0-2 .9-2 2z"/>
                </svg>
              </div>
            </div>
            <span className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-accent via-purple-500 to-pink-500 text-transparent bg-clip-text">
                Mov
              </span>
              <span className="text-white">ix</span>
            </span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/browse/movie/popular" className="text-white/80 hover:text-white transition-colors">
              Movies
            </Link>
            <Link to="/browse/tv/popular" className="text-white/80 hover:text-white transition-colors">
              TV Shows
            </Link>
            <Search />
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white/80 hover:text-white transition-colors"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} py-4 space-y-4`}>
          <div className="mb-4">
            <Search />
          </div>
          <Link 
            to="/browse/movie/popular" 
            className="block px-2 py-2 text-white/80 hover:text-white transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Movies
          </Link>
          <Link 
            to="/browse/tv/popular" 
            className="block px-2 py-2 text-white/80 hover:text-white transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            TV Shows
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 