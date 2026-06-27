import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";

const SearchPage = () => {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);

  // ---------------- FETCH ALL SONGS ----------------
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/music", {
          credentials: "include",
        });

        const data = await res.json();
        const allSongs = data.music || [];

        setSongs(allSongs);
        setFilteredSongs(allSongs); // default show all
      } catch (err) {
        console.log("Search page error:", err);
      }
    };

    fetchSongs();
  }, []);

  // ---------------- SEARCH LOGIC ----------------
  const handleSearch = (text) => {
    setQuery(text);

    if (!text.trim()) {
      setFilteredSongs(songs);
      return;
    }

    const result = songs.filter((song) => {
      return (
        song.title?.toLowerCase().includes(text.toLowerCase()) ||
        song.artist?.username?.toLowerCase().includes(text.toLowerCase())
      );
    });

    // if no result → show all songs (fallback)
    if (result.length === 0) {
      setFilteredSongs(songs);
    } else {
      setFilteredSongs(result);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">

      {/* HEADER */}
      <div className="flex items-center gap-3 p-4 bg-[#181818]">
        <button onClick={() => navigate("/home")}>
          <ArrowLeft />
        </button>

        <div className="flex items-center bg-[#282828] px-3 py-2 rounded-full w-full">
          <Search className="text-gray-400" size={18} />
          <input
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search songs or artists..."
            className="bg-transparent outline-none ml-2 w-full text-white"
          />
        </div>
      </div>

      {/* RESULTS */}
      <div className="p-4">

        {query && filteredSongs.length > 0 && (
          <p className="text-gray-400 mb-3">
            Search results for "{query}"
          </p>
        )}

        {!query && (
          <p className="text-gray-400 mb-3">
            Recommended songs
          </p>
        )}

        <div className="space-y-3">
          {filteredSongs.map((song) => (
            <div
              key={song._id}
              className="flex items-center justify-between bg-[#181818] p-3 rounded-lg hover:bg-[#282828]"
            >
              {/* LEFT */}
              <div className="flex items-center gap-3">
                <img
                  src={
                    song.coverImage ||
                    `https://picsum.photos/80/80?random=${song._id}`
                  }
                  className="w-12 h-12 rounded-md object-cover"
                />

                <div>
                  <h2 className="font-semibold">{song.title}</h2>
                  <p className="text-xs text-gray-400">
                    {song.artist?.username}
                  </p>
                </div>
              </div>

              {/* PLAY BUTTON (optional later connect global player) */}
              <button
                className="bg-green-500 text-black px-4 py-1 rounded-full"
                onClick={() => console.log("play:", song.uri)}
              >
                ▶
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;