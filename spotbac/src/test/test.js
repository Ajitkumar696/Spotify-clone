require("dotenv").config();
const ImageKit = require("@imagekit/nodejs");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

(async () => {
  try {
    const result = await imagekit.files.upload({
      file: "data:text/plain;base64,SGVsbG8gV29ybGQ=",
      fileName: "hello.txt",
    });

    console.log("SUCCESS");
    console.log(result);
  } catch (err) {
    console.log("FAILED");
    console.log(err);
  }
})();