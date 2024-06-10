const salaryCutDocumentation = {
  paths: {
    "/admin/salarycuts": {
      post: {
        tags: ["Admin"],
        summary: "Membuat Potongan Gaji Baru",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CreateSalaryCutRequest",
              },
              example: {
                type: "tes",
                cut: 10,
              },
            },
          },
        },
        responses: {
          201: {
            description: "Potongan gaji berhasil dibuat",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/SalaryCutResponse",
                },
                example: {
                  status: "sukses",
                  data: {
                    id: "123e4567-e89b-12d3-a456-426614174000",
                    type: "tes",
                    cut: "10",
                    creation_time: "2024-01-01T00:00:00+07:00",
                    update_time: "2024-01-01T00:00:00+07:00",
                    create_id: "123e4567-e89b-12d3-a456-426614174000",
                    update_id: "123e4567-e89b-12d3-a456-426614174000",
                  },
                },
              },
            },
          },
          400: {
            description: "Error validasi",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
                example: {
                  status: "gagal",
                  message: "Error validasi",
                },
              },
            },
          },
          500: {
            description: "Error server",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
                example: {
                  status: "error",
                  message: "Terjadi error pada server",
                },
              },
            },
          },
        },
      },
      get: {
        tags: ["Admin"],
        summary: "Mengambil semua Potongan Gaji",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Daftar Potongan Gaji",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/SalaryCutResponse",
                  },
                  example: {
                    status: "sukses",
                    data: [
                      {
                        id: "123e4567-e89b-12d3-a456-426614174000",
                        type: "tes",
                        cut: "10",
                        creation_time: "2024-01-01T00:00:00+07:00",
                        update_time: "2024-01-01T00:00:00+07:00",
                        create_id: "123e4567-e89b-12d3-a456-426614174000",
                        update_id: "123e4567-e89b-12d3-a456-426614174000",
                      },
                    ],
                  },
                },
              },
            },
          },
          500: {
            description: "Error server",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
        },
      },
    },
    "/admin/salarycuts/{id}": {
      get: {
        tags: ["Admin"],
        summary: "Mengambil satu Potongan Gaji berdasarkan ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
            description: "ID Potongan Gaji",
          },
        ],
        responses: {
          200: {
            description: "Data Potongan Gaji",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/SalaryCutResponse",
                },
                example: {
                  status: "sukses",
                  data: {
                    id: "123e4567-e89b-12d3-a456-426614174000",
                    type: "tes",
                    cut: "10",
                    creation_time: "2024-01-01T00:00:00+07:00",
                    update_time: "2024-01-01T00:00:00+07:00",
                    create_id: "123e4567-e89b-12d3-a456-426614174000",
                    update_id: "123e4567-e89b-12d3-a456-426614174000",
                  },
                },
              },
            },
          },
          404: {
            description: "Potongan Gaji tidak ditemukan",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
                example: {
                  status: "gagal",
                  message: "Potongan gaji tidak ditemukan",
                },
              },
            },
          },
          500: {
            description: "Error server",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
                example: {
                  status: "error",
                  message: "Terjadi error pada server",
                },
              },
            },
          },
        },
      },
      put: {
        tags: ["Admin"],
        summary: "Mengupdate satu Potongan Gaji",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
            description: "ID Potongan Gaji",
          },
        ],
        requestBody: {
          required: false,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UpdateSalaryCutRequest",
              },
              example: {
                type: "tes1",
                cut: 11,
              },
            },
          },
        },
        responses: {
          200: {
            description: "Potongan gaji berhasil diperbarui",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/SuccessResponse",
                },
                example: {
                  status: "sukses",
                  message: "Potongan gaji berhasil diperbarui",
                },
              },
            },
          },
          400: {
            description: "Error validasi",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
                example: {
                  status: "gagal",
                  message: "Potongan gaji gagal diperbarui",
                },
              },
            },
          },
          404: {
            description: "Potongan Gaji tidak ditemukan",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
              example: {
                status: "gagal",
                message: "Potongan gaji tidak ditemukan",
              },
            },
          },
          500: {
            description: "Error server",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
                example: {
                  status: "error",
                  message: "Terjadi error pada server",
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ["Admin"],
        summary: "Menghapus satu Potongan Gaji",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
            description: "ID Potongan Gaji",
          },
        ],
        responses: {
          200: {
            description: "Potongan gaji berhasil dihapus",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/SuccessResponse",
                },
                example: {
                  status: "sukses",
                  message: "Berhasil menghapus potongan gaji",
                },
              },
            },
          },
          404: {
            description: "Potongan Gaji tidak ditemukan",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
                example: {
                  status: "gagal",
                  message: "Potongan gaji tidak ditemukan",
                },
              },
            },
          },
          500: {
            description: "Error server",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
                example: {
                  status: "error",
                  message: "Terjadi error pada server",
                },
              },
            },
          },
        },
      },
    },
  },
  schemas: {
    CreateSalaryCutRequest: {
      type: "object",
      properties: {
        type: {
          type: "string",
          example: "Potongan Kesehatan",
        },
        cut: {
          type: "number",
          example: 100000,
        },
      },
      required: ["type", "cut"],
    },
    UpdateSalaryCutRequest: {
      type: "object",
      properties: {
        type: {
          type: "string",
          example: "Potongan Kesehatan",
        },
        cut: {
          type: "number",
          example: 120000,
        },
      },
    },
    SalaryCutResponse: {
      type: "object",
      properties: {
        id: {
          type: "string",
          example: "123e4567-e89b-12d3-a456-426614174000",
        },
        type: {
          type: "string",
          example: "Potongan Kesehatan",
        },
        cut: {
          type: "number",
          example: 100000,
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
  },
};

module.exports = salaryCutDocumentation;
