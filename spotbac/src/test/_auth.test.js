require("dotenv").config();

const request = require("supertest");
const mongoose = require("mongoose");
const connectDB = require("../db/db");
const app = require("../app");
const userModel = require("../model/user.model");

beforeAll(async () => {
    await connectDB();
});

afterAll(async () => {
    await mongoose.disconnect();
});

describe("Auth APIs", () => {

    const testUser = {
        username: "auth_test_user",
        email: "auth_test_user@gmail.com",
        password: "123456"
    };

    beforeEach(async () => {
        await userModel.deleteMany({
            email: testUser.email
        });
    });

    test("Register new user", async () => {
        const res = await request(app)
            .post("/api/auth/register")
            .send(testUser);

        expect(res.statusCode).toBe(201);
        expect(res.body.message)
            .toBe("user registered successfully");

        expect(res.body.user.email)
            .toBe(testUser.email);
    });

    test("Register duplicate user returns 409", async () => {
        await request(app)
            .post("/api/auth/register")
            .send(testUser);

        const res = await request(app)
            .post("/api/auth/register")
            .send(testUser);

        expect(res.statusCode).toBe(409);
        expect(res.body.message)
            .toBe("user already exists");
    });

    test("Login with valid credentials", async () => {
        await request(app)
            .post("/api/auth/register")
            .send(testUser);

        const res = await request(app)
            .post("/api/auth/login")
            .send({
                email: testUser.email,
                password: testUser.password
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.user.email)
            .toBe(testUser.email);
    });

    test("Login with wrong password", async () => {
        await request(app)
            .post("/api/auth/register")
            .send(testUser);

        const res = await request(app)
            .post("/api/auth/login")
            .send({
                email: testUser.email,
                password: "wrongpassword"
            });

        expect(res.statusCode).toBe(401);
        expect(res.body.message)
            .toBe("invalid user credentials");
    });

    test("Login with non-existing user", async () => {
        const res = await request(app)
            .post("/api/auth/login")
            .send({
                email: "nouser@gmail.com",
                password: "123456"
            });

        expect(res.statusCode).toBe(401);
    });

    test("Logout user", async () => {
        const res = await request(app)
            .post("/api/auth/logout");

        expect(res.statusCode).toBe(200);
        expect(res.body.message)
            .toBe("user logged out sucessfully");
    });

});