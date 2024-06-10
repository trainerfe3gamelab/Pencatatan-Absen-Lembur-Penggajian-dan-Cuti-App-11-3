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
                $ref: "#/components/schemas/OvertimeInput",
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
      },
      required: ["user_id", "date", "time_in", "time_out"],
    },
  },
};

module.exports = overtimeDocumentation;
