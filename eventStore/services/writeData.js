"use strict";
const jsonExport = require("../exportFile/exportFile.toJson");
const csvExport = require("../exportFile/exportFile.toCsv");
const { client } = require("../services/db");
const writeData = async (date, format) => {
  if (format === "json" || format === "JSON") {
    await jsonExport(date);
    client.end();
  } else if (format === "csv" || format === "CSV" || (!format && date)) {
    await csvExport(date);
    client.end();
  } else {
    console.log({ success: "false", message: "invalid format" });
    process.exit();
  }
};
module.exports = writeData;
