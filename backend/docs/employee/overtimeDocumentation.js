const overtimeDocumentation = {
  paths: {
    "/employee/overtimes": {
      get: {
        tags: ["Employee"],
        summary: "Retrieve all overtime records for an employee",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Daftar lembur karyawan berhasil diambil",
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
                      type: "object",
                      properties: {
                        id: {
                          type: "string",
                          example: "1",
                        },
                        email: {
                          type: "string",
                          example: "employee@example.com",
                        },
                        role: {
                          type: "string",
                          example: "employee",
                        },
                        overtimes: {
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
        tags: ["Employee"],
        summary: "Create a new overtime request",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/OvertimeInputPost",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Berhasil insert data lembur",
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
          400: {
            description: "Karyawan tidak ditemukan. Gagal insert data lembur.",
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
                        "Karyawan tidak ditemukan. Gagal insert data lembur.",
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
    "/employee/overtimes/{id}": {
      get: {
        tags: ["Employee"],
        summary: "Retrieve a single overtime record for an employee by ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
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
        tags: ["Employee"],
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
        tags: ["Employee"],
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
          example: "1",
        },
        user_id: {
          type: "string",
          example: "1",
        },
        date: {
          type: "string",
          example: "2024-06-01",
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
          example: "2024-06-01 08:00:00",
        },
        update_time: {
          type: "string",
          example: "2024-06-01 08:00:00",
        },
        create_id: {
          type: "string",
          example: "uuidv4()",
        },
        update_id: {
          type: "string",
          example: "uuidv4()",
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
          example: "2024-06-01",
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
      required: ["user_id", "date", "time_in", "time_out"],
    },
    OvertimeInputPost: {
      type: "object",
      properties: {
        date: {
          type: "string",
          example: "2024-06-01",
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
      required: ["user_id", "date", "time_in", "time_out"],
    },
  },
};

module.exports = overtimeDocumentation;
