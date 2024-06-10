const userDocumentation = {
  paths: {
    "/employee/users/": {
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
        position_id: {
          type: "string",
          example: "tes",
        },
        profile_picture: {
          type: "string",
          format: "binary",
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
