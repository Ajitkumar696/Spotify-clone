import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UploadMusic = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [songFile, setSongFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔒 ROLE CHECK
  useEffect(() => {
    const role = (localStorage.getItem("role") || "")
      .trim()
      .toLowerCase();

    if (role !== "artist") {
      navigate("/home", { replace: true });
    }
  }, [navigate]);

  // 🎵 UPLOAD FUNCTION
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !coverImage || !songFile) {
      alert("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("coverImage", coverImage);
    formData.append("songFile", songFile);

    try {
      setLoading(true);

      const res = await fetch("http://localhost:3000/api/music/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        alert("🎉 Upload Successful!");

        setTitle("");
        setCoverImage(null);
        setSongFile(null);

        navigate("/home", { replace: true });
      } else {
        alert(data.message || "Upload failed");
      }
    } catch (err) {
      console.log(err);
      alert("Server error while uploading");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">

      {/* CARD */}
      <form
        onSubmit={handleSubmit}
        className="bg-[#181818] p-8 rounded-xl w-full max-w-lg space-y-6 text-white"
      >
        <h1 className="text-3xl font-bold text-center">
          Upload Music
        </h1>

        {/* TITLE */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter song title"
          className="w-full p-3 rounded bg-[#282828] outline-none"
        />

        {/* COVER IMAGE */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setCoverImage(e.target.files[0])}
          className="w-full text-white"
        />

        {/* SONG FILE */}
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => setSongFile(e.target.files[0])}
          className="w-full text-white"
        />

        {/* UPLOAD BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-3 rounded-full"
        >
          {loading ? "Uploading..." : "Upload Song"}
        </button>
      </form>

      {/* 🔙 BACK BUTTON (OUTSIDE CARD) */}
      <button
        onClick={() => navigate("/home", { replace: true })}
        className="mt-6 w-full max-w-lg bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-full"
      >
        Back Home
      </button>

    </div>
  );
};

export default UploadMusic;