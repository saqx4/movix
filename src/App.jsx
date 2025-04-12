import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import TVShowDetails from './pages/TVShowDetails';
import Navbar from './components/Navbar';
import Browse from './pages/Browse';
import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-primary">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/tv/:id" element={<TVShowDetails />} />
          <Route path="/browse/:type/:category" element={<Browse />} />
          <Route path="/search" element={<Browse />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
