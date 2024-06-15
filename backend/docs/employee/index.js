const attendanceTimeDocumentation = require("./attendanceTimeDocumentation");
const userDocumentation = require("./userDocumentation");
const attendanceReportDocumentation = require("./attendanceReportDocumentation");
const wageDocumentation = require("./wageDocumentation");
const leavedocumentation = require("./leaveDocumentation");
const overtimeDocumentation = require("./overtimeDocumentation");
const attendanceDocumentation = require("./attendanceDocumentation");
const positionDocumentation = require("./positionDocumentation");

module.exports = {
  paths: {
    ...attendanceTimeDocumentation.paths,
    ...userDocumentation.paths,
    ...attendanceReportDocumentation.paths,
    ...wageDocumentation.paths,
    ...leavedocumentation.paths,
    ...overtimeDocumentation.paths,
    ...attendanceDocumentation.paths,
    ...positionDocumentation.paths,
  },
  schemas: {
    ...attendanceTimeDocumentation.schemas,
    ...userDocumentation.schemas,
    ...attendanceReportDocumentation.schemas,
    ...wageDocumentation.schemas,
    ...leavedocumentation.schemas,
    ...overtimeDocumentation.schemas,
    ...attendanceDocumentation.schemas,
    ...positionDocumentation.schemas,
  },
};
