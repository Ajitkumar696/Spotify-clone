const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadFile(file) {
  try {
    const result = await imagekit.upload({
      file: file,
      fileName: `music_${Date.now()}`,
      folder: "/spotify-clone/music",
    });

    console.log("IMAGEKIT RESULT:", result);
    return result;
  } catch (err) {
    console.error("IMAGEKIT ERROR:", err);
    throw err;
  }
}

module.exports = { uploadFile };