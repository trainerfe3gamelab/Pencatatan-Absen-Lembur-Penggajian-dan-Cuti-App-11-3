const attendanceDocumentation = {
  paths: {
    "/employee/attendances/in": {
      post: {
        tags: ["Employee"],
        summary: "Presensi masuk",
        security: [{ bearerAuth: [] }],
        responses: {
          201: {
            description: "Presensi masuk berhasil",
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
            description: "Validasi gagal atau presensi masuk gagal",
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
                      example: "Pesan error validasi atau presensi masuk gagal",
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
    "/employee/attendances/out": {
      post: {
        tags: ["Employee"],
        summary: "Presensi keluar",
        security: [{ bearerAuth: [] }],
        responses: {
          201: {
            description: "Presensi keluar berhasil",
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
            description: "Validasi gagal atau presensi keluar gagal",
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
                        "Pesan error validasi atau presensi keluar gagal",
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
    "/employee/attendances/": {
      get: {
        tags: ["Employee"],
        summary: "Retrieve all attendances for an employee",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Daftar presensi karyawan berhasil diambil",
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
                        attendances: {
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
