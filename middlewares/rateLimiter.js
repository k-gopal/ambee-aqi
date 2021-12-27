import moment from "moment";
import { createClient } from "redis";

const rateLimiterSizeInMin = 1;
const maxRequestCount = 100;
const logIntervalInSecond = 5;

export const rateLimiter = async (req, res, next) => {
  try {
    const redisClient = await createClient().connect();
    if (!redisClient) {
      throw new Error("Redis client does not exist!");
    }
    console.log(req.ip);
    const record = await redisClient.get(req.ip);
    if (record) {
      const currentRequestTime = moment();
      console.log(record);
      if (record == null) {
        let newRecord = [];
        let requestLog = {
          requestTimeStamp: currentRequestTime.unix(),
          requestCount: 1,
        };
        newRecord.push(requestLog);
        redisClient.set(req.ip, JSON.stringify(newRecord));
        next();
      }
      let data = JSON.parse(record);
      let windowStartTimestamp = moment()
        .subtract(rateLimiterSizeInMin, "minutes")
        .unix();
      let requestsWithinWindow = data.filter((entry) => {
        return entry.requestTimeStamp > windowStartTimestamp;
      });
      console.log("requestsWithinWindow", requestsWithinWindow);
      let totalWindowRequestsCount = requestsWithinWindow.reduce(
        (accumulator, entry) => {
          return accumulator + entry.requestCount;
        },
        0
      );
      if (totalWindowRequestsCount >= maxRequestCount) {
        res
          .status(429)
          .jsend.error(
            `You have exhausted the ${maxRequestCount} requests minute.`
          );
      } else {
        let lastRequestLog = data[data.length - 1];
        let potentialCurrentWindowIntervalStartTimeStamp = currentRequestTime
          .subtract(logIntervalInSecond, "seconds")
          .unix();
        if (
          lastRequestLog.requestTimeStamp >
          potentialCurrentWindowIntervalStartTimeStamp
        ) {
          lastRequestLog.requestCount++;
          data[data.length - 1] = lastRequestLog;
        } else {
          data.push({
            requestTimeStamp: currentRequestTime.unix(),
            requestCount: 1,
          });
        }
        redisClient.set(req.ip, JSON.stringify(data));
        next();
      }
    }
  } catch (error) {
    next(error);
  }
};
