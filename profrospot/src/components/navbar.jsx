import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  User,
  Search,
} from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");

  const [user, setUser] = useState({
    username: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    setUser({
      username: storedUser.username || "",
      email: storedUser.email || "",
      role: (storedUser.role || "").toLowerCase(),
    });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logout = async () => {
    try {
      await fetch("http://localhost:3000/api/logout", {
        method: "POST",
        credentials: "include",
      });
      localStorage.removeItem("user");
      setUser({ username: "", email: "", role: "" });
      setOpen(false);
      setMobileOpen(false);
      navigate("/", { replace: true });
      window.location.reload();
    } catch (err) {
      console.log("Logout error:", err);
    }
  };

  const handleSearch = () => {
    if (search.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(search)}`);
    }
  };

  const isArtist = user.role === "artist";

  return (
    <div className="w-full h-16 bg-black flex items-center justify-between px-3 sm:px-6 text-white gap-2 relative z-40">

      {/* LOGO - always leftmost */}
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg"
        className="w-8 h-8 cursor-pointer flex-shrink-0"
        onClick={() => navigate("/home")}
      />

      {/* DESKTOP/TABLET ONLY: BACK / FORWARD ARROWS */}
      <button
        onClick={() => navigate(-1)}
        className="hidden md:flex bg-zinc-900 p-2 rounded-full flex-shrink-0"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        onClick={() => navigate(1)}
        className="hidden md:flex bg-zinc-900 p-2 rounded-full flex-shrink-0"
      >
        <ChevronRight size={20} />
      </button>

      {/* SEARCH BAR */}
      <div className="flex items-center bg-zinc-800 rounded-full px-3 sm:px-4 py-2 w-full max-w-[200px] sm:max-w-none sm:w-96 gap-2 min-w-0 flex-1 md:flex-shrink">
        <Search size={16} className="text-gray-400 flex-shrink-0" />
        <input
          className="bg-transparent outline-none text-white w-full min-w-0 text-sm"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
      </div>

      {/* DESKTOP/TABLET ONLY: Explore Premium / Support / Download */}
      <button className="hidden lg:block bg-white text-black px-4 py-2 rounded-full font-bold whitespace-nowrap flex-shrink-0">
        Explore Premium
      </button>

      <button className="hidden lg:block text-gray-300 whitespace-nowrap flex-shrink-0">
        Support
      </button>

      <button className="hidden md:flex items-center gap-2 bg-zinc-900 px-4 py-2 rounded-full whitespace-nowrap flex-shrink-0">
        <Download size={16} />
        Download
      </button>

      {/* MOBILE ONLY: PROFILE BUTTON - rightmost */}
      <div className="md:hidden relative flex-shrink-0" ref={mobileDropdownRef}>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0"
        >
          <User size={18} />
        </button>

        {mobileOpen && (
          <div className="absolute right-0 top-12 w-64 bg-[#181818] rounded-xl p-4 shadow-2xl z-50">
            <p className="truncate text-sm text-gray-300">
              Username: <span className="text-white">{user.username}</span>
            </p>
            <p className="truncate text-sm text-gray-300 mt-1">
              Email: <span className="text-white">{user.email}</span>
            </p>
            <p className="text-sm text-gray-300 mt-1">
              Role: <span className="text-white">{user.role}</span>
            </p>

            {isArtist && (
              <button
                onClick={() => {
                  setMobileOpen(false);
                  navigate("/upload");
                }}
                className="w-full mt-4 bg-green-500 text-black py-2 rounded-full font-bold"
              >
                + Upload Music
              </button>
            )}

            <button
              onClick={logout}
              className="w-full mt-4 bg-red-500 text-white py-2 rounded-full font-bold"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* DESKTOP/TABLET ONLY: PROFILE BUTTON - rightmost */}
      <div className="hidden md:block relative flex-shrink-0" ref={dropdownRef}>
        <button
          onClick={() => setOpen(!open)}
          className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0"
        >
          <User size={18} />
        </button>

        {open && (
          <div className="absolute right-0 top-12 w-64 bg-[#181818] rounded-xl p-4 shadow-2xl z-50">
            <p className="truncate text-sm text-gray-300">
              Username: <span className="text-white">{user.username}</span>
            </p>
            <p className="truncate text-sm text-gray-300 mt-1">
              Email: <span className="text-white">{user.email}</span>
            </p>
            <p className="text-sm text-gray-300 mt-1">
              Role: <span className="text-white">{user.role}</span>
            </p>

            {isArtist && (
              <button
                onClick={() => {
                  setOpen(false);
                  navigate("/upload");
                }}
                className="w-full mt-4 bg-green-500 text-black py-2 rounded-full font-bold"
              >
                + Upload Music
              </button>
            )}

            <button
              onClick={logout}
              className="w-full mt-4 bg-red-500 text-white py-2 rounded-full font-bold"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;