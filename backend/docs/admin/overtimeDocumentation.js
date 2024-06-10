const overtimeDocumentation = {
  paths: {
    "/admin/overtimes": {
      get: {
        tags: ["Admin"],
        summary: "Retrieve all overtimes",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Daftar lembur berhasil diambil",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "string",
                      example: "sukses",
                    },
                    data: {
                      type: "array",
                      items: {
                        $ref: "#/components/schemas/Overtime",
                      },
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
                    status: {
                      type: "string",
                      example: "error",
                    },
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
        summary: "Create a new overtime",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/OvertimeInput",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Lembur berhasil dibuat",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "string",
                      example: "sukses",
                    },
                    message: {
                      type: "string",
                      example: "Berhasil insert data lembur",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Validasi gagal atau karyawan tidak ditemukan",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "string",
                      example: "error",
                    },
                    message: {
                      type: "string",
                      example:
                        "Pesan error validasi atau karyawan tidak ditemukan",
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
                    status: {
                      type: "string",
                      example: "error",
                    },
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
    "/admin/overtimes/{id}": {
      get: {
        tags: ["Admin"],
        summary: "Retrieve a single overtime by ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
            description: "ID lembur",
          },
        ],
        responses: {
          200: {
            description: "Data lembur berhasil diambil",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "string",
                      example: "sukses",
                    },
                    data: {
                      $ref: "#/components/schemas/Overtime",
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "Data lembur tidak ditemukan",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "string",
                      example: "error",
                    },
                    message: {
                      type: "string",
                      example: "Data lembur tidak ditemukan",
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
                    status: {
                      type: "string",
                      example: "error",
                    },
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
        summary: "Update an overtime",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
            description: "ID lembur",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/OvertimeInput",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Data lembur berhasil diupdate",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "string",
                      example: "sukses",
                    },
                    message: {
                      type: "string",
                      example: "Data lembur berhasil diupdate.",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Validasi gagal atau data lembur gagal diupdate",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "string",
                      example: "error",
                    },
                    message: {
                      type: "string",
                      example:
                        "Pesan error validasi atau data lembur gagal diupdate",
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
                    status: {
                      type: "string",
                      example: "error",
                    },
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
        summary: "Delete an overtime",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
            description: "ID lembur",
          },
        ],
        responses: {
          200: {
            description: "Data lembur berhasil dihapus",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "string",
                      example: "sukses",
                    },
                    message: {
                      type: "string",
                      example: "Data lembur berhasil dihapus",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Data lembur gagal dihapus",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "string",
                      example: "error",
                    },
                    message: {
                      type: "string",
                      example: "Data lembur gagal dihapus",
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
                    status: {
                      type: "string",
                      example: "error",
                    },
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
    Overtime: {
      type: "object",
      properties: {
        id: {
          type: "string",
          example: "uuid-v4",
        },
        user_id: {
          type: "string",
          example: "tes1",
        },
        date: {
          type: "string",
          example: "2023-06-09",
        },
        time_in: {
          type: "string",
          example: "08:00:00",
        },
        time_out: {
          type: "string",
          example: "17:00:00",
        },
        status: {
          type: "string",
          example: "diproses",
        },
        creation_time: {
          type: "string",
          example: "2023-06-09 08:00:00",
        },
        create_id: {
          type: "string",
          example: "uuid-v4",
        },
        update_time: {
          type: "string",
          example: "2023-06-09 08:00:00",
        },
        update_id: {
          type: "string",
          example: "uuid-v4",
        },
      },
    },
    OvertimeInput: {
      type: "object",
      properties: {
        user_id: {
          type: "string",
          example: "tes1",
        },
        date: {
          type: "string",
          example: "2023-06-09",
        },
        time_in: {
          type: "string",
          example: "08:00:00",
        },
        time_out: {
          type: "string",
          example: "17:00:00",
        },
      },
      required: ["user_id", "date", "time_in", "time_out", "status"],
    },
  },
};

module.exports = overtimeDocumentation;
