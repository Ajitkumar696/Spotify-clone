import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import MusicSection from "./MusicSection";
import PopularArtists from "./PopularArtist";

const Displayhome = () => {
  return (
    <div className="flex h-screen bg-black text-white">

      {/* hide scrollbar style (FIXED) */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 lg:w-72">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Navbar */}
        <div className="h-16 flex-shrink-0">
          <Navbar />
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <div className="px-2 sm:px-4 lg:px-6 space-y-6 pb-32">

            <MusicSection />
            <PopularArtists />

          </div>
        </div>

      </div>
    </div>
  );
};

export default Displayhome;