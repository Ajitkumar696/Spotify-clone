const musicModel = require("../model/music.model");
const albumModel = require("../model/album.model");
const { uploadFile } = require("../services/storage.service");

// 🎵 CREATE MUSIC
async function creatMusic(req, res) {
  try {
    const { title } = req.body;

    const songFile = req.files?.songFile?.[0];
    const coverImage = req.files?.coverImage?.[0];

    console.log("REQ USER:", req.user);
    console.log("FILES RECEIVED:", req.files);

    if (!title || !songFile || !coverImage) {
      return res.status(400).json({ message: "Missing fields" });
    }

    // ✅ Convert files to base64
    const songBase64 = `data:${songFile.mimetype};base64,${songFile.buffer.toString("base64")}`;
    const imageBase64 = `data:${coverImage.mimetype};base64,${coverImage.buffer.toString("base64")}`;

    // ✅ Upload to ImageKit
    const songResult = await uploadFile(songBase64);
    const imageResult = await uploadFile(imageBase64);

    console.log("SONG RESULT:", songResult);
    console.log("IMAGE RESULT:", imageResult);

    // ❗ safety check
    if (!songResult?.url || !imageResult?.url) {
      return res.status(500).json({
        message: "Image upload failed",
      });
    }

    // ✅ Save in MongoDB
    const music = await musicModel.create({
      title,
      uri: songResult.url,
      coverImage: imageResult.url,
      artist: req.user.id,
    });

    console.log("MUSIC SAVED:", music);

    return res.status(201).json({
      message: "Music uploaded successfully",
      music,
    });

  } catch (err) {
    console.log("UPLOAD ERROR:", err);
    return res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
}

// 🎧 GET ALL MUSIC
async function getAllmusics(req, res) {
  try {
    const musics = await musicModel
      .find()
      .populate("artist", "username email");

    return res.status(200).json({
      message: "music fetched successfully",
      music: musics,
    });
  } catch (err) {
    return res.status(500).json({ message: "Error fetching music" });
  }
}

// 🎵 CREATE ALBUM
async function creatAlbum(req, res) {
  try {
    const { title, musics } = req.body;

    const album = await albumModel.create({
      title,
      musics,
      artist: req.user.id,
    });

    return res.status(201).json({
      message: "album created successfully",
      album,
    });
  } catch (err) {
    return res.status(500).json({ message: "Error creating album" });
  }
}

// 🎧 GET ALBUMS
async function getAllalbums(req, res) {
  try {
    const albums = await albumModel
      .find()
      .populate("artist", "username email");

    return res.status(200).json({
      message: "album fetched successfully",
      albums,
    });
  } catch (err) {
    return res.status(500).json({ message: "Error fetching albums" });
  }
}

// 🎧 GET SINGLE ALBUM
async function getAllalbumById(req, res) {
  try {
    const album = await albumModel
      .findById(req.params.albumId)
      .populate("artist", "username email");

    return res.status(200).json({
      message: "album fetched successfully",
      album,
    });
  } catch (err) {
    return res.status(500).json({ message: "Error fetching album" });
  }
}

module.exports = {
  creatMusic,
  creatAlbum,
  getAllmusics,
  getAllalbums,
  getAllalbumById,
};