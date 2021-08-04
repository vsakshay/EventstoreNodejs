"use strict";
const config = require("config");
const insertData = require("../services/insertData");
const batchCount = Number(process.env.BATCHCOUNT) || 100; //Number of data inserted in a batch
const successMessage = config.get("successMessage");
const addData = async (count, userDate) => {
  console.log("eeeeeee",count)
  try {
    if (batchCount < count) {
      const insertionNumber = Math.floor(count / batchCount); // total batches
      const remainder = count % batchCount;
      for (let i = 0; i < insertionNumber; i++) {
        await insertData(batchCount, userDate);
      }
      if (remainder > 0) {
        await insertData(remainder, userDate);
      }
    } else {
      await insertData(count, userDate);
    }
    console.log(successMessage);
    return successMessage;
  } catch (err) {
    console.log({ success: "false", message: "Something went wrong" });
  }
};
module.exports = addData;
