import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from 'react-router-dom';
import { Button, Input } from 'antd';
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
        <Button
          onClick={toggleTheme}
          icon={isDarkMode ? <BulbFilled /> : <BulbOutlined />}
          className={`${
            isDarkMode ? 'bg-blue-600 text-white' : 'bg-gray-300 text-black'
          } `}
        >
          {isDarkMode ? 'Light' : 'Dark'} Mode
        </Button>
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
          <Input
            placeholder='Enter your custom URL'
            value={customUrl}
            onChange={e => setCustomUrl(e.target.value)}
           style={{ borderColor: isDarkMode ? '#444' : '#ccc' }}
          />
          <Button
            onClick={handleCreate}
            type='primary'
            className={`rounded-lg ${
              isDarkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-500'
            } text-white`}
          >
            🔗 Create Link
          </Button>
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
  document.title = "TextShare | Share Text Instantly"
},[])
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
