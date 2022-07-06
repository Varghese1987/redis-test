const Redis = require("ioredis");
const redis = new Redis(process.env.REDIS_URL);

const setWithExpiry = async (key, value, expiry) => {
  console.log(expiry);
  expiry = typeof expiry !== "undefined" ? expiry : 60;
  console.log(expiry);
  const result = await redis.set(key, value, "EX", expiry);
  console.log("detdata--->", result);
  return result;
};

const getData = async (key) => {
  const result = await redis.get(key);
  return result;
};

module.exports = { setWithExpiry, getData };
