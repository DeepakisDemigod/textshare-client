/* import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { io } from 'socket.io-client';
import {
  Link,
  Copy,
  Share2,
  Save,
  CheckCircle,
  AlertCircle,
  Github
} from 'lucide-react';

const AUTOSAVE_INTERVAL = 10000;

const NoteEditor = ({ isDarkMode }) => {
  const { noteUrl } = useParams();
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState('saved'); // 'saved', 'saving', 'error'
  const socket = io('https://textshare-server.onrender.com');
  const autosaveTimer = useRef(null);

  useEffect(() => {
    // Set the document title
    document.title = `textshare/${noteUrl} `;
  }, []);

  useEffect(() => {
    socket.emit('join-room', noteUrl);
    socket.on('receive-update', updatedContent => {
      setContent(updatedContent);
    });
    return () => socket.disconnect();
  }, [noteUrl]);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(
          `https://textshare-server.onrender.com/api/notes/${noteUrl}`
        );
        setContent(response.data.content || '');
      } catch (error) {
        console.error('Error fetching note:', error);
        setSaveStatus('error');
      }
    };
    fetchNote();
  }, [noteUrl]);

  useEffect(() => {
    const autosave = async () => {
      if (!content) return;

      try {
        setSaving(true);
        setSaveStatus('saving');
        await axios.post(
          `https://textshare-server.onrender.com/api/notes/${noteUrl}`,
          {
            content
          }
        );
        setSaveStatus('saved');
      } catch (error) {
        console.error('Error during autosave:', error);
        setSaveStatus('error');
      } finally {
        setSaving(false);
      }
    };

    autosaveTimer.current = setInterval(autosave, AUTOSAVE_INTERVAL);
    return () => clearInterval(autosaveTimer.current);
  }, [noteUrl, content]);

  const handleSave = async () => {
    setSaving(true);
    setSaveStatus('saving');
    try {
      await axios.post(
        `https://textshare-server.onrender.com/api/notes/${noteUrl}`,
        {
          content
        }
      );
      setSaveStatus('saved');
    } catch (error) {
      console.error('Error saving note:', error);
      setSaveStatus('error');
    } finally {
      setSaving(false);
    }
  };

  const handleCopyContent = () => {
    const plainText = content.replace(/<[^>]+>/g, '');
    navigator.clipboard.writeText(plainText);
  };

  const handleShareLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/${noteUrl}`);
  };

  return (
    <div
      className={`h-screen flex flex-col ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'
      }`}
    >
    
      <header
        className={`sticky top-0 z-50 w-full ${
          isDarkMode
            ? 'bg-gray-900 border-gray-700'
            : 'bg-white border-gray-200'
        }`}
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='h-16 flex items-center justify-between'>
            <div className='flex items-center space-x-4'>
              <a href='/'>
                <h1 className='text-2xl font-bold'>
                  <span className='text-blue-500'>Text</span>Share
                </h1>
              </a>
            </div>

            <div className='flex items-center space-x-2'>
              {saveStatus === 'saving' && (
                <div
                  className={`gap-1 flex items-center ${
                    isDarkMode ? 'text-amber-400' : 'text-amber-600'
                  }`}
                >
                  <AlertCircle className='w-4 h-4 mr-1.5' />
                  <span className='text-sm'>Saving...</span>
                </div>
              )}
              {saveStatus === 'saved' && (
                <div
                  className={`gap-1 flex items-center ${
                    isDarkMode ? 'text-green-400' : 'text-green-600'
                  }`}
                >
                  <CheckCircle className='w-4 h-4 mr-1.5' />
                  <span
                    className={`text-sm ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    All changes saved
                  </span>
                </div>
              )}
              {saveStatus === 'error' && (
                <div
                  className={`gap-1 flex items-center ${
                    isDarkMode ? 'text-red-400' : 'text-red-600'
                  }`}
                >
                  <AlertCircle className='w-4 h-4 mr-1.5' />
                  <span className='text-sm'>Save failed</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

    
      <div
        className={`w-full ${
          isDarkMode
            ? 'bg-gray-900 border-gray-700'
            : 'bg-white border-gray-200'
        }`}
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='h-14 flex items-center justify-end space-x-3'>
            <div
              className={`flex sm:flex items-center px-3 py-1.5 rounded-md ${
                isDarkMode
                  ? 'bg-gray-700 text-gray-300'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Link className='w-4 h-4 text-gray-500 mr-1' />
              <span className='text-sm font-medium'>{noteUrl}</span>
            </div>

            <button
              onClick={handleCopyContent}
              className={`gap-1 inline-flex items-center px-3 py-1.5 text-sm font-medium ${
                isDarkMode
                  ? 'text-gray-300 bg-gray-800 hover:bg-gray-600'
                  : 'text-gray-700 bg-white hover:bg-gray-50'
              } border rounded-md`}
            >
              <Copy className='w-4 h-4 mr-1.5' />
              Copy
            </button>
            <button
              onClick={handleShareLink}
              className={`gap-1 inline-flex items-center px-3 py-1.5 text-sm font-medium ${
                isDarkMode
                  ? 'text-gray-300 bg-gray-800 hover:bg-gray-600'
                  : 'text-gray-700 bg-white hover:bg-gray-50'
              } border rounded-md`}
            >
              <Share2 className='w-4 h-4 mr-1.5' />
              Share
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className={`gap-1 inline-flex items-center px-3 py-1.5 text-sm font-medium ${
                isDarkMode
                  ? 'text-white bg-blue-600 hover:bg-blue-400'
                  : 'text-white bg-blue-600 hover:bg-blue-600'
              } rounded-md disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <Save className='w-4 h-4 mr-1.5' />
              Save
            </button>
          </div>
        </div>
      </div>

      
      <main className='flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6'>
        <div
          className={` w-full rounded-lg shadow-sm ${
            isDarkMode ? 'bg-gray-900' : 'bg-white'
          }`}
        >
          <ReactQuill
            value={content}
            onChange={value => setContent(value)}
            theme='snow'
            className={`h-[calc(100vh-16rem)]${
              isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
            }`}
          />
        </div>
      </main>

      
      <footer
        className={`w-full ${
          isDarkMode ? 'bg-gray-900 text-gray-400' : 'bg-white text-gray-500'
        } border-t`}
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
          <p className='text-sm text-center flex items-center justify-center'>
            Built with ❤️ by
            <a
              href='https://github.com/deepakisdemigod/'
              target='_blank'
              rel='noopener noreferrer'
              className={`ml-1 inline-flex items-center ${
                isDarkMode
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Github className='w-4 h-4 mr-1' />
              @deepakisdemigod
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default NoteEditor;
*/

