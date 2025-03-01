import useTypewriter from "./hooks/useTypewriter";

import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
// import { Button, Input } from 'antd';
import { BulbOutlined, BulbFilled } from "@ant-design/icons";

import { Github } from "lucide-react";

import NoteEditor from "./components/NoteEditor";

const Home = ({ isDarkMode, toggleTheme }) => {
  const navigate = useNavigate();
  const [customUrl, setCustomUrl] = useState("");

  const exampleUrls = [
    "my-notes",
    "meeting-minutes",
    "shopping-list",
    "project-ideas",
    "to-do-list",
  ];
  const placeholderText = useTypewriter(exampleUrls, 100);

  const handleCreate = () => {
    if (customUrl.trim()) {
      navigate(`/${customUrl}`);
    } else {
      alert("Please enter a custom URL.");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-between   ">
      <header className="w-full px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <span className="text-blue-500">Text</span>Share
        </h1>
        {/* Add Theme Switchet here ...*/}
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-4">
          ⚡ Share Texts & Docs Instantly⚡
        </h2>
        <p className="text-lg md:text-xl mb-8">
          Create a custom, secret link in just one click to share your notes
          securely.
        </p>
        <p className="text-center flex  items-center">
          <svg
            className="w-5 h-5 text-green-500 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
          <span> no login requided</span>
        </p>
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <label className="input input-bordered flex items-center gap-2">
            <span className="text-md bg-gray-200 rounded p-1">
              https://textshare-client.vercel.app/
            </span>
            <input
              className="input grow rounded p-1 border border-gray-200"
              placeholder={placeholderText || ""}
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              style={{ borderColor: "#ccc" }}
            />
          </label>
          <button
            onClick={handleCreate}
            type="primary"
            className="btn rounded-md font-bold py-2 px-4 bg-blue-500 text-white"
          >
            Create Link
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer
        className={`w-full ${
          isDarkMode ? "bg-gray-900 text-gray-400" : "bg-white text-gray-500"
        } border-t`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-sm text-center flex items-center justify-center">
            Built with ❤️ by
            <a
              href="https://github.com/deepakisdemigod/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 inline-flex items-center text-gray-600 hover:text-gray-900
              "
            >
              <Github className="w-4 h-4 mr-1" />
              @deepakisdemigod
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.title = "TextShare | Share Text Instantly";
  }, []);
  useEffect(() => {
    const savedTheme = localStorage.getItem("isDarkMode") === "true";
    setIsDarkMode(savedTheme);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      localStorage.setItem("isDarkMode", !prev);
      return !prev;
    });
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:noteUrl" element={<NoteEditor />} />
      </Routes>
    </Router>
  );
}

export default App;
