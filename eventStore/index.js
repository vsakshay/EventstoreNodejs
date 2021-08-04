"use strict";
const args = require("yargs").argv;
const adddata = require("./adddata/adddata.js");
const writeData = require("./writeData/writeData");
const format = args.fileformat;
const date = args.date;
const addCount = args.count;
const currentDate = require("./services/currentDate");
let userDate = new Date(date);
(async () => {
  if (!addCount || addCount === 0) {
    console.log({
      success: "false",
      message: "Please provide count as an integer greater than 0",
    });
    process.exit();
  } else if (date) {
    if (userDate.toString() === "Invalid Date") {
      console.log({
        success: "false",
        message: "Please provide date in a valid YYYY-MM-DD format",
      });
      process.exit();
    }
    await adddata(addCount, userDate);
  } else {
    const date = new Date();
    await adddata(addCount, date);
  }
  // // data writing
  if (date) {
    writeData(date, format);
  } else {
    const date = currentDate();
    writeData(date, format);
   }
})();
