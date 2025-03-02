import useTypewriter from "./hooks/useTypewriter";
import videoBg from "./assets/hero-bh.mp4";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
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
    <div className="relative h-screen overflow-hidden ">
      {/* Background Video */}
      <video
        src={videoBg}
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      {/* Backdrop Overlay */}
      <div
        className="absolute inset-0 h-full w-full z-10"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      ></div>

      <div className="relative z-20 h-full flex flex-col items-center justify-between">
        <header className="w-full px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">
            <span className="text-yellow-300">Text</span>Share
          </h1>
          <a href="mailto:deepakthapa1423@gmail.com?subject=Feedback%20for%20TextShare%20Tool&body=I%20would%20Like%20to%20have%20a%20Feature...">
            <button className="btn bg-yellow-400 text-white rounded-md px-4 py-2 font-semibold">
              Feedback
            </button>
          </a>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-4  text-white">
            Ditch <span className="text-yellow-300">Notepad !!</span>
          </h2>
          <h2 className="text-4xl md:text-6xl font-bold mb-4  text-white">
            ⚡ Share Texts & Docs Instantly⚡
          </h2>

          <p className="text-lg md:text-xl mb-r text-gray-300">
            Create a custom, secret link in just one click to share your notes
            securely.
          </p>
          <div className="text-center mb-2">
            <a
              href="https://www.producthunt.com/posts/textshare?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-textshare"
              target="_blank"
            >
              <img
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=930326&theme=neutral&t=1740850541782"
                alt="TextShare - Ditch&#0032;Notepad&#0032;&#0033;&#0033;&#0032;⚡&#0032;Share&#0032;Texts&#0032;&#0038;&#0032;Docs&#0032;Instantly⚡ | Product Hunt"
                style={{ width: "250px", height: "54px" }}
                width="250"
                height="54"
              />
            </a>{" "}
          </div>
          <div className="text-center flex flex-col text-white mb-3">
            <div className="flex  ">
              <svg
                className="w-5 h-5 text-green-400 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <span>🔓 No Login requided</span>
            </div>
            <div className="flex  ">
              <svg
                className="w-5 h-5 text-green-400 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <span>🖼️ Supports image embed </span>
            </div>
            <div className="flex  ">
              <svg
                className="w-5 h-5 text-green-400 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <span>🎬 Supports YTube video embed</span>
            </div>
            <div className="flex  ">
              <svg
                className="w-5 h-5 text-green-400 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <span>❄️ Support codeblock embed</span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <label className="input input-bordered flex items-center gap-2">
              <span className="text-md bg-gray-300 rounded-lg p-1">
                https://textshare-client.vercel.app/
              </span>
              <input
                className="h-full input grow rounded-lg p-1 border border-gray-200 text-black"
                placeholder={placeholderText || ""}
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                style={{ borderColor: "#ccc" }}
              />
            </label>
            <button
              onClick={handleCreate}
              type="primary"
              className="btn rounded-md font-bold py-2 px-4 bg-yellow-400 text-white"
            >
              Create Link
            </button>
          </div>
        </main>

        <footer className="w-full bg-white text-gray-500 border-t">
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
