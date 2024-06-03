const Joi = require("joi");

const loginValidator = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "email harus harus valid",
    "string.empty": "email tidak boleh kosong",
    "any.required": "email wajib diisi",
  }),
  password: Joi.string().required().messages({
    "string.base": "password  harus berupa teks",
    "string.empty": "password  tidak boleh kosong",
    "any.required": "password  wajib diisi",
  }),
});

module.exports = loginValidator;
