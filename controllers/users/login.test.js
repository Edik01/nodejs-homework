const app = require("../../app");
const mongoose = require("mongoose");
require("dotenv").config();
const { DB_HOST, PORT = 3000 } = process.env;
const request = require("supertest");
const { expect } = require("@jest/globals");

describe("test login function", () => {
  let server;
  let response;
  beforeAll(() => {
    return mongoose
      .connect(DB_HOST)
      .then(() => {
        server = app.listen(3000);
      })
      .catch((error) => {
        console.log(error.message);
        process.exit(1);
      });
  });
  afterAll(() => {
    mongoose.disconnect(DB_HOST).then(() => {
      server.close();
    });
  });
  test("test status 200 ", async () => {
    response = await request(app)
      .post("/api/users/login")
      .send({ password: "secret", email: "secret@mail.com" });
    expect(response.statusCode).toBe(200);
  });
  test("test includes property token in response  ", async () => {
    response = await request(app)
      .post("/api/users/login")
      .send({ password: "secret", email: "secret@mail.com" });
    expect(response.body).toHaveProperty("token");
  });
  test("test includes property user in response ", async () => {
    response = await request(app)
      .post("/api/users/login")
      .send({ password: "secret", email: "secret@mail.com" });
    expect(response.body).toHaveProperty("user");
  });
  test("test  property user in response its object with properties email, subscription ", async () => {
    response = await request(app)
      .post("/api/users/login")
      .send({ password: "secret", email: "secret@mail.com" });
    expect(response.body.user).toHaveProperty("email");
    expect(response.body.user).toHaveProperty("subscription");
    expect(typeof response.body.user.email).toBe("string");
    expect(typeof response.body.user.subscription).toBe("string");
  });
});
