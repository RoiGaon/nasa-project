const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const apiV1 = require("./routes/apiV1");

app.use(cors({ origin: "http://localhost:3000" }));

app.use(morgan("combined"));

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/v1", apiV1);
app.get("/*", (req, res) => {
  res.setFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
