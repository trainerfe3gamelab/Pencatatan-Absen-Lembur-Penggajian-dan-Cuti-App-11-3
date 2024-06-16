const leaveDocumentation = {
  paths: {
    "/employee/leaves": {
      get: {
        tags: ["Employee"],
        summary: "Retrieve all leave records for an employee",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Daftar cuti karyawan berhasil diambil",
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
                        leaves: {
                          type: "array",
                          items: {
                            $ref: "#/components/schemas/Leave",
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
        summary: "Create a new leave request",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/LeaveInputPost",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Berhasil insert data cuti",
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
                      example: "Berhasil insert data cuti",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Karyawan tidak ditemukan. Gagal insert data cuti.",
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
                        "Karyawan tidak ditemukan. Gagal insert data cuti.",
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
    "/employee/leaves/{id}": {
      get: {
        tags: ["Employee"],
        summary: "Retrieve a single leave record for an employee by ID",
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
            description: "Data cuti berhasil diambil",
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
                      $ref: "#/components/schemas/Leave",
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "Data cuti tidak ditemukan",
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
                      example: "Data cuti tidak ditemukan",
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
        summary: "Update a leave",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
            description: "ID cuti",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/LeaveInput",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Data cuti berhasil diupdate",
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
                      example: "Data cuti berhasil diupdate.",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Validasi gagal atau data cuti gagal diupdate",
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
                        "Pesan error validasi atau data cuti gagal diupdate",
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
        summary: "Delete a leave",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
            description: "ID cuti",
          },
        ],
        responses: {
          200: {
            description: "Data cuti berhasil dihapus",
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
                      example: "Data cuti berhasil dihapus",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Data cuti gagal dihapus",
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
                      example: "Data cuti gagal dihapus",
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
    Leave: {
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
        type: {
          type: "string",
          example: "sakit",
        },
        reasoning: {
          type: "string",
          example: "Medical reason",
        },
        start_date: {
          type: "string",
          example: "2024-06-01",
        },
        end_date: {
          type: "string",
          example: "2024-06-10",
        },
        status: {
          type: "string",
          example: "diproses",
        },
        creation_time: {
          type: "string",
          example: "2024-06-09 08:00:00",
        },
        update_time: {
          type: "string",
          example: "2024-06-09 08:00:00",
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
    LeaveInputPost: {
      type: "object",
      properties: {
        type: {
          type: "string",
          example: "sakit",
        },
        reasoning: {
          type: "string",
          example: "Medical reason",
        },
        start_date: {
          type: "string",
          example: "2024-06-01",
        },
        end_date: {
          type: "string",
          example: "2024-06-10",
        },
      },
      required: ["user_id", "type", "reasoning", "start_date", "end_date"],
    },
    LeaveInput: {
      type: "object",
      properties: {
        user_id: {
          type: "string",
          example: "tes1",
        },
        type: {
          type: "string",
          example: "sakit",
        },
        reasoning: {
          type: "string",
          example: "Medical reason",
        },
        start_date: {
          type: "string",
          example: "2024-06-01",
        },
        end_date: {
          type: "string",
          example: "2024-06-10",
        },
      },
      required: ["user_id", "type", "reasoning", "start_date", "end_date"],
    },
  },
};

module.exports = leaveDocumentation;
