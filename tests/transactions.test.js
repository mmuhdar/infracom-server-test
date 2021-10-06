const app = require("../app");
const request = require("supertest");

const { Item, Transaction, sequelize } = require("../models");
const { queryInterface } = sequelize;
let itemDummy;
let transactionDummy;

beforeAll((done) => {
  Item.create({
    name: "Test",
    price: 5000,
    stock: 5,
    imageURL: "Test",
  })
    .then((res) => {
      itemDummy = res;
      return Transaction.create({
        transaction_code: "adfkfds",
        amount: 3,
        price: 5000,
        ItemId: itemDummy.id,
      });
    })
    .then((res) => {
      transactionDummy = res;
      done();
    })
    .catch((err) => {
      done(err);
    });
});

afterAll((done) => {
  queryInterface
    .bulkDelete("Items", {})
    .then(() => {
      queryInterface.bulkDelete("Transactions", {});
      done();
    })
    .catch((err) => {
      done(err);
    });
});

describe("Transactions route test", () => {
  describe("GET /transactions", () => {
    test("200 Success get all transactions", (done) => {
      request(app)
        .get(`/transactions`)
        .set("Accept", "application/json")
        .then((res) => {
          const { body, status } = res;

          expect(status).toBe(200);
          expect.arrayContaining(body);
          done();
        })
        .catch((err) => done(err));
    });
  });

  describe("POST /transactions/:itemId", () => {
    test("201 Success create transaction", (done) => {
      request(app)
        .post(`/transactions/${itemDummy.id}`)
        .set("Accept", "application/json")
        .send({ amount: 3 })
        .then((res) => {
          const { body, status } = res;

          expect(status).toBe(201);
          expect(body).toHaveProperty("id", expect.any(Number));
          expect(body).toHaveProperty("transaction_code", expect.any(String));
          expect(body).toHaveProperty("amount", expect.any(Number));
          expect(body).toHaveProperty("price", expect.any(Number));
          expect(body).toHaveProperty("ItemId", expect.any(Number));
          done();
        })
        .catch((err) => done(err));
    });

    test("404 Not Found", (done) => {
      request(app)
        .post("/transactions/9789")
        .set("Accept", "application/json")
        .send({ amount: 3 })
        .then((res) => {
          const { status, body } = res;

          expect(status).toBe(404);
          expect(body).toHaveProperty("message", expect.anything());
          expect.arrayContaining(body);
          done();
        })
        .catch((err) => done(err));
    });

    test("400 Bad request", (done) => {
      request(app)
        .post(`/transactions/${itemDummy.id}`)
        .set("Accept", "application/json")
        .send({ amount: "asdkd" })
        .then((res) => {
          const { status, body } = res;

          expect(status).toBe(400);
          expect(body).toHaveProperty("message", expect.anything());
          expect.arrayContaining(body);
          done();
        })
        .catch((err) => done(err));
    });
  });

  describe("PATCH /transactions/:id", () => {
    test("200 Success update status", (done) => {
      request(app)
        .patch(`/transactions/${transactionDummy.id}`)
        .set("Accept", "application/json")
        .send({ status: "paid" })
        .then((res) => {
          const { status, body } = res;

          expect(status).toBe(200);
          expect(body).toHaveProperty("message", "Success update data");
          done();
        })
        .catch((err) => done(err));
    });

    test("404 Not Found", (done) => {
      request(app)
        .patch("/transactions/8989")
        .set("Accept", "application/json")
        .send({ status: "paid" })
        .then((res) => {
          const { status, body } = res;

          expect(status).toBe(404);
          expect(body).toHaveProperty("message", expect.any(String));
          done();
        })
        .catch((err) => done(err));
    });

    test("400 Bad Request", (done) => {
      request(app)
        .patch(`/transactions/${transactionDummy.id}`)
        .set("Accept", "application/json")
        .send({ status: 1235 })
        .then((res) => {
          const { status, body } = res;

          expect(status).toBe(400);
          expect(body).toHaveProperty("message", expect.anything());
          done();
        })
        .catch((err) => done(err));
    });
  });

  describe("DELETE /transactions/:id", () => {
    test("200 Succes delete transaction", (done) => {
      request(app)
        .delete(`/transactions/${transactionDummy.id}`)
        .set("Accept", "application/json")
        .then((res) => {
          const { status, body } = res;

          expect(status).toBe(200);
          expect(body).toHaveProperty("message", expect.any(String));
          done();
        })
        .catch((err) => done(err));
    });

    test("404 NotFound", (done) => {
      request(app)
        .delete(`/transactions/8989`)
        .set("Accept", "application/json")
        .then((res) => {
          const { status, body } = res;

          expect(status).toBe(404);
          expect(body).toHaveProperty("message", expect.any(String));
          done();
        })
        .catch((err) => done(err));
    });
  });
});
