const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const positionRoutes = require("./routes/positionRoutes");
const app = express();

// Middleware
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", positionRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
