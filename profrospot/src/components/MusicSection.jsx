import React, { useEffect, useState, useRef } from "react";

const MusicSection = () => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(new Audio());

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/music", {
          credentials: "include",
        });
        const data = await res.json();
        setSongs((data.music || []).reverse());
      } catch (err) {
        console.log(err);
      }
    };
    fetchSongs();
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    const update = () => {
      setProgress(audio.currentTime || 0);
      setDuration(audio.duration || 0);
      setIsPlaying(!audio.paused);
    };

    audio.addEventListener("timeupdate", update);
    audio.addEventListener("loadedmetadata", update);
    audio.addEventListener("play", update);
    audio.addEventListener("pause", update);

    return () => {
      audio.removeEventListener("timeupdate", update);
      audio.removeEventListener("loadedmetadata", update);
      audio.removeEventListener("play", update);
      audio.removeEventListener("pause", update);
    };
  }, []);

  const playSong = (song) => {
    const audio = audioRef.current;
    if (!song?.uri) return;

    if (currentSong?._id === song._id) {
      audio.paused ? audio.play() : audio.pause();
      return;
    }

    audio.src = song.uri;
    audio.load();
    audio.play().catch(console.log);

    setCurrentSong(song);
    setIsPlaying(true);
  };

  const togglePlay = (e) => {
    e?.stopPropagation();
    const audio = audioRef.current;
    audio.paused ? audio.play() : audio.pause();
  };

  const handleSeek = (e) => {
    const value = Number(e.target.value);
    audioRef.current.currentTime = value;
    setProgress(value);
  };

  const formatTime = (t) => {
    if (!t) return "0:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const progressPct = duration ? (progress / duration) * 100 : 0;

  return (
    <div className={`text-white bg-black ${currentSong ? "pb-28" : "pb-2"}`}>

      {/* 🔥 HIDE SCROLLBAR (GLOBAL STYLE) */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="px-4 sm:px-6 pt-6">
        <h2 className="text-xl sm:text-2xl font-bold">
          Trending Songs 🔥
        </h2>
      </div>

      {/* 🔥 HORIZONTAL SCROLL WITHOUT SCROLLBAR */}
      <div
        className="
          hide-scrollbar
          mt-6 px-4 sm:px-6
          flex gap-3 sm:gap-4
          overflow-x-auto
          scroll-smooth
          snap-x snap-mandatory
        "
      >
        {songs.map((song) => {
          const active = currentSong?._id === song._id;

          return (
            <div
              key={song._id}
              onClick={() => playSong(song)}
              className="
                group bg-[#181818]
                hover:bg-[#282828]
                rounded-xl overflow-hidden
                cursor-pointer transition
                shrink-0
                w-[calc(50%-0.375rem)]
                sm:w-40 md:w-44
                snap-start
              "
            >
              <div className="relative w-full aspect-square">
                <img
  src={
    song.coverImage
      ? song.coverImage
      : `https://picsum.photos/300/300?random=${song._id}`
  }
  className="w-full h-full object-cover"
  alt={song.title}
/>

                <div
                  className={`
                    absolute bottom-2 right-2
                    w-9 h-9 rounded-full
                    bg-green-500 text-black
                    flex items-center justify-center
                    transition-opacity
                    ${active ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
                  `}
                >
                  {active && isPlaying ? "⏸" : "▶"}
                </div>
              </div>

              <div className="p-3">
                <h3 className="text-sm font-semibold truncate">
                  {song.title}
                </h3>
                <p className="text-xs text-gray-400 truncate">
                  {song.artist?.username}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* PLAYER (UNCHANGED) */}
     {currentSong && (
  <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 z-50">

    {/* Progress Bar */}
    <div className="px-4 pt-2">
      <input
        type="range"
        min="0"
        max={duration || 0}
        value={progress}
        onChange={handleSeek}
        className="w-full accent-green-500 cursor-pointer"
      />

      <div className="flex justify-between text-xs text-gray-400 mt-1">
        <span>{formatTime(progress)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>

    {/* Player */}
    <div className="flex items-center gap-3 px-4 py-3">

      <img
        src={
          currentSong.coverImage ||
          `https://picsum.photos/100/100?random=${currentSong._id}`
        }
        alt={currentSong.title}
        className="w-12 h-12 rounded-md object-cover"
      />

      <div className="flex-1">
        <p className="font-semibold truncate">
          {currentSong.title}
        </p>
        <p className="text-sm text-gray-400 truncate">
          {currentSong.artist?.username}
        </p>
      </div>

      <button
        onClick={togglePlay}
        className="bg-green-500 text-black w-12 h-12 rounded-full text-xl font-bold"
      >
        {isPlaying ? "⏸" : "▶"}
      </button>

    </div>
  </div>
)}
    </div>
  );
};

export default MusicSection;