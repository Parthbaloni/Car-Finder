import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { WishlistProvider } from './context/WishlistContext';
import Home from './pages/Home';
import CarDetails from './pages/CarDetails';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <WishlistProvider>
      <Router>
      <div className={darkMode ? 'dark' : ''}>
  <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">
    {/* Header */}
    <header className="p-6 shadow">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-center w-full">
          Car Listings
        </Link>

        {/* Toggle Dark Mode */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="absolute right-6 px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </header>

    {/* Routes */}
    <main className="container mx-auto px-4 py-8">
      <Routes>
        <Route path="/" element={<Home darkMode={darkMode} />} />
        <Route path="/cars/:id" element={<CarDetails darkMode={darkMode} />} />
      </Routes>
    </main>
  </div>
</div>

      </Router>
    </WishlistProvider>
  );
}
export default App;