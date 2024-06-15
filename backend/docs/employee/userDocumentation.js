const userDocumentation = {
  paths: {
    "/employee/users/": {
      get: {
        tags: ["Employee"],
        summary: "get user data",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "User data",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/SuccessResponseUser",
                },
              },
            },
          },
          404: {
            description: "User not found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
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
              },
            },
          },
        },
      },
      put: {
        tags: ["Employee"],
        summary: "Update a user",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: false,
          content: {
            "multipart/form-data": {
              schema: {
                $ref: "#/components/schemas/UpdateUserRequestForEmployee",
              },
            },
          },
        },
        responses: {
          200: {
            description: "User updated successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/SuccessResponse",
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
              },
            },
          },
          404: {
            description: "User not found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
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
              },
            },
          },
        },
      },
    },
  },
  schemas: {
    UpdateUserRequestForEmployee: {
      type: "object",
      properties: {
        email: {
          type: "string",
          format: "email",
          example: "",
        },
        password: {
          type: "string",
          format: "password",
          example: "",
        },
        gender: {
          type: "string",
          enum: ["laki-laki", "perempuan"],
          example: "perempuan",
        },
        name: {
          type: "string",
          example: "Jane Doe",
        },
        address: {
          type: "string",
          example: "Jl. Merdeka No. 456, Jakarta",
        },
        phone_number: {
          type: "string",
          example: "08987654321",
        },
        profile_picture: {
          type: "string",
          format: "binary",
        },
      },
    },
    SuccessResponseUser: {
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
              example: "123e4567-e89b-12d3-a456-426614174000",
            },
            email: {
              type: "string",
              format: "email",
              example: "example@example.com",
            },
            role: {
              type: "string",
              enum: ["employee", "admin"],
              example: "employee",
            },
            gender: {
              type: "string",
              enum: ["laki-laki", "perempuan"],
              example: "laki-laki",
            },
            name: {
              type: "string",
              example: "John Doe",
            },
            address: {
              type: "string",
              example: "Jl. Kebon Jeruk No. 123, Jakarta",
            },
            phone_number: {
              type: "string",
              example: "08123456789",
            },
            position_id: {
              type: "string",
              example: "123e4567-e89b-12d3-a456-426614174000",
            },
            profile_picture: {
              type: "string",
              example: "http://example.com/uploads/users/profile.jpg",
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
          example: "Operasi berhasil",
        },
      },
    },
    ErrorResponse: {
      type: "object",
      properties: {
        status: {
          type: "string",
          example: "gagal",
        },
        message: {
          type: "string",
          example: "Deskripsi kesalahan",
        },
      },
    },
  },
};

// Export the documentation
module.exports = userDocumentation;
