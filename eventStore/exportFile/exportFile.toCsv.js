"use strict";
const config = require("config");
const { client } = require("../services/db");
const fs = require("fs");
const _ = require("lodash");
const QueryStream = require("pg-query-stream");
const JSONStream = require("JSONStream");
var zlib = require("zlib");
const { Transform } = require("json2csv");
const { pipeline } = require("stream");
const errorMessage = config.get("errorMessage");
const fileName = _.random(100000, 500000);
const location = `./exportedFiles/csvFiles/${fileName}.csv.gz`;
const csvExport = async (date) => {
  try {
    let count = await client.query(
      "SELECT COUNT(*) FROM event_store WHERE CAST(inserted_at AS DATE)=$1",
      [date]
    );
    count = count.rows[0].count;
    if (count == 0) {
      const nodataMessage = {
        success: "false",
        message: `There is no data inserted at ${date}`,
      };
      console.log(nodataMessage);
      return nodataMessage;
    }
    const query = new QueryStream(
      "SELECT * FROM event_store WHERE CAST(inserted_at AS DATE)=$1",
      [date]
    );
    const readStream = client.query(query);
    const json2csv = new Transform();
    let writeStream = fs.createWriteStream(location);
    const message = await new Promise((resolve, reject) => {
      pipeline(
        readStream,
        JSONStream.stringify(),
        json2csv,
        zlib.createGzip(),
        writeStream,
        (err) => {
          err ? reject(err) : resolve("Data written successfully");
        }
      );
    });
    console.log({ success: "true", message: message });
    return message;
  } catch (err) {
    console.log(errorMessage);
    console.log(err);
  }
};
module.exports = csvExport;
