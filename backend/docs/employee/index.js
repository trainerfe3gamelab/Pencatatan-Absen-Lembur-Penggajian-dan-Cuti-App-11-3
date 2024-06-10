const attendanceTimeDocumentation = require("./attendanceTimeDocumentation");
const userDocumentation = require("./userDocumentation");
const attendanceReportDocumentation = require("./attendanceReportDocumentation");
const wageDocumentation = require("./wageDocumentation");
const leavedocumentation = require("./leaveDocumentation");
const overtimeDocumentation = require("./overtimeDocumentation");
const attendanceDocumentation = require("./attendanceDocumentation");

module.exports = {
  paths: {
    ...attendanceTimeDocumentation.paths,
    ...userDocumentation.paths,
    ...attendanceReportDocumentation.paths,
    ...wageDocumentation.paths,
    ...leavedocumentation.paths,
    ...overtimeDocumentation.paths,
    ...attendanceDocumentation.paths,
  },
  schemas: {
    ...attendanceTimeDocumentation.schemas,
    ...userDocumentation.schemas,
    ...attendanceReportDocumentation.schemas,
    ...wageDocumentation.schemas,
    ...leavedocumentation.schemas,
    ...overtimeDocumentation.schemas,
    ...attendanceDocumentation.schemas,
  },
};
