import React from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center relative overflow-hidden">
      
      {/* Background Blur Circles */}
      <div className="absolute w-96 h-96 bg-green-500/20 rounded-full blur-3xl top-10 left-10"></div>
      <div className="absolute w-96 h-96 bg-green-500/10 rounded-full blur-3xl bottom-10 right-10"></div>

      {/* Content */}
      <div className="z-10 text-center max-w-4xl px-6">
        
        <h1 className="text-6xl md:text-8xl font-extrabold leading-tight">
          Feel the Music.
        </h1>

        <h2 className="text-6xl md:text-8xl font-extrabold text-green-500 mt-2">
          Live the Moment.
        </h2>

        <p className="mt-8 text-lg md:text-xl text-gray-400">
          Stream millions of songs, discover new artists,
          create playlists and enjoy music without limits.
        </p>

        <button
          onClick={() => navigate("/role")}
          className="mt-10 bg-green-500 text-black font-bold px-8 py-4 rounded-full text-lg hover:scale-105 transition-all duration-300"
        >
          Start Listening
        </button>

      </div>

      {/* Bottom Decorative Line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent"></div>
    </div>
  );
};

export default Welcome;