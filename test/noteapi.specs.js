let chai = require("chai");
let chaiHttp = require("chai-http");
let index = require("../index");
let should = chai.should();

chai.use(chaiHttp);

describe("Notes", () => {

  // Test GET notes
  describe("/GET notes", () => {
    it("it should GET all notes", (done) => {
      chai
        .request(index)
        .get("/api/notes")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(3);
          done();
        });
    });
  });

  // Test GET existing note
  describe("/GET note", () => {
    it("it should GET note with given id", (done) => {
      chai
        .request(index)
        .get("/api/notes/2")
        .end((err, res) => {
          res.should.have.status(200);

          res.body.should.have.property("id").eql(2);
          res.body.should.have
            .property("content")
            .eql("Browser can execute only Javascript");
          res.body.should.have.property("date").eql("2022-01-10T18:39:34.091Z");
          res.body.should.have.property("important").eql(false);

          done();
        });
    });
  });

  // Test GET not existing note
  describe("/GET note", () => {
    it("it should return not found for invalid id", (done) => {
      chai
        .request(index)
        .get("/api/notes/4")
        .end((err, res) => {
          res.should.have.status(404);

          done();
        });
    });
  });
});