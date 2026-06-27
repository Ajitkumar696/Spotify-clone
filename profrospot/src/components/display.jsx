import React from "react";
import { Routes, Route } from "react-router-dom";

import Welcome from "./welcom";
import RoleSelection from "./rolesection";
import AuthChoice from "./AuthChoice";
import Login from "./login";
import Register from "./signup";

import Displayhome from "./displayhome";
import ArtistPage from "./ArtistPage";
import UploadMusic from "./UploadMusic";
import SearchPage from "./SearchPage"; // ✅ ADD THIS

const Display = () => {
  return (
    <div className="w-screen h-screen bg-[#121212] text-white overflow-auto">

      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/role" element={<RoleSelection />} />

        <Route path="/home" element={<Displayhome />} />

        <Route path="/artist/:username" element={<ArtistPage />} />

        <Route path="/upload" element={<UploadMusic />} />

        <Route path="/search" element={<SearchPage />} /> {/* ✅ IMPORTANT */}

        <Route path="/auth/:role" element={<AuthChoice />} />
        <Route path="/login/:role" element={<Login />} />
        <Route path="/signup/:role" element={<Register />} />
      </Routes>

    </div>
  );
};

export default Display;