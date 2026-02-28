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
  });
});

describe("Login", () => {});

describe("Cart", () => {});
