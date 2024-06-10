const userDocumentation = {
  paths: {
    "/admin/users": {
      post: {
        tags: ["Admin"],
        summary: "Create a new user",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                $ref: "#/components/schemas/CreateUserRequest",
              },
            },
          },
        },
        responses: {
          201: {
            description: "User created successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/UserResponse",
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
            description: "User already exists",
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
      get: {
        tags: ["Admin"],
        summary: "Retrieve all users",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "List of users",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/UserResponse",
                  },
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
    "/admin/users/{id}": {
      get: {
        tags: ["Admin"],
        summary: "Retrieve a user by ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
            description: "ID of the user",
          },
        ],
        responses: {
          200: {
            description: "User data",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/UserResponse",
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
        tags: ["Admin"],
        summary: "Update a user",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
            description: "ID of the user",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                $ref: "#/components/schemas/UpdateUserRequest",
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
      delete: {
        tags: ["Admin"],
        summary: "Delete a user",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
            description: "ID of the user",
          },
        ],
        responses: {
          200: {
            description: "User deleted successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/SuccessResponse",
                },
              },
            },
          },
          400: {
            description: "Failed to delete user",
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
    CreateUserRequest: {
      type: "object",
      properties: {
        email: {
          type: "string",
          format: "email",
          example: "example@example.com",
        },
        password: {
          type: "string",
          format: "password",
          example: "password123",
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
          format: "binary",
        },
      },
      required: [
        "email",
        "password",
        "role",
        "gender",
        "name",
        "address",
        "phone_number",
        "position_id",
      ],
    },
    UpdateUserRequest: {
      type: "object",
      properties: {
        email: {
          type: "string",
          format: "email",
          example: "example@example.com",
        },
        password: {
          type: "string",
          format: "password",
          example: "password123",
        },
        role: {
          type: "string",
          enum: ["employee", "admin"],
          example: "admin",
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
        position_id: {
          type: "string",
          example: "123e4567-e89b-12d3-a456-426614174000",
        },
        profile_picture: {
          type: "string",
          format: "binary",
        },
      },
    },
    UserResponse: {
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
