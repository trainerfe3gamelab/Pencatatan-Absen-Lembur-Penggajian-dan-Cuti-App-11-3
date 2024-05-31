const Joi = require("joi");

const salaryCutValidator = Joi.object({
  type: Joi.string().required().messages({
    "string.base": "Tipe potongan gaji harus berupa teks",
    "string.empty": "Tipe potongan gaji tidak boleh kosong",
    "any.required": "Tipe potongan gaji wajib diisi",
  }),
  cut: Joi.number().required().messages({
    "number.base": "Potongan gaji harus berupa angka",
    "any.required": "Potongan gaji wajib diisi",
  }),
});

module.exports = salaryCutValidator;
