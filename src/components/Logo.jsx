import { Link } from 'react-router-dom';

const Logo = ({ className = '' }) => {
  return (
    <Link 
      to="/" 
      className={`flex items-center gap-1 font-bold text-white hover:opacity-90 transition-opacity ${className}`}
    >
      <svg width="32" height="32" viewBox="0 0 32 32" className="text-accent">
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="currentColor"/>
            <stop offset="100%" stopColor="#FF1744"/>
          </linearGradient>
        </defs>
        <g fill="none" fillRule="evenodd">
          <path
            d="M11.5,9 L20.5,9 C22.433,9 24,10.567 24,12.5 L24,19.5 C24,21.433 22.433,23 20.5,23 L11.5,23 C9.567,23 8,21.433 8,19.5 L8,12.5 C8,10.567 9.567,9 11.5,9 Z"
            fill="url(#logoGradient)"
          />
          <path d="M8,13 L24,13 M8,19 L24,19" stroke="currentColor" strokeWidth="1"/>
        </g>
      </svg>
      <span className="text-2xl">
        <span className="text-accent">Mov</span>
        <span className="text-white">ix</span>
      </span>
    </Link>
  );
};

export default Logo; 