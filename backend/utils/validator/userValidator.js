const Joi = require("joi");

const userValidator = Joi.object({
  email: Joi.string().email().required().messages({
    "email.base": "Email harus valid",
    "email.empty": "Email tidak boleh kosong",
    "any.required": "Email wajib diisi",
  }),
  password: Joi.string().min(8).required().messages({
    "string.base": "Password harus berupa teks",
    "string.empty": "Password tidak boleh kosong",
    "string.min": "Password harus memiliki minimal 8 karakter",
    "any.required": "Password wajib diisi",
  }),
  role: Joi.string().valid("employee", "admin").required().messages({
    "any.only": "Role harus salah satu dari {#valids}",
    "any.required": "Role wajib diisi",
  }),
  gender: Joi.string().valid("laki-laki", "perempuan").required().messages({
    "any.only": "Role harus salah satu dari {#valids}",
    "any.required": "Role wajib diisi",
  }),
  name: Joi.string().required().messages({
    "string.base": "name  harus berupa teks",
    "string.empty": "name  tidak boleh kosong",
    "any.required": "name  wajib diisi",
  }),
  address: Joi.string().required().messages({
    "string.base": "alamat harus berupa teks",
    "string.empty": "alamat tidak boleh kosong",
    "any.required": "alamat wajib diisi",
  }),
  phone_number: Joi.string().required().messages({
    "string.base": "no telpon harus berupa teks",
    "string.empty": "no telpon tidak boleh kosong",
    "any.required": "no telpon wajib diisi",
  }),
  position_id: Joi.string().required().messages({
    "string.base": "position_id harus berupa teks",
    "string.empty": "position_id tidak boleh kosong",
    "any.required": "position_id wajib diisi",
  }),
});

module.exports = userValidator;
