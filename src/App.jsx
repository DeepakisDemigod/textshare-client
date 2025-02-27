import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from 'react-router-dom';
// import { Button, Input } from 'antd';
import { BulbOutlined, BulbFilled } from '@ant-design/icons';

import NoteEditor from './components/NoteEditor';

const Home = ({ isDarkMode, toggleTheme }) => {
  const navigate = useNavigate();
  const [customUrl, setCustomUrl] = useState('');

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
      <header className='w-full px-6 py-4 flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>
          <span className='text-blue-500'>Text</span>Share
        </h1>
        <button
          onClick={toggleTheme}
          icon={isDarkMode ? <BulbFilled /> : <BulbOutlined />}

          
        >
          {isDarkMode ? 'Light' : 'Dark'} Mode
        </button>
      </header>

      <main className='flex-1 flex flex-col items-center justify-center px-4 text-center'>
        <h2 className='text-4xl md:text-6xl font-bold mb-4'>
          Share Text Instantly
        </h2>
        <p className='text-lg md:text-xl mb-8'>
          Create a custom, secret link in just one click to share your notes
          securely.
        </p>
        <p className="text-center">no login requided</p>
        <div className='flex flex-col md:flex-row gap-4 items-center'>
          <label className='input input-bordered flex items-center gap-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 16 16'
              fill='currentColor'
              className='h-4 w-4 opacity-70'
            >
              <path
                fillRule='evenodd'
                d='M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z'
                clipRule='evenodd'
              />
            </svg>
            <input
              className='grow'
              placeholder='Enter your custom URL'
              value={customUrl}
              onChange={e => setCustomUrl(e.target.value)}
              style={{ borderColor: isDarkMode ? '#444' : '#ccc' }}
            />
          </label>
          <button
            onClick={handleCreate}
            type='primary'
            className={`btn rounded-lg ${
              isDarkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-500'
            } text-white`}
          >
            🔗 Create Link
          </button>
        </div>
      </main>

      <footer className='w-full py-4 text-center'>
        <p className='text-sm'>
          Built with ❤️ by{' '}
          <a
            className='underline'
            href='https://github.com/deepakisdemigod/'
          >
            @deepakisdemigod
          </a>
        </p>
      </footer>
    </div>
  );
};

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.title = 'TextShare | Share Text Instantly';
  }, []);
  useEffect(() => {
    const savedTheme = localStorage.getItem('isDarkMode') === 'true';
    setIsDarkMode(savedTheme);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      localStorage.setItem('isDarkMode', !prev);
      return !prev;
    });
  };

  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <Home
              isDarkMode={isDarkMode}
              toggleTheme={toggleTheme}
            />
          }
        />
        <Route
          path='/:noteUrl'
          element={<NoteEditor isDarkMode={isDarkMode} />}
        />
      </Routes>
    </Router>
  );
}

export default App;

/*
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
  const [customUrl, setCustomUrl] = useState('');

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
      <header className='w-full px-6 py-4 flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>
          <span className='text-blue-500'>Text</span>Share
        </h1>
        <button
          onClick={toggleTheme}
          className={`btn ${
            isDarkMode
              ? 'bg-blue-600 text-white hover:bg-blue-500'
              : 'bg-gray-300 text-black hover:bg-gray-200'
          }`}
        >
          {isDarkMode ? 'Light' : 'Dark'} Mode
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6 ml-2'
          >
            {isDarkMode ? (
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m.386-6.364l1.591 1.591M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z'
              />
            ) : (
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z'
              />
            )}
          </svg>
        </button>
      </header>

      <main className='flex-1 flex flex-col items-center justify-center px-4 text-center'>
        <h2 className='text-4xl md:text-6xl font-bold mb-4'>
          Share Text Instantly
        </h2>
        <p className='text-lg md:text-xl mb-8'>
          Create a custom, secret link in just one click to share your notes
          securely.
        </p>
        <div className='flex flex-col md:flex-row gap-4 items-center'>
          <input
            type='text'
            placeholder='Enter your custom URL'
            value={customUrl}
            onChange={e => setCustomUrl(e.target.value)}
            className={`input input-bordered w-full max-w-xs ${
              isDarkMode ? 'bg-gray-800 border-gray-600 text-white' : ''
            }`}
          />
          <button
            onClick={handleCreate}
            className={`btn btn-primary rounded-lg ${
              isDarkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-500'
            } text-white`}
          >
            🔗 Create Link
          </button>
        </div>
      </main>

      <footer className='w-full py-4 text-center'>
        <p className='text-sm'>
          Built with ❤️ by{' '}
          <a
            className='underline'
            href='https://github.com/deepakisdemigod/'
          >
            @deepakisdemigod
          </a>
        </p>
      </footer>
    </div>
  );
};

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.title = 'TextShare | Share Text Instantly';
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('isDarkMode') === 'true';
    setIsDarkMode(savedTheme);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      localStorage.setItem('isDarkMode', !prev);
      return !prev;
    });
  };

  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <Home
              isDarkMode={isDarkMode}
              toggleTheme={toggleTheme}
            />
          }
        />
        <Route
          path='/:noteUrl'
          element={<NoteEditor isDarkMode={isDarkMode} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
*/
