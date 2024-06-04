const Joi = require("joi");

const attendanceTimeValidator = Joi.object({
  start_time: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
    .required()
    .messages({
      "string.base": "start_time harus berupa waktu dengan format HH:mm:ss",
      "string.pattern.base":
        "start_time harus berupa waktu dengan format HH:mm:ss",
      "string.empty": "start_time tidak boleh kosong",
      "any.required": "start_time wajib diisi",
    }),
  end_time: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
    .required()
    .messages({
      "string.base": "end_time harus berupa waktu dengan format HH:mm:ss",
      "string.pattern.base":
        "end_time harus berupa waktu dengan format HH:mm:ss",
      "string.empty": "end_time tidak boleh kosong",
      "any.required": "end_time wajib diisi",
    }),
});

module.exports = attendanceTimeValidator;