import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { io } from 'socket.io-client';
import {
  Link,
  Copy,
  Share2,
  Save,
  CheckCircle,
  AlertCircle,
  Github
} from 'lucide-react';
import { Spin } from 'antd';

const AUTOSAVE_INTERVAL = 10000;

const NoteEditor = ({ isDarkMode }) => {
  const { noteUrl } = useParams();
  const [content, setContent] = useState('Loading ...'); // Initial state
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState('saved'); // 'saved', 'saving', 'error'
  const socket = io('https://textshare-server.onrender.com');
  const autosaveTimer = useRef(null);

  useEffect(() => {
    // Set the document title
    document.title = `textshare/${noteUrl} `;
  }, []);

  useEffect(() => {
    socket.emit('join-room', noteUrl);
    socket.on('receive-update', updatedContent => {
      setContent(updatedContent);
    });
    return () => socket.disconnect();
  }, [noteUrl]);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(
          `https://textshare-server.onrender.com/api/notes/${noteUrl}`
        );
        setContent(response.data.content || '');
      } catch (error) {
        console.error('Error fetching note:', error);
        setSaveStatus('error');
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    };
    fetchNote();
  }, [noteUrl]);

  useEffect(() => {
    const autosave = async () => {
      if (!content || loading) return; // Don't autosave if loading

      try {
        setSaving(true);
        setSaveStatus('saving');
        await axios.post(
          `https://textshare-server.onrender.com/api/notes/${noteUrl}`,
          {
            content
          }
        );
        setSaveStatus('saved');
      } catch (error) {
        console.error('Error during autosave:', error);
        setSaveStatus('error');
      } finally {
        setSaving(false);
      }
    };

    autosaveTimer.current = setInterval(autosave, AUTOSAVE_INTERVAL);
    return () => clearInterval(autosaveTimer.current);
  }, [noteUrl, content, loading]); // Add loading to the dependency array

  const handleSave = async () => {
    setSaving(true);
    setSaveStatus('saving');
    try {
      await axios.post(
        `https://textshare-server.onrender.com/api/notes/${noteUrl}`,
        {
          content
        }
      );
      setSaveStatus('saved');
    } catch (error) {
      console.error('Error saving note:', error);
      setSaveStatus('error');
    } finally {
      setSaving(false);
    }
  };

  const handleCopyContent = () => {
    const plainText = content.replace(/<[^>]+>/g, '');
    navigator.clipboard.writeText(plainText);
  };

  const handleShareLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/${noteUrl}`);
  };

  return (
    <div
      className={`h-screen flex flex-col ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'
      }`}
    >
      {/* Header */}
      <header
        className={`sticky top-0 z-50 w-full ${
          isDarkMode
            ? 'bg-gray-900 border-gray-700'
            : 'bg-white border-gray-200'
        }`}
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='h-16 flex items-center justify-between'>
            <div className='flex items-center space-x-4'>
              <a href='/'>
                <h1 className='text-2xl font-bold'>
                  <span className='text-blue-500'>Text</span>Share
                </h1>
              </a>
            </div>

            <div className='flex items-center space-x-2'>
              {saveStatus === 'saving' && (
                <div
                  className={`gap-1 flex items-center ${
                    isDarkMode ? 'text-amber-400' : 'text-amber-600'
                  }`}
                >
                  <AlertCircle className='w-4 h-4 mr-1.5' />
                  <span className='text-sm'>Saving...</span>
                </div>
              )}
              {saveStatus === 'saved' && (
                <div
                  className={`gap-1 flex items-center ${
                    isDarkMode ? 'text-green-400' : 'text-green-600'
                  }`}
                >
                  <CheckCircle className='w-4 h-4 mr-1.5' />
                  <span
                    className={`text-sm ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    All changes saved
                  </span>
                </div>
              )}
              {saveStatus === 'error' && (
                <div
                  className={`gap-1 flex items-center ${
                    isDarkMode ? 'text-red-400' : 'text-red-600'
                  }`}
                >
                  <AlertCircle className='w-4 h-4 mr-1.5' />
                  <span className='text-sm'>Save failed</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Toolbar */}
      <div
        className={`w-full ${
          isDarkMode
            ? 'bg-gray-900 border-gray-700'
            : 'bg-white border-gray-200'
        }`}
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='h-14 flex items-center justify-end space-x-3'>
            <div
              className={`flex sm:flex items-center px-3 py-1.5 rounded-md ${
                isDarkMode
                  ? 'bg-gray-700 text-gray-300'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Link className='w-4 h-4 text-gray-500 mr-1' />
              <span className='text-sm font-medium'>{noteUrl}</span>
            </div>

            <button
              onClick={handleCopyContent}
              className={`gap-1 inline-flex items-center px-3 py-1.5 text-sm font-medium ${
                isDarkMode
                  ? 'text-gray-300 bg-gray-800 hover:bg-gray-600'
                  : 'text-gray-700 bg-white hover:bg-gray-50'
              } border rounded-md`}
            >
              <Copy className='w-4 h-4 mr-1.5' />
              Copy
            </button>
            <button
              onClick={handleShareLink}
              className={`gap-1 inline-flex items-center px-3 py-1.5 text-sm font-medium ${
                isDarkMode
                  ? 'text-gray-300 bg-gray-800 hover:bg-gray-600'
                  : 'text-gray-700 bg-white hover:bg-gray-50'
              } border rounded-md`}
            >
              <Share2 className='w-4 h-4 mr-1.5' />
              Share
            </button>
            <button
              onClick={handleSave}
              disabled={saving || loading} // Disable while loading
              className={`gap-1 inline-flex items-center px-3 py-1.5 text-sm font-medium ${
                isDarkMode
                  ? 'text-white bg-blue-600 hover:bg-blue-400'
                  : 'text-white bg-blue-600 hover:bg-blue-600'
              } rounded-md disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <Save className='w-4 h-4 mr-1.5' />
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Editor */}
      <main className='flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6'>
        <div
          className={` w-full rounded-lg shadow-sm ${
            isDarkMode ? 'bg-gray-900' : 'bg-white'
          }`}
        >
          {loading ? (
            <div className='p-4 text-center h-[20vh] '>
              {/*<span className='loading loading-spinner loading-lg'></span>*/}
              <Spin size={10} />
              <span>Getting your note </span>
            </div>
          ) : (
            <ReactQuill
              value={content}
              onChange={value => setContent(value)}
              theme='snow'
              className={`h-[calc(100vh-16rem)]${
                isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
              }`}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer
        className={`w-full ${
          isDarkMode ? 'bg-gray-900 text-gray-400' : 'bg-white text-gray-500'
        } border-t`}
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
          <p className='text-sm text-center flex items-center justify-center'>
            Built with ❤️ by
            <a
              href='https://github.com/deepakisdemigod/'
              target='_blank'
              rel='noopener noreferrer'
              className={`ml-1 inline-flex items-center ${
                isDarkMode
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Github className='w-4 h-4 mr-1' />
              @deepakisdemigod
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default NoteEditor;
