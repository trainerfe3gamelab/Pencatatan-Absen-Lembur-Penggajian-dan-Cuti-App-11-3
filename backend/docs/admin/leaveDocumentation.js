const leavedocumentation = {
  paths: {
    "/admin/leaves": {
      get: {
        tags: ["Admin"],
        summary: "Retrieve all leaves",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Daftar cuti berhasil diambil",
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
                        $ref: "#/components/schemas/Leave",
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
        summary: "Create a new leave",
        security: [{ bearerAuth: [] }],
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
          201: {
            description: "Cuti berhasil dibuat",
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
    "/admin/leaves/{id}": {
      get: {
        tags: ["Admin"],
        summary: "Retrieve a single leave by ID",
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
        tags: ["Admin"],
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
        tags: ["Admin"],
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
          example: "uuid-v4",
        },
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
          example: "Demam tinggi",
        },
        start_date: { type: "string", format: "date", example: "2023-06-09" },
        end_date: {
          type: "string",
          format: "date",
          example: "2023-06-15",
        },
        status: {
          type: "string",
          example: "diproses",
        },
        creation_time: {
          type: "string",
          format: "date-time",
          example: "2023-06-09T08:00:00+07:00",
        },
        create_id: {
          type: "string",
          example: "uuid-v4",
        },
        update_time: {
          type: "string",
          format: "date-time",
          example: "2023-06-09T08:00:00+07:00",
        },
        update_id: {
          type: "string",
          example: "uuid-v4",
        },
      },
    },
    LeaveInput: {
      type: "object",
      properties: {
        user_id: {
          type: "string",
          description: "ID karyawan",
          example: "tes1",
        },
        type: {
          type: "string",
          enum: ["sakit", "izin"],
          description: "Jenis cuti",
          example: "sakit",
        },
        reasoning: {
          type: "string",
          description: "Alasan cuti",
          example: "Demam tinggi",
        },
        start_date: {
          type: "string",
          format: "date",
          description: "Tanggal mulai cuti",
          example: "2023-06-09",
        },
        end_date: {
          type: "string",
          format: "date",
          description: "Tanggal akhir cuti",
          example: "2023-06-15",
        },
      },
      required: ["user_id", "type", "reasoning", "start_date", "end_date"],
    },
  },
};

module.exports = leavedocumentation;
