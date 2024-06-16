const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const index = require("./routes/index");
const swaggerDocs = require("./config/swagger");
const app = express();

// Middleware
app.use(cors({ origin: process.env.ORIGIN }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  "/uploads/users",
  express.static(path.join(__dirname, "public/uploads/users"))
);
app.use("/img", express.static(path.join(__dirname, "public/img")));
swaggerDocs(app);
app.use("/api", index);

app.get("/", (_, res) => {
  res.send("Hello World");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
