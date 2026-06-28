const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

const authroutes = require('./routes/auth.routes');
const musicroutes = require('./routes/music.routes');

app.use(cors({
  origin: ["http://localhost:5173", "https://spotify-clone-blond-two.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// routes
app.use('/api/auth', authroutes);
app.use('/api/music', musicroutes);

module.exports = app;