const wageDocumentation = {
  paths: {
    "/employee/wages": {
      get: {
        tags: ["Employee"],
        summary: "Retrieve all wage records for an employee",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Daftar gaji karyawan berhasil diambil",
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
                        wages: {
                          type: "array",
                          items: {
                            $ref: "#/components/schemas/Wage",
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
    Wage: {
      type: "object",
      properties: {
        id: {
          type: "string",
          example: "1",
        },
        amount: {
          type: "number",
          example: 5000000,
        },
        date: {
          type: "string",
          example: "2024-06-01",
        },
        status: {
          type: "string",
          example: "dibayar",
        },
      },
    },
  },
};

module.exports = wageDocumentation;
