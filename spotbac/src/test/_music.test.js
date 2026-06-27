require("dotenv").config();

const request = require("supertest");
const mongoose = require("mongoose");
const connectDB = require("../db/db");
const app = require("../app");

const userModel = require("../model/user.model");
const musicModel = require("../model/music.model");

jest.mock("../services/storage.service", () => ({
    uploadFile: jest.fn().mockResolvedValue({
        url: "https://example.com/test-song.mp3"
    })
}));

beforeAll(async () => {
    await connectDB();
});

afterAll(async () => {
    await mongoose.disconnect();
});

describe("Music APIs", () => {

    const artist = {
        username: "music_artist",
        email: "music_artist@gmail.com",
        password: "123456",
        role: "artist"
    };

    let agent;

    beforeEach(async () => {
        await userModel.deleteMany({
            email: artist.email
        });

        await musicModel.deleteMany({});

        agent = request.agent(app);

        await agent
            .post("/api/auth/register")
            .send(artist);

        await agent
            .post("/api/auth/login")
            .send({
                email: artist.email,
                password: artist.password
            });
    });

    test("Artist can upload music", async () => {
        const res = await agent
            .post("/api/music/upload")
            .field("title", "My First Song")
            .attach(
                "music",
                Buffer.from("fake music file"),
                "song.mp3"
            );

        expect(res.statusCode).toBe(201);

        expect(res.body.message)
            .toBe("Music created successfully");

        expect(res.body.music.title)
            .toBe("My First Song");

        expect(res.body.music.uri)
            .toBe("https://example.com/test-song.mp3");
    });

    test("Upload without file returns 400", async () => {
        const res = await agent
            .post("/api/music/upload")
            .field("title", "Song Without File");

        expect(res.statusCode).toBe(400);

        expect(res.body.message)
            .toBe("No file uploaded");
    });

    test("Upload requires authentication", async () => {
        const res = await request(app)
            .post("/api/music/upload")
            .field("title", "Unauthorized Song");

        expect(res.statusCode).toBe(401);
    });

    test("Get music requires authentication", async () => {
        const res = await request(app)
            .get("/api/music");

        expect(res.statusCode).toBe(401);
    });

});