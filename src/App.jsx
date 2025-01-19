import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from 'react-router-dom';
import NoteEditor from './components/NoteEditor';

const Home = ({ isDarkMode, toggleTheme }) => {
  const navigate = useNavigate();
  const [customUrl, setCustomUrl] = React.useState('');

  const handleCreate = () => {
    if (customUrl.trim()) {
      navigate(`/${customUrl}`);
    } else {
      alert('Please enter a custom URL.');
    }
  };

  return (
    <div
      className={`h-screen flex flex-col items-center justify-between ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
      }`}
    >
      <header className="w-full px-6 py-4 flex justify-between items-center bg-opacity-80 backdrop-blur-md">
        <h1 className="text-2xl font-bold">
          <span className="text-blue-500">Text</span>Share
        </h1>
        <button
          onClick={toggleTheme}
          className={`px-4 py-2 rounded-lg font-medium ${
            isDarkMode ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
          }`}
        >
          {isDarkMode ? 'Light' : 'Dark'} Mode
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-4">
          Share Text Instantly
        </h2>
        <p className="text-lg md:text-xl text-gray-500 max-w-2xl mb-8">
          Create a custom, secret link in just one click to share your notes
          securely.
        </p>
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <input
            type="text"
            placeholder="Enter your custom URL"
            value={customUrl}
            onChange={e => setCustomUrl(e.target.value)}
            className={`block w-full md:w-80 px-4 py-2 text-lg rounded-lg shadow-md focus:ring focus:ring-blue-300 focus:outline-none ${
              isDarkMode
                ? 'bg-gray-800 text-white'
                : 'bg-white text-black border'
            }`}
          />
          <button
            onClick={handleCreate}
            className="px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 focus:ring focus:ring-blue-300"
          >
            🔗 Create Link
          </button>
        </div>
      </main>

      <footer className="w-full py-4 text-center bg-opacity-80 backdrop-blur-md">
        <p className="text-sm">
          Built with ❤️ by{' '}
          <a className="underline" href="https://github.com/deepakisdemigod/">
            <span>@deepakisdemigod</span>
          </a>
        </p>
      </footer>
    </div>
  );
};

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Load the theme preference from localStorage on app load
  useEffect(() => {
    const savedTheme = localStorage.getItem('isDarkMode') === 'true';
    setIsDarkMode(savedTheme);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      localStorage.setItem('isDarkMode', !prev); // Save the theme preference
      return !prev;
    });
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              isDarkMode={isDarkMode}
              toggleTheme={toggleTheme}
            />
          }
        />
        <Route
          path="/:noteUrl"
          element={<NoteEditor isDarkMode={isDarkMode} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
