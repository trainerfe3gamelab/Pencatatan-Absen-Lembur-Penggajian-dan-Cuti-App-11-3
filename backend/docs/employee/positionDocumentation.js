const positionDocumentation = {};

positionDocumentation.paths = {
  "/employee/positions": {
    get: {
      tags: ["Employee"],
      summary: "Mengambil semua posisi",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "Daftar posisi",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/PositionResponse",
                },
              },
              example: [
                {
                  id: "123e4567-e89b-12d3-a456-426614174000",
                  position_name: "Manager",
                  description: "Deskripsi posisi",
                  base_salary: 5000000,
                  transport_allowance: 1000000,
                  meal_allowance: 500000,
                  creation_time: "2024-01-01T00:00:00+07:00",
                  update_time: "2024-01-01T00:00:00+07:00",
                  create_id: "123e4567-e89b-12d3-a456-426614174000",
                  update_id: "123e4567-e89b-12d3-a456-426614174000",
                },
              ],
            },
          },
        },
        500: {
          description: "Kesalahan server",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
              example: {
                status: "error",
                message: "Terjadi kesalahan pada server",
              },
            },
          },
        },
      },
    },
  },
};

positionDocumentation.schemas = {
  CreatePositionRequest: {
    type: "object",
    properties: {
      position_name: {
        type: "string",
        example: "Manager",
      },
      description: {
        type: "string",
        example: "Deskripsi posisi",
      },
      base_salary: {
        type: "number",
        example: 5000000,
      },
      transport_allowance: {
        type: "number",
        example: 1000000,
      },
      meal_allowance: {
        type: "number",
        example: 500000,
      },
    },
    required: [
      "position_name",
      "base_salary",
      "transport_allowance",
      "meal_allowance",
    ],
  },

  UpdatePositionRequest: {
    type: "object",
    properties: {
      position_name: {
        type: "string",
        example: "Senior Manager",
      },
      description: {
        type: "string",
        example: "Deskripsi posisi yang diperbarui",
      },
      base_salary: {
        type: "number",
        example: 6000000,
      },
      transport_allowance: {
        type: "number",
        example: 1200000,
      },
      meal_allowance: {
        type: "number",
        example: 600000,
      },
    },
  },

  PositionResponse: {
    type: "object",
    properties: {
      id: {
        type: "string",
        example: "123e4567-e89b-12d3-a456-426614174000",
      },
      position_name: {
        type: "string",
        example: "Manager",
      },
      description: {
        type: "string",
        example: "Deskripsi posisi",
      },
      base_salary: {
        type: "number",
        example: 5000000,
      },
      transport_allowance: {
        type: "number",
        example: 1000000,
      },
      meal_allowance: {
        type: "number",
        example: 500000,
      },
      creation_time: {
        type: "string",
        format: "date-time",
        example: "2024-01-01T00:00:00+07:00",
      },
      update_time: {
        type: "string",
        format: "date-time",
        example: "2024-01-01T00:00:00+07:00",
      },
      create_id: {
        type: "string",
        example: "123e4567-e89b-12d3-a456-426614174000",
      },
      update_id: {
        type: "string",
        example: "123e4567-e89b-12d3-a456-426614174000",
      },
    },
  },

  SuccessResponse: {
    type: "object",
    properties: {
      status: {
        type: "string",
        example: "sukses",
      },
      message: {
        type: "string",
        example: "Operasi berhasil",
      },
    },
  },

  ErrorResponse: {
    type: "object",
    properties: {
      status: {
        type: "string",
        example: "error",
      },
      message: {
        type: "string",
        example: "Terjadi kesalahan pada server",
      },
    },
  },
};

module.exports = positionDocumentation;
