import { expect } from "chai";
import axios from "axios";

import connect from "../../../database/database.js";
let headers = {
    headers: {
        Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imdrb2ZmaWNpYWwwNjBAZ21haWwuY29tIiwiaWF0IjoxNjQwNTkxNjU5LCJleHAiOjE2NzIxMjc2NTl9.CiWuEpyc188V9jIydo8pLBPXZIvsGNLu0KXBrqj_Z0s"
    }
}
describe("POST /aqi/aqi-calculator", () => {
  before((done) => {
    connect()
      .then(() => done())
      .catch((err) => done(err));
  });

  it("OK, calculating AQI", (done) => {
    axios
      .post("http://localhost:8000/aqi/aqi-calculator", {
        pollutant: "PM10",
        concentration: 100,
      }, headers)
      .then((res) => {
        const body = res.data;
        expect(body.statusCode).to.equal(200);
        done()
    })
      .catch((err) => done(err));
  });

  it("FAIL, calculating AQI", (done) => {
    axios
      .post("http://localhost:8000/aqi/aqi-calculator", {
        pollutan: "PM10",
        concentration: 100,
      }, headers)
      .then((res) => {
        done()
    })
      .catch((err) => {
        expect(err.response.status).to.equal(400)  
        done()});
  });
});
