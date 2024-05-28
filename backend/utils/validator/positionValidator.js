const Joi = require("joi");

const positionValidator = Joi.object({
  position_name: Joi.string().required().messages({
    "string.base": "Nama posisi harus berupa teks",
    "string.empty": "Nama posisi tidak boleh kosong",
    "any.required": "Nama posisi wajib diisi",
  }),
  description: Joi.string().optional().messages({
    "string.base": "Deskripsi harus berupa teks",
  }),
  base_salary: Joi.number().required().messages({
    "number.base": "Gaji pokok harus berupa angka",
    "any.required": "Gaji pokok wajib diisi",
  }),
  transport_allowance: Joi.number().required().messages({
    "number.base": "Tunjangan transportasi harus berupa angka",
    "any.required": "Tunjangan transportasi wajib diisi",
  }),
  meal_allowance: Joi.number().required().messages({
    "number.base": "Tunjangan makan harus berupa angka",
    "any.required": "Tunjangan makan wajib diisi",
  }),
});

module.exports = positionValidator;
