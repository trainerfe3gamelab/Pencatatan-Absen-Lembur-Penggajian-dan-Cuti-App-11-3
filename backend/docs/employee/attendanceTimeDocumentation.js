const attendanceTimeDocumentation = {
  paths: {
    "/employee/attendance-times": {
      get: {
        tags: ["Employee"],
        summary: "Retrieve all attendance times",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "List of attendance times",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/AttendanceTimeResponse",
                  },
                },
                example: [
                  {
                    status: "sukses",
                    data: {
                      id: "123e4567-e89b-12d3-a456-426614174000",
                      name: "waktu masuk",
                      start_time: "08:00:00",
                      end_time: "17:00:00",
                      update_time: "2024-01-01T00:00:00+07:00",
                      update_id: "123e4567-e89b-12d3-a456-426614174000",
                    },
                  },
                ],
              },
            },
          },
          500: {
            description: "Server error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
                example: {
                  status: "error",
                  message: "Terjadi error pada server",
                },
              },
            },
          },
        },
      },
    },

    "/employee/attendance-times/{id}": {
      get: {
        tags: ["Employee"],
        summary: "Retrieve an attendance time by ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
            description: "ID of the attendance time",
          },
        ],
        responses: {
          200: {
            description: "Attendance time data",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/AttendanceTimeResponse",
                },
                example: {
                  status: "sukses",
                  data: {
                    id: "123e4567-e89b-12d3-a456-426614174000",
                    name: "waktu masuk",
                    start_time: "08:00:00",
                    end_time: "17:00:00",
                    update_time: "2024-01-01T00:00:00+07:00",
                    update_id: "123e4567-e89b-12d3-a456-426614174000",
                  },
                },
              },
            },
          },
          404: {
            description: "Waktu absensi tidak ditemukan",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
                example: {
                  status: "gagal",
                  message: "Attendance time not found",
                },
              },
            },
          },
          500: {
            description: "Server error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
                example: {
                  status: "error",
                  message: "Terjadi error pada server",
                },
              },
            },
          },
        },
      },
    },
  },

  schemas: {
    UpdateAttendanceTimeRequest: {
      type: "object",
      properties: {
        start_time: {
          type: "string",
          example: "09:00:00",
        },
        end_time: {
          type: "string",
          example: "18:00:00",
        },
      },
      required: ["start_time", "end_time"],
    },

    AttendanceTimeResponse: {
      type: "object",
      properties: {
        id: {
          type: "string",
          example: "123e4567-e89b-12d3-a456-426614174000",
        },
        start_time: {
          type: "string",
          example: "08:00:00",
        },
        end_time: {
          type: "string",
          example: "17:00:00",
        },
        update_time: {
          type: "string",
          format: "date-time",
          example: "2024-01-01T00:00:00+07:00",
        },
        update_id: {
          type: "string",
          example: "123e4567-e89b-12d3-a456-426614174000",
        },
      },
    },

    SuccessResponse: {
      type: "object",
      properties: {
        status: {
          type: "string",
          example: "sukses",
        },
        message: {
          type: "string",
          example: "Operation successful",
        },
      },
    },

    ErrorResponse: {
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
};

module.exports = attendanceTimeDocumentation;
