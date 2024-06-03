const Joi = require("joi");

const leaveValidator = Joi.object({
  user_id: Joi.string().optional().messages({
    "string.base": "user_id harus berupa teks",
    "string.empty": "user_id tidak boleh kosong",
  }),
  type: Joi.string().valid("sakit", "izin").required().messages({
    "string.base": "type harus berupa teks",
    "any.only": "type harus berupa salah satu dari 'sakit' atau 'izin'",
    "string.empty": "type tidak boleh kosong",
    "any.required": "type wajib diisi",
  }),
  reasoning: Joi.string().required().messages({
    "string.base": "reasoning harus berupa teks",
    "string.empty": "reasoning tidak boleh kosong",
    "any.required": "reasoning wajib diisi",
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

module.exports = leaveValidator;
