const Joi = require("joi");

const holidayValidator = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "name  harus berupa teks",
    "string.empty": "name  tidak boleh kosong",
    "any.required": "name  wajib diisi",
  }),
  start_date: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .required()
    .messages({
      "string.base": "start_date harus berupa string dengan format YYYY-MM-DD",
      "string.pattern.base":
        "start_date harus berupa tanggal dengan format YYYY-MM-DD",
      "string.empty": "start_date tidak boleh kosong",
      "any.required": "start_date wajib diisi",
    }),
  end_date: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .required()
    .messages({
      "string.base": "end_date harus berupa string dengan format YYYY-MM-DD",
      "string.pattern.base":
        "end_date harus berupa tanggal dengan format YYYY-MM-DD",
      "string.empty": "end_date tidak boleh kosong",
      "any.required": "end_date wajib diisi",
    }),
});

module.exports = holidayValidator;
