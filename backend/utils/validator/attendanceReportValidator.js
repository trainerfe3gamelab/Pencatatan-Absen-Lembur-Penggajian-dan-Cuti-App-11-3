const Joi = require("joi");

const attendanceReportValidator = Joi.object({
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
  hadir: Joi.number().integer().required().messages({
    "number.base": "hadir harus berupa angka",
    "any.required": "hadir wajib diisi",
  }),
  sakit: Joi.number().integer().required().messages({
    "number.base": "sakit harus berupa angka",
    "any.required": "sakit wajib diisi",
  }),
  izin: Joi.number().integer().required().messages({
    "number.base": "izin harus berupa angka",
    "any.required": "izin wajib diisi",
  }),
  alpha: Joi.number().integer().required().messages({
    "number.base": "alpha harus berupa angka",
    "any.required": "alpha wajib diisi",
  }),
});

module.exports = attendanceReportValidator;
