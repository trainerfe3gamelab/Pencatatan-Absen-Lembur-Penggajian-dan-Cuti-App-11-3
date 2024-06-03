const Joi = require("joi");

const resetPasswordValidator = Joi.object({
  email: Joi.string().email().required().messages({
    "email.base": "Email harus valid",
    "email.empty": "Email tidak boleh kosong",
    "any.required": "Email wajib diisi",
  }),
  new_password: Joi.string().min(8).required().messages({
    "string.base": "Password harus berupa teks",
    "string.empty": "Password tidak boleh kosong",
    "string.min": "Password harus memiliki minimal 8 karakter",
    "any.required": "Password wajib diisi",
  }),
  confirm_new_password: Joi.string()
    .required()
    .valid(Joi.ref("new_password"))
    .messages({
      "any.only": "Konfirmasi password harus sama dengan password",
      "any.required": "Konfirmasi password wajib diisi",
      "string.empty": "Konfirmasi password tidak boleh kosong",
    }),
  token: Joi.string().required().messages({
    "string.base": "Token harus harus berupa teks",
    "string.empty": "Token tidak boleh kosong",
    "any.required": "Token wajib diisi",
  }),
});

module.exports = resetPasswordValidator;
