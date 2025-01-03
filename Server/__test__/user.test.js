const request = require("supertest");
const app = require("../app");
const { signToken, verifyToken } = require("../helpers/jwt");
const { hash } = require("../helpers/bcrypt");
const { sequelize } = require("../models");

let access_token;
beforeAll(async () => {
  try {
    const shelters = require("../data/shelters.json");
    shelters.forEach(shelter => {
      shelter.updatedAt = shelter.createdAt = new Date();
    });

    await sequelize.queryInterface.bulkInsert("Shelters", shelters, {});

    const users = require("../data/users.json");
    users.forEach((el) => {
      delete el.id;  
      el.password = hash(el.password);  
      el.updatedAt = el.createdAt = new Date();
    });

    await sequelize.queryInterface.bulkInsert("Users", users, {});
    const payload = {
      id: 1,
      email: "admin@example.com",
      role: "Admin",
    };
    access_token = signToken(payload);
  } catch (error) {
    console.error(error);
  }
});



afterAll(async () => {
try {
  await sequelize.queryInterface.bulkDelete("Users", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await sequelize.queryInterface.bulkDelete("Shelters", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
} catch (error) {
  console.log(error);
  
}
});

describe("POST /login", () => {
  describe("POST /login - succeed", () => {
    it("should be return an access_token", async () => {
      const body = { email: "admin@example.com", password: "adminPass123" };
      const response = await request(app).post("/login").send(body);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("access_token", expect.any(String));
    });
  });

  describe("POST /login - failed", () => {
    it("should be return an object with error message", async () => {
      const body = { email: "", password: "admin" };
      const response = await request(app).post("/login").send(body);
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });

  describe("POST /login - failed", () => {
    it("should be return an object with error message", async () => {
      const body = { email: "admin@example.com", password: "" };
      const response = await request(app).post("/login").send(body);
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });

  describe("POST /login - failed", () => {
    it("should be return an object with error message", async () => {
      const body = { email: "emailbodong@abcde.com", password: "adminPass123" };
      const response = await request(app).post("/login").send(body);
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });

  describe("POST /login - failed", () => {
    it("should be return an object with error message", async () => {
      const body = { email: "admin@example.com", password: "salahPassword" };
      const response = await request(app).post("/login").send(body);
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });
});
