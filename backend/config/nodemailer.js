const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: process.env.NODEMAILERHOST,
  port: process.env.NODEMAILERPORT,
  secure: true,
  auth: {
    user: process.env.NODEMAILERUSER,
    pass: process.env.NODEMAILERPASS,
  },
});

module.exports = transporter;
