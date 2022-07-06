require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const { setWithExpiry, getData } = require("./redis");
const app = express();
const port = process.env.PORT || 4001;
app.use(morgan("dev"));

app.get("/postdata", async (req, res) => {
  const { key, value } = req.query;
  const result = await setWithExpiry(key, value, 10);
  res.json(result);
});

app.get("/getdata", async (req, res) => {
  const { key } = req.query;
  const result = await getData(key);
  res.json(result);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
