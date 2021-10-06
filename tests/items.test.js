const app = require("../app");
const request = require("supertest");

const { Item } = require("../models");

describe("Items route test", () => {
  describe("GET /items", () => {
    test("200 Success get all items", (done) => {
      request(app)
        .get("/items")
        .set("Accept", "application/json")
        .then((res) => {
          const { status, body } = res;

          expect(status).toBe(200);
          expect.arrayContaining(body);
          done();
        })
        .catch((err) => done(err));
    });
  });
});
