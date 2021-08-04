"use strict";
const config = require("config");
const { client } = require("../services/db");
const fs = require("fs");
const _ = require("lodash");
const JSONStream = require("JSONStream");
const QueryStream = require("pg-query-stream");
var zlib = require("zlib");
const { pipeline } = require("stream");
const errorMessage = config.get("errorMessage");
const fileName = _.random(10000, 500000);
const location = `./exportedFiles/jsonFiles/${fileName}.json.gz`;
const jsonExport = async (date) => {
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
    let writeStream = fs.createWriteStream(location);
    const message = await new Promise((resolve, reject) => {
      pipeline(
        readStream,
        JSONStream.stringify(),
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
module.exports = jsonExport;
