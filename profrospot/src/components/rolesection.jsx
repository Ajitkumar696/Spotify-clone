import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Mic2 } from "lucide-react";

const RoleSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      
      {/* Back Button */}
      <div className="p-6">
        <ArrowLeft
          size={30}
          className="cursor-pointer hover:text-green-500 transition"
          onClick={() => navigate(-1)}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        
        <h1 className="text-5xl font-bold mb-3">
          Choose Your Role
        </h1>

        <p className="text-gray-400 mb-12 text-center">
          Continue as a listener or an artist
        </p>

        <div className="flex flex-col md:flex-row gap-8">
          
          {/* User Card */}
          <div
           onClick={() => navigate("/auth/user")}
            className="bg-[#181818] hover:bg-[#242424] p-10 rounded-2xl w-72 cursor-pointer transition hover:scale-105"
          >
            <User size={60} className="text-green-500 mb-4" />

            <h2 className="text-2xl font-bold mb-2">
              User
            </h2>

            <p className="text-gray-400">
              Listen to music, create playlists and discover artists.
            </p>
          </div>

          {/* Artist Card */}
          <div
           onClick={() => navigate("/auth/artist")}
            className="bg-[#181818] hover:bg-[#242424] p-10 rounded-2xl w-72 cursor-pointer transition hover:scale-105"
          >
            <Mic2 size={60} className="text-green-500 mb-4" />

            <h2 className="text-2xl font-bold mb-2">
              Artist
            </h2>

            <p className="text-gray-400">
              Upload songs, manage albums and grow your audience.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default RoleSelection;