const wageDocumentation = {
  paths: {
    "/admin/wages": {
      get: {
        tags: ["Admin"],
        summary: "Retrieve all wages",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Daftar gaji berhasil diambil",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "sukses" },
                    data: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Wage" },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Terjadi error pada server",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "error" },
                    message: {
                      type: "string",
                      example: "Terjadi error pada server",
                    },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Admin"],
        summary: "Create a new wage",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/WageCreate" },
            },
          },
        },
        responses: {
          201: {
            description: "Gaji berhasil dibuat",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "sukses" },
                    data: { $ref: "#/components/schemas/Wage" },
                  },
                },
              },
            },
          },
          400: {
            description: "Validasi gagal",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "error" },
                    message: {
                      type: "string",
                      example: "Pesan error validasi",
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Terjadi error pada server",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "error" },
                    message: {
                      type: "string",
                      example: "Terjadi error pada server",
                    },
                  },
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ["Admin"],
        summary: "Delete a wage",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/WageDelete" },
            },
          },
        },
        responses: {
          200: {
            description: "Gaji berhasil dihapus",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "sukses" },
                    message: {
                      type: "string",
                      example: "Gaji berhasil dihapus",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Gaji tidak ditemukan atau gagal dihapus",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "error" },
                    message: {
                      type: "string",
                      example: "Data Gaji gagal dihapus",
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Terjadi error pada server",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "error" },
                    message: {
                      type: "string",
                      example: "Terjadi error pada server",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/admin/wages/all": {
      post: {
        tags: ["Admin"],
        summary: "Create a new wage for all user",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/WageCreateAll" },
            },
          },
        },
        responses: {
          201: {
            description: "Gaji berhasil dibuat",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "sukses" },
                    data: { $ref: "#/components/schemas/Wage" },
                  },
                },
              },
            },
          },
          400: {
            description: "Validasi gagal",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "error" },
                    message: {
                      type: "string",
                      example: "Pesan error validasi",
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Terjadi error pada server",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "error" },
                    message: {
                      type: "string",
                      example: "Terjadi error pada server",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/admin/wages/{id}": {
      get: {
        tags: ["Admin"],
        summary: "Retrieve a single wage by ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
            description: "ID gaji",
          },
        ],
        responses: {
          200: {
            description: "Gaji berhasil diambil",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "sukses" },
                    data: { $ref: "#/components/schemas/Wage" },
                  },
                },
              },
            },
          },
          400: {
            description: "Gaji tidak ditemukan",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "error" },
                    message: {
                      type: "string",
                      example: "Data Gaji tidak ditemukan",
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Terjadi error pada server",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "error" },
                    message: {
                      type: "string",
                      example: "Terjadi error pada server",
                    },
                  },
                },
              },
            },
          },
        },
      },
      put: {
        tags: ["Admin"],
        summary: "Update a wage",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
            description: "ID gaji",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/WageCreate" },
            },
          },
        },
        responses: {
          200: {
            description: "Gaji berhasil diperbarui",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "sukses" },
                    message: {
                      type: "string",
                      example: "Data Gaji berhasil diperbarui.",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Validasi gagal atau Gaji tidak ditemukan",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "error" },
                    message: {
                      type: "string",
                      example:
                        "Pesan error validasi atau Data Gaji tidak ditemukan",
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Terjadi error pada server",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "error" },
                    message: {
                      type: "string",
                      example: "Terjadi error pada server",
                    },
                  },
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ["Admin"],
        summary: "Delete a wage by id",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
            description: "ID gaji",
          },
        ],
        responses: {
          200: {
            description: "Gaji berhasil dihapus",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "sukses" },
                    message: {
                      type: "string",
                      example: "Gaji berhasil dihapus",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Gaji tidak ditemukan atau gagal dihapus",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "error" },
                    message: {
                      type: "string",
                      example: "Data Gaji gagal dihapus",
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Terjadi error pada server",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "error" },
                    message: {
                      type: "string",
                      example: "Terjadi error pada server",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },

  schemas: {
    Wage: {
      type: "object",
      properties: {
        user_id: { type: "string", example: "tes1" },
        month: { type: "integer", example: 6 },
        year: { type: "integer", example: 2024 },
        overtimes: { type: "integer", example: 10 },
        cuts: { type: "integer", example: 2 },
        net_salary: { type: "integer", example: 5000000 },
        creation_time: {
          type: "string",
          format: "date-time",
          example: "2024-06-09T14:00:00Z",
        },
        update_time: {
          type: "string",
          format: "date-time",
          example: "2024-06-09T14:00:00Z",
        },
        create_id: { type: "string", example: "unique-id-1" },
        update_id: { type: "string", example: "unique-id-2" },
      },
    },
    WageCreate: {
      type: "object",
      properties: {
        user_id: { type: "string", example: "tes1" },
        month: { type: "integer", example: 6 },
        year: { type: "integer", example: 2024 },
      },
    },
    WageDelete: {
      type: "object",
      properties: {
        month: { type: "integer", example: 6 },
        year: { type: "integer", example: 2024 },
      },
    },
    WageCreate: {
      type: "object",
      properties: {
        user_id: { type: "string", example: "tes1" },
        month: { type: "integer", example: 6 },
        year: { type: "integer", example: 2024 },
      },
    },
    WageCreateAll: {
      type: "object",
      properties: {
        month: { type: "integer", example: 6 },
        year: { type: "integer", example: 2024 },
      },
    },
  },
};

module.exports = wageDocumentation;
