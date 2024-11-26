const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../index");
const dotenv = require("dotenv");

dotenv.config();

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  if (mongoose.connection.db) {
    await mongoose.connection.db.dropDatabase();
  }
  await mongoose.connection.close();
});

describe("URL Shortener API", () => {
  let testShortId;

  test("POST /shorten - Should shorten a URL", async () => {
    const response = await request(app)
      .post("/shorten")
      .send({ originalUrl: "https://google.com" });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("shortUrl");
    testShortId = response.body.shortUrl.split("/").pop();
  });

  test("GET /stats/:shortId - Should return URL stats", async () => {
    const response = await request(app).get(`/stats/${testShortId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("originalUrl", "https://google.com");
    expect(response.body).toHaveProperty("clicks", 0);
  });

  test("GET /:shortId - Should redirect to the original URL", async () => {
    const response = await request(app).get(`/${testShortId}`);
    expect(response.statusCode).toBe(302);
    expect(response.headers.location).toBe("https://google.com");
  });

  test("GET /stats/:shortId - Should update clicks", async () => {
    const response = await request(app).get(`/stats/${testShortId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.clicks).toBe(1);
  });

  test("GET /stats/:shortId - Should return 404 for non-existent shortId", async () => {
    const response = await request(app).get(`/stats/nonexistentId`);
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("error", "shortId not found");
  });
});
