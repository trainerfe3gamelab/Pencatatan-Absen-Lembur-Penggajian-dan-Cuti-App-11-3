const dashboardDocumentation = {
  paths: {
    "/admin/dashboards": {
      get: {
        tags: ["Admin"],
        summary: "Retrieve all dashboard data",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Dashboard",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/DashboardResponse",
                  },
                },
                example: [
                  {
                    status: "sukses",
                    data: {
                      employees: "1",
                      admins: "8",
                      positions: 2,
                      attendances: 0,
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
  },

  components: {
    schemas: {
      DashboardResponse: {
        type: "object",
        properties: {
          employees: {
            type: "string",
            example: "98",
          },
          admins: {
            type: "string",
            example: "12",
          },
          positions: {
            type: "string",
            example: "3",
          },
          attendances: {
            type: "string",
            example: "120",
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
  },
};

module.exports = dashboardDocumentation;
