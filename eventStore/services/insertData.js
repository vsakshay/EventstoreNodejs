"use strict"
const generateRandomdata = require("../services/generateRandomdata");
const { insertQuery } = require("../services/db");
const insertData = async (number, userDate) => {
  const batchArray =generateRandomdata(number, userDate);
  await insertQuery(batchArray);
};
module.exports = insertData;
