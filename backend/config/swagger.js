const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const adminDocumentation = require("../docs/admin/index");
const employeeDocumentation = require("../docs/employee/index");

const authDocumentation = require("../docs/auth/authDocumentation");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Pencatatan-Absen-Lembur-Penggajian-dan-Cuti-App API",
      description: "Dokumentasi API",
      version: "1.0.0",
    },
    servers: [{ url: `http://localhost:${process.env.PORT || 3000}/api` }],
    tags: [
      {
        name: "Employee",
        description: "Api untuk role employee (Butuh access token)",
      },
      {
        name: "Auth",
        description: "Untuk melakukan autentikasi",
      },
      {
        name: "Admin",
        description: "Api untuk role Admin (Butuh access token)",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        ...authDocumentation.schemas,
        ...adminDocumentation.schemas,
        ...employeeDocumentation.schemas,
      },
    },
    paths: {
      ...authDocumentation.paths,
      ...adminDocumentation.paths,
      ...employeeDocumentation.paths,
    },
  },
  apis: [],
};

const specs = swaggerJsdoc(swaggerOptions);

const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};

module.exports = swaggerDocs;
