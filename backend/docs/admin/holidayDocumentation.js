const holidayDocumentation = {};

(holidayDocumentation.paths = {
  "/admin/holidays": {
    post: {
      tags: ["Admin"],
      summary: "Create a new holiday",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/CreateHolidayRequest",
            },
            example: {
              name: "New Year",
              start_date: "2024-01-01",
              end_date: "2024-01-01",
            },
          },
        },
      },
      responses: {
        201: {
          description: "Holiday created successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/HolidayResponse",
              },
              example: {
                status: "sukses",
                data: {
                  id: "123e4567-e89b-12d3-a456-426614174000",
                  name: "New Year",
                  start_date: "2024-01-01",
                  end_date: "2024-01-01",
                  creation_time: "2024-01-01T00:00:00+07:00",
                  update_time: "2024-01-01T00:00:00+07:00",
                  create_id: "123e4567-e89b-12d3-a456-426614174000",
                  update_id: "123e4567-e89b-12d3-a456-426614174000",
                },
              },
            },
          },
        },
        400: {
          description: "Validation error",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
              example: {
                status: "error",
                message: "Validation error message",
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
    get: {
      tags: ["Admin"],
      summary: "Retrieve all holidays",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "List of holidays",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/HolidayResponse",
                },
              },
              example: [
                {
                  id: "123e4567-e89b-12d3-a456-426614174000",
                  name: "New Year",
                  start_date: "2024-01-01",
                  end_date: "2024-01-01",
                  creation_time: "2024-01-01T00:00:00+07:00",
                  update_time: "2024-01-01T00:00:00+07:00",
                  create_id: "123e4567-e89b-12d3-a456-426614174000",
                  update_id: "123e4567-e89b-12d3-a456-426614174000",
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

  "/admin/holidays/{id}": {
    get: {
      tags: ["Admin"],
      summary: "Retrieve a holiday by ID",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
          description: "ID of the holiday",
        },
      ],
      responses: {
        200: {
          description: "Holiday data",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/HolidayResponse",
              },
              example: {
                id: "123e4567-e89b-12d3-a456-426614174000",
                name: "New Year",
                start_date: "2024-01-01",
                end_date: "2024-01-01",
                creation_time: "2024-01-01T00:00:00+07:00",
                update_time: "2024-01-01T00:00:00+07:00",
                create_id: "123e4567-e89b-12d3-a456-426614174000",
                update_id: "123e4567-e89b-12d3-a456-426614174000",
              },
            },
          },
        },
        404: {
          description: "Holiday not found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
              example: {
                status: "gagal",
                message: "Hari libur tidak ditemukan",
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
    put: {
      tags: ["Admin"],
      summary: "Update a holiday",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
          description: "ID of the holiday",
        },
      ],
      requestBody: {
        required: false,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/UpdateHolidayRequest",
            },
            example: {
              name: "Updated Holiday Name",
              start_date: "2024-01-01",
              end_date: "2024-01-02",
            },
          },
        },
      },
      responses: {
        200: {
          description: "Holiday updated successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/SuccessResponse",
              },
              example: {
                status: "sukses",
                message: "Holiday updated successfully",
              },
            },
          },
        },
        400: {
          description: "Validation error",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
              example: {
                status: "gagal",
                message: "Validation error message",
              },
            },
          },
        },
        404: {
          description: "Holiday not found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
              example: {
                status: "gagal",
                message: "Hari libur tidak ditemukan",
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
    delete: {
      tags: ["Admin"],
      summary: "Delete a holiday",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
          description: "ID of the holiday",
        },
      ],
      responses: {
        200: {
          description: "Holiday deleted successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/SuccessResponse",
              },
              example: {
                status: "sukses",
                message: "Holiday deleted successfully",
              },
            },
          },
        },
        400: {
          description: "Failed to delete holiday",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
              example: {
                status: "gagal",
                message: "Gagal menghapus hari libur",
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
}),
  (holidayDocumentation.schemas = {
    CreateHolidayRequest: {
      type: "object",
      properties: {
        name: {
          type: "string",
          example: "New Year",
        },
        start_date: {
          type: "string",
          format: "date",
          example: "2024-01-01",
        },
        end_date: {
          type: "string",
          format: "date",
          example: "2024-01-01",
        },
      },
      required: ["name", "start_date", "end_date"],
    },

    UpdateHolidayRequest: {
      type: "object",
      properties: {
        name: {
          type: "string",
          example: "Updated Holiday Name",
        },
        start_date: {
          type: "string",
          format: "date",
          example: "2024-01-01",
        },
        end_date: {
          type: "string",
          format: "date",
          example: "2024-01-02",
        },
      },
      required: ["name", "start_date", "end_date"],
    },

    HolidayResponse: {
      type: "object",
      properties: {
        id: {
          type: "string",
          example: "123e4567-e89b-12d3-a456-426614174000",
        },
        name: {
          type: "string",
          example: "New Year",
        },
        start_date: {
          type: "string",
          format: "date",
          example: "2024-01-01",
        },
        end_date: {
          type: "string",
          format: "date",
          example: "2024-01-01",
        },
        creation_time: {
          type: "string",
          format: "date-time",
          example: "2024-01-01T00:00:00+07:00",
        },
        update_time: {
          type: "string",
          format: "date-time",
          example: "2024-01-01T00:00:00+07:00",
        },
        create_id: {
          type: "string",
          example: "123e4567-e89b-12d3-a456-426614174000",
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
  });

module.exports = holidayDocumentation;
