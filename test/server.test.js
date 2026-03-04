const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app/server"); // Adjust the path as needed
const should = chai.should();
chai.use(chaiHttp);

// TODO: Write tests for the server
describe("Brands", () => {
  describe("/GET brands", () => {
    it("it should get all sunglass brands", (done) => {
      chai
        .request(server)
        .get("/api/brands")
        .end((err, res) => {
          if (err) return done(err);
          res.should.have.status(200);
          res.body.should.be.an("array");
          res.body.forEach((item) => {
            item.should.be.an("object");
            item.should.have.property("id");
            item.should.have.property("name");
          });
          done();
        });
    });

    describe("/Get brands/:id/products", () => {
      it("it should get all products by brand id", (done) => {
        chai
          .request(server)
          .get("/api/brands/1/products")
          .end((err, res) => {
            if (err) return done(err);
            res.should.have.status(200);
            res.body.should.be.an("array");
            res.body.forEach((product) => {
              product.should.be.an("object");
              product.categoryId.should.eql("1");
            });
            done();
          });
      });
    });
  });

  describe("/GET products", () => {
    it("it should get all available products", (done) => {
      chai
        .request(server)
        .get("/api/products")
        .end((err, res) => {
          if (err) return done(err);
          res.should.have.status(200);
          res.body.should.be.an("array");
          res.body.forEach((item) => {
            item.should.be.an("object");
            item.should.have.property("id");
            item.should.have.property("categoryId");
            item.should.have.property("name");
            item.should.have.property("price");
            item.should.have.property("imageUrls");
          });
          done();
        });
    });
  });
});

describe("Login", () => {
  it("it should 200 for valid credentials", (done) => {
    chai
      .request(server)
      .post("/api/login")
      .send({ username: "yellowleopard753", password: "jonjon" })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("token");
        done();
      });
  });

  it("it should return 401 for invalid credentials", (done) => {
    chai
      .request(server)
      .post("/api/login")
      .send({ username: "fakeUser", password: "abcdef" })
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});

describe("Cart", () => {});
