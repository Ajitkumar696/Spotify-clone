const express = require("express");
const multer = require("multer");

const musicController = require("../controller/music.controller");
const authMiddlewear = require("../middlewears/auth.middlewear");

const musicroutes = express.Router();

// ✅ Multer config (memory for ImageKit)
const upload = multer({
  storage: multer.memoryStorage(),
});

// 🎵 UPLOAD MUSIC
musicroutes.post(
  "/upload",
  authMiddlewear.authArtist,
  upload.fields([
    { name: "songFile", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  musicController.creatMusic
);

// 🎧 GET ALL MUSIC
musicroutes.get("/", authMiddlewear.auth, musicController.getAllmusics);

// 🎧 ALBUM ROUTES
musicroutes.post("/album", authMiddlewear.authArtist, musicController.creatAlbum);
musicroutes.get("/albums", authMiddlewear.auth, musicController.getAllalbums);
musicroutes.get("/albums/:albumId", authMiddlewear.auth, musicController.getAllalbumById);

module.exports = musicroutes;