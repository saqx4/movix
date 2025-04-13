import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaStar, FaPlay, FaArrowLeft, FaCalendarAlt, FaClock, FaChevronRight } from 'react-icons/fa';
import RelatedMovies from '../components/RelatedMovies';

const API_KEY = '3308647fabe47a844ab269e6eab19132';
const BASE_URL = 'https://api.themoviedb.org/3';

const TVShowDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPlayer, setShowPlayer] = useState(false);
  const [showRelated, setShowRelated] = useState(false);
  const [relatedType, setRelatedType] = useState('');

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/tv/${id}?api_key=${API_KEY}&append_to_response=videos`
        );
        setShow(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching TV show details:', error);
        setLoading(false);
      }
    };

    fetchShowDetails();
  }, [id]);

  const handleShowRelated = (type) => {
    setRelatedType(type);
    setShowRelated(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (!show) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">TV Show not found</h2>
          <button
            onClick={() => navigate(-1)}
            className="bg-accent text-white px-6 py-3 rounded-xl hover:bg-accent/80 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary">
      <div className="p-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-8 text-white hover:text-accent transition-colors"
        >
          <FaArrowLeft />
          Back
        </button>

        {showPlayer ? (
          <div className="player-container w-full h-[80vh]">
            <iframe
              src={`https://player.autoembed.cc/embed/tv/${id}`}
              className="absolute top-0 left-0 w-full h-full"
              allowFullScreen
              frameBorder="0"
            />
          </div>
        ) : (
          <div className="details-section min-h-[80vh]">
            <div className="details-poster h-full">
              <img
                src={`https://image.tmdb.org/t/p/original${show.poster_path}`}
                alt={show.name}
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>

            <div className="details-info">
              <h1 className="details-title">{show.name}</h1>
              
              <div className="details-meta">
                <div className="flex items-center gap-2">
                  <FaStar className="text-yellow-400" />
                  <span>{show.vote_average.toFixed(1)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCalendarAlt />
                  <span>{show.first_air_date.split('-')[0]}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock />
                  <span>{show.episode_run_time[0]} minutes</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-semibold text-white">Overview</h2>
                  <button
                    onClick={() => handleShowRelated('similar')}
                    className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors text-sm"
                  >
                    View Similar <FaChevronRight />
                  </button>
                </div>
                <p className="details-overview">{show.overview}</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2 text-white">Genres</h2>
                <div className="details-genres">
                  {show.genres.map((genre) => (
                    <button
                      key={genre.id}
                      className="genre-tag"
                      onClick={() => handleShowRelated(genre.id)}
                    >
                      {genre.name}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setShowPlayer(true)}
                className="hero-button inline-flex items-center gap-2"
              >
                <FaPlay />
                Watch Now
              </button>
            </div>
          </div>
        )}

        {showRelated && (
          <RelatedMovies
            type={relatedType}
            id={id}
            genre="tv"
            onClose={() => setShowRelated(false)}
          />
        )}
      </div>
    </div>
  );
};

export default TVShowDetails; 