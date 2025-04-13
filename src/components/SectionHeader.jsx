import PropTypes from 'prop-types';
import { FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SectionHeader = ({ title, type, category }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      <Link 
        to={`/browse/${type}/${category}`}
        className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors duration-300"
      >
        <span className="text-sm font-medium">View All</span>
        <FaChevronRight className="text-sm" />
      </Link>
    </div>
  );
};

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['movie', 'tv']).isRequired,
  category: PropTypes.string.isRequired
};

export default SectionHeader; 