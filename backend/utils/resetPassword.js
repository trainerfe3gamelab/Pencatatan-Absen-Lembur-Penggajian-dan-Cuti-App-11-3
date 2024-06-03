const transporter = require("../config/nodemailer");
const { EmailVerification } = require("../models");
const moment = require("moment-timezone");
const { nanoid } = require("nanoid");
const { v4: uuidv4 } = require("uuid");

const sendToken = (email, token) => {
  var mailOptions = {
    to: email,
    subject: "ShiftMaster Reset Password",
    text:
      "Anda menerima ini karena Anda (atau orang lain) telah meminta pengaturan ulang kata sandi akun Anda.\n\n" +
      "Kode Verifikasi : " +
      token +
      "\n" +
      "Kode berlaku selama 10 menit sejak email ini dikirim\n\n" +
      "Jika Anda tidak meminta reset password ini, abaikan email ini dan pastikan akun Anda aman.\n\n" +
      "Terimakasih,\n" +
      "Tim Dukungan ShiftMaster\n\n\n" +
      "----\n\n\n" +
      "Catatan: Email ini dikirim secara otomatis, mohon tidak membalas email ini. Jika Anda membutuhkan bantuan lebih lanjut.\n",
    html:
      "Anda menerima ini karena Anda (atau orang lain) telah meminta pengaturan ulang kata sandi akun Anda.<br><br>" +
      "Kode Verifikasi : " +
      "<b>" +
      token +
      "</b>" +
      "<br>" +
      "Kode berlaku selama <b>10</b> menit sejak email ini dikirim<br><br>" +
      "Jika Anda tidak meminta reset password ini, abaikan email ini dan pastikan akun Anda aman.<br><br>" +
      "Terimakasih,<br>" +
      "Tim Dukungan ShiftMaster<br><br><br>" +
      "----<br><br><br>" +
      "Catatan: Email ini dikirim secara otomatis, mohon tidak membalas email ini. Jika Anda membutuhkan bantuan lebih lanjut.\n",
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent:" + info.response);
    }
  });
};

const updateOrCreateToken = async (email) => {
  const now = moment().tz("Asia/Jakarta");
  const token = nanoid(7);
  const data = {
    email,
    token,
    expired: now.add(10, "minutes").format("YYYY-MM-DD HH:mm:ss"),
  };
  try {
    const verification = await EmailVerification.findOne({
      where: { email, archived: false },
    });
    if (!verification) {
      (data.expired = now.add(10, "minutes").format("YYYY-MM-DD HH:mm:ss")),
        (data.creation_time = now.format("YYYY-MM-DD HH:mm:ss")),
        (data.update_time = now.format("YYYY-MM-DD HH:mm:ss")),
        (data.create_id = uuidv4()),
        (data.update_id = uuidv4()),
        await EmailVerification.create(data);
    } else {
      (data.update_time = now.format("YYYY-MM-DD HH:mm:ss")),
        (data.update_id = uuidv4()),
        (data.used = false);
      await EmailVerification.update(data, {
        where: { email, archived: false },
      });
    }
    sendToken(email, token);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = { sendToken, updateOrCreateToken };
