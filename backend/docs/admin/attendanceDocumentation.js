const attendanceDocumentation = {
  paths: {
    "/admin/attendances": {
      get: {
        tags: ["Admin"],
        summary: "Retrieve all attendances",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Daftar presensi berhasil diambil",
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
                        $ref: "#/components/schemas/Attendance",
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
        summary: "Create a new attendance",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AttendanceInput",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Presensi berhasil dibuat",
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
                      $ref: "#/components/schemas/Attendance",
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
    "/admin/attendances/{id}": {
      get: {
        tags: ["Admin"],
        summary: "Retrieve a single attendance by ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
            description: "ID presensi",
          },
        ],
        responses: {
          200: {
            description: "Data presensi berhasil diambil",
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
                      $ref: "#/components/schemas/Attendance",
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "Data presensi tidak ditemukan",
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
                      example: "Data presensi tidak ditemukan",
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
        summary: "Update a attendance",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
            description: "ID presensi",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AttendanceInput",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Data presensi berhasil diupdate",
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
                      example: "Data presensi berhasil diupdate.",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Validasi gagal atau data presensi gagal diupdate",
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
                        "Pesan error validasi atau data presensi gagal diupdate",
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
        summary: "Delete a attendance",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
            description: "ID presensi",
          },
        ],
        responses: {
          200: {
            description: "Data presensi berhasil dihapus",
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
                      example: "Data presensi berhasil dihapus",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Data presensi gagal dihapus",
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
                      example: "Data presensi gagal dihapus",
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
    Attendance: {
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
          example: "2024-06-09",
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
          example: "Hadir",
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
    AttendanceInput: {
      type: "object",
      properties: {
        user_id: {
          type: "string",
          example: "1",
        },
        date: {
          type: "string",
          example: "2024-06-09",
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
          example: "Hadir",
        },
      },
      required: ["user_id", "date", "time_in", "time_out", "status"],
    },
  },
};

module.exports = attendanceDocumentation;
