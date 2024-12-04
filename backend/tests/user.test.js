const request = require('supertest');
const app = require('../index'); 

describe("User API Tests", () => {
  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/users/register")
      .send({
        name: "Saurav",
        email: "sauravKharat@gmail.com",
        password: "password12345"
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body.user).toHaveProperty("_id");
  });

  it("should not register with an existing email", async () => {
    const res = await request(app)
      .post("/api/users/register")
      .send({
        name: "Saurav",
        email: "sauravKharat@gmail.com",
        password: "password12345"
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("User already exists");
  });
});
