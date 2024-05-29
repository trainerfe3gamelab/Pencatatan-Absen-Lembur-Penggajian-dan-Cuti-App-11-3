const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const positionRoutes = require("./routes/positionRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const app = express();

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", positionRoutes);
app.use("/api", attendanceRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
