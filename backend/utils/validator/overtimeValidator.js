const Joi = require("joi");

const overtimeValidator = Joi.object({
  user_id: Joi.string().required().messages({
    "string.base": "user_id harus berupa teks",
    "string.empty": "user_id tidak boleh kosong",
    "any.required": "user_id wajib diisi",
  }),
  date: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .required()
    .messages({
      "string.base": "date harus berupa string dengan format YYYY-MM-DD",
      "string.pattern.base":
        "date harus berupa tanggal dengan format YYYY-MM-DD",
      "string.empty": "date tidak boleh kosong",
      "any.required": "date wajib diisi",
    }),
  time_in: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
    .required()
    .messages({
      "string.base": "time_in harus berupa waktu dengan format HH:mm:ss",
      "string.pattern.base":
        "time_in harus berupa waktu dengan format HH:mm:ss",
      "string.empty": "time_in tidak boleh kosong",
      "any.required": "time_in wajib diisi",
    }),
  time_out: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
    .required()
    .messages({
      "string.base": "time_out harus berupa waktu dengan format HH:mm:ss",
      "string.pattern.base":
        "time_out harus berupa waktu dengan format HH:mm:ss",
      "string.empty": "time_out tidak boleh kosong",
      "any.required": "time_out wajib diisi",
    }),
  status: Joi.string()
    .valid("diproses", "ditolak", "disetujui")
    .required()
    .messages({
      "string.base": "status harus berupa teks",
      "any.only":
        "status harus berupa salah satu dari 'diproses', 'ditolak', 'disetujui'",
      "string.empty": "status tidak boleh kosong",
      "any.required": "status wajib diisi",
    }),
});

module.exports = overtimeValidator;
