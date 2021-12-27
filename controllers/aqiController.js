import HTTP_CODE from "../utils/constants.js";
import {
  calculateAQI,
  sendResponseObject,
} from "../utils/common.js";
import connect from "../database/database.js";
import aqiSchema from "../schema/AqiSchema.js";

//db connection
if (typeof client === "undefined") var client = connect();

const calculateAqi = async (req, res, next) => {
  try {
    console.log("call to aqi calculator");
    let body = req.body;
    console.log("Body: ", body);
    let validation = aqiSchema.validate(body);

    console.log("email", req.user);
    if (validation.error) {
      return res
        .status(HTTP_CODE.BAD_REQUEST)
        .send(
          sendResponseObject(
            "FAILURE",
            HTTP_CODE.BAD_REQUEST,
            [validation.error],
            "Bad request."
          )
        );
    }
    let result = calculateAQI(body.pollutant, body.concentration);

    if (result) {
        return res
          .status(HTTP_CODE.SUCCESS)
          .send(
            sendResponseObject(
              "SUCCESS",
              HTTP_CODE.SUCCESS,
              { ...result },
              "AQI is successfully calculated."
            )
          );
    }
  } catch (error) {
    console.log("Error: ", error);
    return res
      .status(HTTP_CODE.INTERNAL_SERVER_ERROR)
      .send(
        sendResponseObject(
          "FAILURE",
          HTTP_CODE.INTERNAL_SERVER_ERROR,
          [error],
          "Not able to calculate AQI."
        )
      );
  }
};

export { calculateAqi };
