const attendanceReportDocumentation = {
  paths: {
    "/admin/attendance-reports": {
      get: {
        tags: ["Admin"],
        summary: "Dapatkan semua laporan absensi",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Laporan absensi berhasil diambil",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "sukses" },
                    data: {
                      type: "array",
                      items: { $ref: "#/components/schemas/AttendanceReport" },
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
        summary: "Buat laporan absensi baru",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CreateAttendanceReport" },
              example: {
                user_id: "tes1",
                month: 6,
                year: 2024,
              },
            },
          },
        },
        responses: {
          201: {
            description: "Laporan absensi berhasil dibuat",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "sukses" },
                    data: { $ref: "#/components/schemas/AttendanceReport" },
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
                      example: "Detail error validasi",
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
        summary: "Hapus laporan absensi",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/DeleteAttendanceReport" },
              example: {
                month: 6,
                year: 2024,
              },
            },
          },
        },
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Laporan absensi berhasil dihapus",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "sukses" },
                    message: {
                      type: "string",
                      example: "Laporan absensi berhasil dihapus",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Gagal menghapus laporan absensi",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "error" },
                    message: {
                      type: "string",
                      example: "Data Laporan absensi gagal dihapus",
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
    "/admin/attendance-reports/all": {
      post: {
        tags: ["Admin"],
        summary: "Buat laporan absensi baru untuk semua user",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CreateAllAttendanceReport",
              },
              example: {
                month: 6,
                year: 2024,
              },
            },
          },
        },
        responses: {
          201: {
            description: "Laporan absensi berhasil dibuat",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "sukses" },
                    data: { $ref: "#/components/schemas/AttendanceReport" },
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
                      example: "Detail error validasi",
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
    "/admin/attendance-reports/{id}": {
      get: {
        tags: ["Admin"],
        summary: "Dapatkan laporan absensi berdasarkan ID",
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
                    status: { type: "string", example: "sukses" },
                    data: { $ref: "#/components/schemas/AttendanceReport" },
                  },
                },
              },
            },
          },
          400: {
            description: "Laporan absensi tidak ditemukan",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "error" },
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
        summary: "Perbarui laporan absensi",
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
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UpdateAttendanceReport" },
              example: {
                user_id: "tes1",
                month: 6,
                year: 2024,
                hadir: 20,
                sakit: 2,
                izin: 1,
                alpha: 0,
              },
            },
          },
        },
        responses: {
          200: {
            description: "Laporan absensi berhasil diperbarui",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "sukses" },
                    message: {
                      type: "string",
                      example: "Data Laporan absensi berhasil diperbarui.",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Gagal memperbarui laporan absensi",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "error" },
                    message: {
                      type: "string",
                      example: "Gagal memperbarui Laporan absensi",
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
        summary: "Hapus laporan absensi berdasarkan id",
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
            description: "Laporan absensi berhasil dihapus",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "sukses" },
                    message: {
                      type: "string",
                      example: "Laporan absensi berhasil dihapus",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Gagal menghapus laporan absensi",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "error" },
                    message: {
                      type: "string",
                      example: "Data Laporan absensi gagal dihapus",
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
    AttendanceReport: {
      type: "object",
      properties: {
        id: { type: "string", example: "uuid" },
        user_id: { type: "string", example: "tes1" },
        month: { type: "integer", example: 6 },
        year: { type: "integer", example: 2024 },
        hadir: { type: "integer", example: 20 },
        sakit: { type: "integer", example: 2 },
        izin: { type: "integer", example: 1 },
        alpha: { type: "integer", example: 0 },
        creation_time: {
          type: "string",
          format: "date-time",
          example: "2024-06-09 12:00:00",
        },
        update_time: {
          type: "string",
          format: "date-time",
          example: "2024-06-09 12:00:00",
        },
        create_id: { type: "string", example: "uuid" },
        update_id: { type: "string", example: "uuid" },
      },
    },
    CreateAttendanceReport: {
      type: "object",
      properties: {
        user_id: { type: "string", example: "tes1" },
        month: { type: "integer", example: 6 },
        year: { type: "integer", example: 2024 },
      },
    },
    CreateAllAttendanceReport: {
      type: "object",
      properties: {
        month: { type: "integer", example: 6 },
        year: { type: "integer", example: 2024 },
      },
    },
    DeleteAttendanceReport: {
      type: "object",
      properties: {
        month: { type: "integer", example: 6 },
        year: { type: "integer", example: 2024 },
      },
    },
    UpdateAttendanceReport: {
      type: "object",
      properties: {
        month: { type: "integer", example: 6 },
        year: { type: "integer", example: 2024 },
        hadir: { type: "integer", example: 20 },
        sakit: { type: "integer", example: 2 },
        izin: { type: "integer", example: 1 },
        alpha: { type: "integer", example: 0 },
      },
    },
  },
};

module.exports = attendanceReportDocumentation;
