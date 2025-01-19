import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { io } from 'socket.io-client';
import {
  Pencil,
  ClipboardText,
  Share,
  FloppyDisk,
  CloudCheck,
  CloudSlash,
} from 'phosphor-react';

const AUTOSAVE_INTERVAL = 10000; // 10 seconds for autosave

const NoteEditor = ({ isDarkMode }) => {
  const { noteUrl } = useParams();
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const socket = io('http://localhost:5000');
  const autosaveTimer = useRef(null);

  useEffect(() => {
    // Join the room
    socket.emit('join-room', noteUrl);

    // Receive updates
    socket.on('receive-update', (updatedContent) => {
      setContent(updatedContent);
    });

    return () => {
      socket.disconnect();
    };
  }, [noteUrl, socket]);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/notes/${noteUrl}`
        );
        setContent(response.data.content || '');
      } catch (error) {
        console.error('Error fetching note:', error);
      }
    };
    fetchNote();
  }, [noteUrl]);

  useEffect(() => {
    const autosave = async () => {
      try {
        setSaving(true);
        await axios.post(`http://localhost:5000/api/notes/${noteUrl}`, {
          content,
        });
        console.log('Note autosaved!');
      } catch (error) {
        console.error('Error during autosave:', error);
      } finally {
        setSaving(false);
      }
    };

    autosaveTimer.current = setInterval(autosave, AUTOSAVE_INTERVAL);

    return () => {
      clearInterval(autosaveTimer.current);
    };
  }, [noteUrl, content]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await axios.post(`http://localhost:5000/api/notes/${noteUrl}`, {
        content,
      });
    } catch (error) {
      console.error('Error saving note:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleCopyContent = () => {
    const plainText = content.replace(/<[^>]+>/g, '');
    navigator.clipboard.writeText(plainText);
  };

  const handleShareLink = () => {
    const shareLink = `${window.location.origin}/${noteUrl}`;
    navigator.clipboard.writeText(shareLink);
  };

  return (
    <div
      className={`h-screen flex flex-col ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
      }`}
    >
      {/* Header */}
      <header className="w-full px-6 py-4 flex justify-between items-center bg-opacity-80 backdrop-blur-md">
        <h1 className="text-2xl font-bold">
          <span className="text-blue-500">Text</span>Share
        </h1>
        <div className="text-sm flex items-center gap-2">
          {saving ? (
            <>
              <CloudSlash size={24} className="text-yellow-500" />
              Saving...
            </>
          ) : (
            <>
              <CloudCheck size={24} className="text-green-500" />
              All changes saved.
            </>
          )}
        </div>
      </header>

      {/* Main Editor */}
      <main className="flex-1 flex flex-col px-6 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${
              isDarkMode
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            <Pencil size={16} />
            textshare/{noteUrl}
          </button>
          <div className="flex gap-4 mt-4 md:mt-0">
            <button
              onClick={handleCopyContent}
              className={`flex items-center gap-1 px-4 py-2 text-sm font-semibold rounded-lg ${
                isDarkMode
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              <ClipboardText size={16} />
              Copy
            </button>
            <button
              onClick={handleShareLink}
              className={`flex items-center gap-1 px-4 py-2 text-sm font-semibold rounded-lg ${
                isDarkMode
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
            >
              <Share size={16} />
              Share
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className={`flex items-center gap-1 px-4 py-2 text-sm font-semibold rounded-lg ${
                saving
                  ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                  : isDarkMode
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              <FloppyDisk size={16} />
              Save
            </button>
          </div>
        </div>

        <ReactQuill
          value={content}
          onChange={(value) => setContent(value)}
          theme="snow"
          className={`h-full w-full rounded-lg shadow-md ${
            isDarkMode
              ? 'bg-gray-900 text-white'
              : 'bg-white text-black border-gray-300'
          }`}
        />
      </main>

      {/* Footer */}
      <footer className="w-full py-4 text-center bg-opacity-80 backdrop-blur-md">
        <p className="text-sm">
          Built with ❤️ by{' '}
          <a
            className="underline"
            href="https://github.com/deepakisdemigod/"
          >
            <span>@deepakisdemigod</span>
          </a>
        </p>
      </footer>
    </div>
  );
};

export default NoteEditor;
