import HTTP_CODE from "./constants.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { AqiCategory, Bvalue, Ivalue } from "./AqiTable.js";

//function to send response for eery api call
const sendResponseObject = (
  status = true,
  statusCode = HTTP_CODE.SUCCESS,
  payload = [],
  message = ""
) => {
  let objResponse = {
    status: "SUCCESS",
    statusCode: HTTP_CODE.SUCCESS,
    message: "",
    payload: [],
  };
  if (Array.isArray(payload) && !payload.length && !message) {
    objResponse.message = "Data not found";
  } else if (
    Array.isArray(payload) ||
    (typeof payload === "object" && Object.keys(payload).length)
  ) {
    objResponse.payload = payload;
    objResponse.message = message !== "" ? message : "";
    objResponse.statusCode = statusCode !== "" ? statusCode : 200;
    objResponse.status = status ? status : "SUCCESS";
  } else if (payload === null) {
    objResponse.message = "Internal server error";
    statusCode = HTTP_CODE.BAD_REQUEST;
    objResponse.statusCode = HTTP_CODE.BAD_REQUEST;
  }

  return {
    ...objResponse,
  };
};

//function to generate jwt token for verified users
const generateAccessToken = (email) => {
  return jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: 30 * 60,
  });
};

//function to comapre fetched token to authenticate user
const verifyAuthToken = (token) => {
  try {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    return false;
  }
};

//function to hash passwords
const hashPassword = async (password) => {
  try {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    return hash;
  } catch (error) {
    console.log("error in hasing password", error);
    return false;
  }
};

//function to compare hash passwords
const comparePasswords = (password, hashedPass) => {
  try {
    return bcrypt.compareSync(password, hashedPass);
  } catch (error) {
    console.log("error in comparing password", error);
    return false;
  }
};

const createRange = (num) => {
    if(num >= 0 && num <=50){
        return "0-50";
    }else if(num > 50 && num <=100){
        return "51-100";
    }else if(num >100 && num <=200){
        return "101-200";
    }else if(num > 200 && num <= 300){
        return "201-300";
    }else if(num > 300 && num <= 400){
        return "301-400";
    }else if(num > 400 && num <= 500){
        return "401-500";
    }
}

//function to calculate AQI
const calculateAQI = (pollutant, concentration) => {
  try {
    let range = createRange(concentration);
    let Ivalues = Ivalue[range];
    let Bvalues = Bvalue[pollutant];

    let numerator = Ivalues.high - Ivalues.low
    let numerator2 = concentration - Bvalues.low
    let denominator = Bvalues.high - Bvalues.low

    let result = ((numerator*numerator2)/denominator)+Ivalues.low;

    return {
        result,
        category: result > 500 ? AqiCategory["401-500"] : AqiCategory[createRange(result)]
    }
  } catch (error) {
    console.log("error in comparing password", error);
    return false;
  }
};

export {
  generateAccessToken,
  sendResponseObject,
  verifyAuthToken,
  hashPassword,
  comparePasswords,
  calculateAQI
};
