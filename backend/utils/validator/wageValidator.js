const Joi = require("joi");

const wageValidator = Joi.object({
  user_id: Joi.string().required().messages({
    "string.base": "user_id  harus berupa teks",
    "string.empty": "user_id  tidak boleh kosong",
    "any.required": "user_id  wajib diisi",
  }),
  month: Joi.number().integer().min(1).max(12).required().messages({
    "number.base": "Bulan harus berupa angka",
    "number.min": "Bulan harus di antara 1 dan 12",
    "number.max": "Bulan harus di antara 1 dan 12",
    "any.required": "Bulan wajib diisi",
  }),
  year: Joi.number()
    .integer()
    .min(1900)
    .max(new Date().getFullYear())
    .required()
    .messages({
      "number.base": "Tahun harus berupa angka",
      "number.min": "Tahun tidak boleh lebih kecil dari 1900",
      "number.max": `Tahun tidak boleh lebih besar dari ${new Date().getFullYear()}`,
      "any.required": "Tahun wajib diisi",
    }),
  overtimes: Joi.number().integer().required().messages({
    "number.base": "overtimes harus berupa angka",
    "any.required": "overtimes wajib diisi",
  }),
  cuts: Joi.number().integer().required().messages({
    "number.base": "cuts harus berupa angka",
    "any.required": "cuts wajib diisi",
  }),
  net_salary: Joi.number().integer().required().messages({
    "number.base": "net_salary harus berupa angka",
    "any.required": "net_salary wajib diisi",
  }),
});

module.exports = wageValidator;
