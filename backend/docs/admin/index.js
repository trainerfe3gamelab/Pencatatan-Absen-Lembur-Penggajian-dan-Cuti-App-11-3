const holidayDocumentation = require("./holidayDocumentation");
const attendanceTimeDocumentation = require("./attendanceTimeDocumentation");
const positionDocumentation = require("./positionDocumentation");
const salaryCutDocumentation = require("./salarycutDocumentation");
const userDocumentation = require("./userDocumentation");
const attendanceReportDocumentation = require("./attendanceReportDocumentation");
const wageDocumentation = require("./wageDocumentation");
const leavedocumentation = require("./leaveDocumentation");
const overtimeDocumentation = require("./overtimeDocumentation");
const attendanceDocumentation = require("./attendanceDocumentation");
const dashboardDocumentation = require("./dashboardDocumentation");

module.exports = {
  paths: {
    ...holidayDocumentation.paths,
    ...attendanceTimeDocumentation.paths,
    ...positionDocumentation.paths,
    ...salaryCutDocumentation.paths,
    ...userDocumentation.paths,
    ...attendanceReportDocumentation.paths,
    ...wageDocumentation.paths,
    ...leavedocumentation.paths,
    ...overtimeDocumentation.paths,
    ...attendanceDocumentation.paths,
    ...dashboardDocumentation.paths,
  },
  schemas: {
    ...holidayDocumentation.schemas,
    ...attendanceTimeDocumentation.schemas,
    ...positionDocumentation.schemas,
    ...salaryCutDocumentation.schemas,
    ...userDocumentation.schemas,
    ...attendanceReportDocumentation.schemas,
    ...wageDocumentation.schemas,
    ...leavedocumentation.schemas,
    ...overtimeDocumentation.schemas,
    ...attendanceDocumentation.schemas,
    ...dashboardDocumentation.schemas,
  },
};
