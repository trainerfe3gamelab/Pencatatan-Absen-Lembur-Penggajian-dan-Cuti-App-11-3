const authDocumentation = {};

authDocumentation.paths = {
  "/auth/login": {
    post: {
      tags: ["Auth"],
      summary: "Melakukan login untuk mendapatkan token",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: {
                  type: "string",
                  format: "email",
                },
                password: {
                  type: "string",
                  example: "password123",
                },
              },
              required: ["email", "password"],
            },
          },
        },
      },
      responses: {
        200: {
          description: "response sukses",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/loginSuccess",
              },
            },
          },
        },
        400: {
          description: "response gagal",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/loginFailed",
              },
            },
          },
        },
        500: {
          description: "response error",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/error",
              },
            },
          },
        },
      },
    },
  },

  "/auth/reset-password/token": {
    post: {
      tags: ["Auth"],
      summary: "Mendapatkan kode verifikasi untuk lupa password",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: {
                  type: "string",
                  format: "email",
                },
                new_password: {
                  type: "string",
                  example: "12345678",
                },
                confirm_new_password: {
                  type: "string",
                  example: "12345678",
                },
              },
              required: ["email", "new_password", "confirm_new_password"],
            },
          },
        },
      },
      responses: {
        200: {
          description: "response sukses",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/resetPasswordTokenSuccess",
              },
            },
          },
        },
        400: {
          description: "response gagal",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/resetPasswordTokenFailed",
              },
            },
          },
        },
        500: {
          description: "response error",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/error",
              },
            },
          },
        },
      },
    },
  },

  "/auth/reset-password": {
    post: {
      tags: ["Auth"],
      summary: "Merubah password menggunakan kode verifikasi",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: {
                  type: "string",
                  format: "email",
                },
                new_password: {
                  type: "string",
                  example: "12345678",
                },
                confirm_new_password: {
                  type: "string",
                  example: "12345678",
                },
              },
              required: ["email", "new_password", "confirm_new_password"],
            },
          },
        },
      },
      responses: {
        200: {
          description: "response sukses",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/resetPasswordSuccess",
              },
            },
          },
        },
        400: {
          description: "response gagal",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/resetPasswordFailed1",
              },
            },
          },
        },
        404: {
          description: "response gagal",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/resetPasswordFailed2",
              },
            },
          },
        },
        500: {
          description: "response error",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/error",
              },
            },
          },
        },
      },
    },
  },
};

authDocumentation.schemas = {
  error: {
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

  loginSuccess: {
    type: "object",
    properties: {
      token: {
        type: "string",
        example:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRlcyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxNzg1MTE3NywiZXhwIjoxNzE3OTM3NTc3fQ.2wbLM-V7W12kO6TO8EtN-WSQVov9T5sc8GEJH0S9X-c",
      },
      user: {
        type: "object",
        properties: {
          id: { type: "string", example: "tes" },
          email: { type: "email", example: "user@example.com" },
          role: { type: "string", example: "Admin" },
          gender: { type: "string", example: "user@example.com" },
          name: { type: "string", example: "jhon doe" },
          address: { type: "string", example: "123 Main St" },
          phone_number: { type: "string", example: "1234567890" },
          profile_picture: { type: "string", example: "" },
        },
      },
    },
  },

  loginFailed: {
    type: "object",
    properties: {
      status: {
        type: "string",
        example: "gagal",
      },
      message: {
        type: "string",
        example: "Email atau password salah",
      },
    },
  },

  resetPasswordTokenSuccess: {
    type: "object",
    properties: {
      status: {
        type: "string",
        example: "sukses",
      },
      message: {
        type: "string",
        example: "Token berhasil dikirim",
      },
    },
  },

  resetPasswordTokenFailed: {
    type: "object",
    properties: {
      status: {
        type: "string",
        example: "gagal",
      },
      message: {
        type: "string",
        example: "Email tidak terdaftar pada aplikasi",
      },
    },
  },

  resetPasswordSuccess: {
    type: "object",
    properties: {
      status: {
        type: "string",
        example: "sukses",
      },
      message: {
        type: "string",
        example: "Password berhasil diperbarui",
      },
    },
  },

  resetPasswordFailed1: {
    type: "object",
    properties: {
      status: {
        type: "string",
        example: "gagal",
      },
      message: {
        type: "string",
        example: "Token Sudah Kadaluarsa atau Digunakan",
      },
    },
  },
  resetPasswordFailed2: {
    type: "object",
    properties: {
      status: {
        type: "string",
        example: "gagal",
      },
      message: {
        type: "string",
        example: "User tidak ditemukan",
      },
    },
  },
};

module.exports = authDocumentation;
