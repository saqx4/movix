import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FaServer } from 'react-icons/fa';

const SERVERS = {
  autoembed: {
    name: 'Server 1 (Auto)',
    getMovieUrl: (id) => `https://player.autoembed.cc/embed/movie/${id}`,
    getTVUrl: (id, season, episode) => `https://player.autoembed.cc/embed/tv/${id}/${season}/${episode}`,
  },
  embed2: {
    name: 'Server 2',
    getMovieUrl: (id) => `https://www.2embed.cc/embed/${id}`,
    getTVUrl: (id, season, episode) => `https://www.2embed.cc/embedtv/${id}&s=${season}&e=${episode}`,
  },
  multiembed: {
    name: 'Server 3',
    getMovieUrl: (id) => `https://multiembed.mov/?video_id=${id}&tmdb=1`,
    getTVUrl: (id, season, episode) => `https://multiembed.mov/?video_id=${id}&tmdb=1&s=${season}&e=${episode}`,
  },
  autoembed_co: {
    name: 'Server 4',
    getMovieUrl: (id) => `https://autoembed.co/movie/tmdb/${id}`,
    getTVUrl: (id, season, episode) => `https://autoembed.co/tv/tmdb/${id}-${season}-${episode}`,
  },
};

const VideoPlayer = ({ type, id, season, episode }) => {
  const [activeServer, setActiveServer] = useState('autoembed');
  const [showServerMenu, setShowServerMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const menuRef = useRef(null);

  const getVideoUrl = () => {
    const server = SERVERS[activeServer];
    return type === 'movie' 
      ? server.getMovieUrl(id)
      : server.getTVUrl(id, season, episode);
  };

  useEffect(() => {
    setIsLoading(true);
  }, [activeServer, id, season, episode]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowServerMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full bg-black">
      <div className="relative pt-[56.25%]">
        {/* Video Player */}
        <iframe
          src={getVideoUrl()}
          className="absolute inset-0 w-full h-full"
          frameBorder="0"
          allowFullScreen
          onLoad={() => setIsLoading(false)}
        />

        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
          </div>
        )}

        {/* Server Selection */}
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10" ref={menuRef}>
          <div className="relative">
            <button
              onClick={() => setShowServerMenu(!showServerMenu)}
              className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-900/80 backdrop-blur-sm rounded-lg
                       text-white text-xs sm:text-sm font-medium hover:bg-gray-800/80 transition-colors"
            >
              <FaServer className="text-xs sm:text-sm" />
              <span className="truncate max-w-[100px] sm:max-w-none">{SERVERS[activeServer].name}</span>
            </button>

            {/* Server Menu */}
            {showServerMenu && (
              <div className="absolute top-full right-0 mt-1 sm:mt-2 w-40 sm:w-48 bg-gray-900/95 backdrop-blur-sm 
                           rounded-lg shadow-lg overflow-hidden border border-gray-700/50">
                {Object.entries(SERVERS).map(([key, server]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setActiveServer(key);
                      setShowServerMenu(false);
                    }}
                    className={`w-full px-3 sm:px-4 py-1.5 sm:py-2 text-left text-xs sm:text-sm transition-colors
                              ${activeServer === key 
                                ? 'bg-accent text-white' 
                                : 'text-gray-300 hover:bg-gray-800/80'
                              }`}
                  >
                    {server.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

VideoPlayer.propTypes = {
  type: PropTypes.oneOf(['movie', 'tv']).isRequired,
  id: PropTypes.string.isRequired,
  season: PropTypes.number,
  episode: PropTypes.number,
};

export default VideoPlayer; 