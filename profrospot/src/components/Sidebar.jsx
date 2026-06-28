import React from "react";
import { useNavigate } from "react-router-dom";
import { House, Search, Library, Upload } from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();

  const role = (localStorage.getItem("role") || "").toLowerCase();

  return (
    <div className="h-screen w-80 bg-black text-gray-300 flex flex-col p-4">

      {/* LOGO */}
      <div className="text-white text-2xl font-bold mb-6">
        Spotify
      </div>

      {/* MAIN MENU */}
      <div className="flex flex-col gap-4">

        <div className="flex items-center gap-3 cursor-pointer hover:text-white">
          <House size={20} />
          <span className="text-white font-bold">Home</span>
        </div>

        <div className="flex items-center gap-3 cursor-pointer hover:text-white">
          <Search size={20} />
          <span className="text-white font-bold">Search</span>
        </div>

        <div className="flex items-center gap-3 cursor-pointer hover:text-white">
          <Library size={20} />
          <span className="text-white font-bold">Library</span>
        </div>

        {/* ARTIST ONLY */}
        {role === "artist" && (
          <div
            onClick={() => navigate("/upload")}
            className="flex items-center gap-3 bg-green-500 text-black px-3 py-2 rounded-full font-bold cursor-pointer hover:bg-green-400 mt-2"
          >
            <Upload size={20} />
            <span>Upload Music</span>
          </div>
        )}
      </div>

      <hr className="my-6 border-gray-800" />

      {/* CREATE PLAYLIST */}
      <div className="bg-zinc-800 rounded-lg p-5">
        <h3 className="text-white font-bold text-lg">
          Create your first playlist
        </h3>

        <p className="text-gray-300 text-sm mt-2">
          It's easy, we'll help you
        </p>

        <button className="mt-4 bg-white text-black font-bold px-4 py-2 rounded-full hover:scale-105 transition">
          Create playlist
        </button>
      </div>

      {/* BROWSE PODCASTS */}
      <div className="bg-zinc-800 rounded-lg p-5 mt-4">
        <h3 className="text-white font-bold text-lg">
          Let's find some podcasts
        </h3>

        <p className="text-gray-300 text-sm mt-2">
          We'll keep you updated on new episodes
        </p>

        <button className="mt-4 bg-white text-black font-bold px-4 py-2 rounded-full hover:scale-105 transition">
          Browse podcasts
        </button>
      </div>

    </div>
  );
};

export default Sidebar;