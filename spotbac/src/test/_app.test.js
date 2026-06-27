require("dotenv").config();

const request = require("supertest");
const mongoose = require("mongoose");
const connectDB = require("../db/db");
const app = require("../app");

beforeAll(async () => {
    await connectDB();
});

afterAll(async () => {
    await mongoose.disconnect();
});

describe("Spotbac Application", () => {

    test("Unknown route returns 404", async () => {
        const res = await request(app)
            .get("/this-route-does-not-exist");

        expect(res.statusCode).toBe(404);
    });

    test("Register endpoint is available", async () => {
        const res = await request(app)
            .post("/api/auth/register")
            .send({
                username: "app_test_user",
                email: `app_test_${Date.now()}@gmail.com`,
                password: "123456"
            });

        expect([201, 409]).toContain(res.statusCode);
        expect(res.headers["content-type"]).toMatch(/json/);
    });

    test("Login endpoint is available", async () => {
        const res = await request(app)
            .post("/api/auth/login")
            .send({
                email: "nonexistent@gmail.com",
                password: "wrongpassword"
            });

        expect([200, 401]).toContain(res.statusCode);
        expect(res.headers["content-type"]).toMatch(/json/);
    });

    test("Logout endpoint is available", async () => {
        const res = await request(app)
            .post("/api/auth/logout");

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBeDefined();
    });

    test("Music route requires authentication", async () => {
        const res = await request(app)
            .get("/api/music");

        expect(res.statusCode).toBe(401);
    });

    test("Albums route requires authentication", async () => {
        const res = await request(app)
            .get("/api/music/albums");

        expect(res.statusCode).toBe(401);
    });

});