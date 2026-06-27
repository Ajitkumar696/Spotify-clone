require("dotenv").config();

const request = require("supertest");
const mongoose = require("mongoose");

const connectDB = require("../db/db");
const app = require("../app");

const userModel = require("../model/user.model");
const albumModel = require("../model/album.model");

beforeAll(async () => {
    await connectDB();
});

afterAll(async () => {
    await mongoose.disconnect();
});

describe("Album APIs", () => {

    const artist = {
        username: "album_artist",
        email: "album_artist@gmail.com",
        password: "123456",
        role: "artist"
    };

    const normalUser = {
        username: "album_user",
        email: "album_user@gmail.com",
        password: "123456",
        role: "user"
    };

    let artistAgent;
    let userAgent;

    beforeEach(async () => {

        await userModel.deleteMany({
            email: {
                $in: [
                    artist.email,
                    normalUser.email
                ]
            }
        });

        await albumModel.deleteMany({});

        // Artist login
        artistAgent = request.agent(app);

        await artistAgent
            .post("/api/auth/register")
            .send(artist);

        await artistAgent
            .post("/api/auth/login")
            .send({
                email: artist.email,
                password: artist.password
            });

        // Normal user login
        userAgent = request.agent(app);

        await userAgent
            .post("/api/auth/register")
            .send(normalUser);

        await userAgent
            .post("/api/auth/login")
            .send({
                email: normalUser.email,
                password: normalUser.password
            });
    });

    test("Artist can create album", async () => {

        const res = await artistAgent
            .post("/api/music/album")
            .send({
                title: "My First Album",
                musics: []
            });

        expect(res.statusCode).toBe(201);

        expect(res.body.message)
            .toBe("album created sucessfully");

        expect(res.body.album.title)
            .toBe("My First Album");
    });

    test("Album creation requires authentication", async () => {

        const res = await request(app)
            .post("/api/music/album")
            .send({
                title: "Unauthorized Album",
                musics: []
            });

        expect(res.statusCode).toBe(401);
    });

    test("User can get all albums", async () => {

        await artistAgent
            .post("/api/music/album")
            .send({
                title: "Album One",
                musics: []
            });

        const res = await userAgent
            .get("/api/music/albums");

        expect(res.statusCode).toBe(200);

        expect(Array.isArray(res.body.albums))
            .toBe(true);
    });

    test("User can get album by id", async () => {

        const createRes = await artistAgent
            .post("/api/music/album")
            .send({
                title: "Fetch Album",
                musics: []
            });

        const albumId = createRes.body.album.id;

        const res = await userAgent
            .get(`/api/music/albums/${albumId}`);

        expect(res.statusCode).toBe(200);

        expect(res.body.album.title)
            .toBe("Fetch Album");
    });

    test("Get albums requires authentication", async () => {

        const res = await request(app)
            .get("/api/music/albums");

        expect(res.statusCode).toBe(401);
    });

    test("Get album by id requires authentication", async () => {

        const album = await albumModel.create({
            title: "Test Album",
            artist: (
                await userModel.findOne({
                    email: artist.email
                })
            )._id,
            musics: []
        });

        const res = await request(app)
            .get(`/api/music/albums/${album._id}`);

        expect(res.statusCode).toBe(401);
    });

});