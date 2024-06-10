const attendanceReportDocumentation = {
  paths: {
    "/employee/attendance-reports": {
      get: {
        tags: ["Employee"],
        summary: "Retrieve all attendance reports for an employee",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Daftar laporan absensi karyawan berhasil diambil",
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
                        attendance_reports: {
                          type: "array",
                          items: {
                            $ref: "#/components/schemas/AttendanceReport",
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
    "/employee/attendance-reports/{id}": {
      get: {
        tags: ["Employee"],
        summary: "Retrieve a single attendance report for an employee by ID",
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
            description: "Laporan absensi berhasil diambil",
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
                      $ref: "#/components/schemas/AttendanceReport",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Data Laporan absensi tidak ditemukan",
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
                      example: "Data Laporan absensi tidak ditemukan",
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
    AttendanceReport: {
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
        month: {
          type: "number",
          example: 6,
        },
        year: {
          type: "number",
          example: 2024,
        },
        hadir: {
          type: "number",
          example: 20,
        },
        sakit: {
          type: "number",
          example: 2,
        },
        izin: {
          type: "number",
          example: 1,
        },
        alpha: {
          type: "number",
          example: 1,
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
    AttendanceReportInput: {
      type: "object",
      properties: {
        user_id: {
          type: "string",
          example: "1",
        },
        month: {
          type: "number",
          example: 6,
        },
        year: {
          type: "number",
          example: 2024,
        },
        hadir: {
          type: "number",
          example: 20,
        },
        sakit: {
          type: "number",
          example: 2,
        },
        izin: {
          type: "number",
          example: 1,
        },
        alpha: {
          type: "number",
          example: 1,
        },
      },
      required: ["user_id", "month", "year", "hadir", "sakit", "izin", "alpha"],
    },
  },
};

module.exports = attendanceReportDocumentation;
