// before testing comment <- if (!comparePassword) -> in auth.controller

const mongoose = require("mongoose");
const request = require("supertest");
require("dotenv").config();

const app = require("../../app");
const { User } = require("../model/user");

const { DB_HOST } = process.env;

describe.only("test login rout", () => {
  let server;
  beforeAll(() => (server = app.listen(3000)));
  afterAll(() => server.close());

  beforeEach((done) => {
    mongoose.connect(DB_HOST).then(() => done());
  });

  test("login", async () => {
    const newUser = {
      password: "123456",
      email: "test@gmail.com",
      subscription: "starter",
      avatarURL: "avatars",
    };

    const user = await User.create(newUser);

    const login = {
      email: "test@gmail.com",
      password: "123456",
    };

    const response = await request(app)
      .post("/users/login")
      .send(login);
    expect(response.statusCode).toBe(200);
    const { body } = response;
    const { token, email, subscription } = await User.findById(
      user._id
    );
    expect(body.token).toBe(token);
  });
});

// read comment in line 1
