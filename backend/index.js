const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const index = require("./routes/index");
const app = express();

// Middleware
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  "/uploads/users",
  express.static(path.join(__dirname, "public/uploads/users"))
);
app.use("/img", express.static(path.join(__dirname, "public/img")));

app.use("/api", index);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
