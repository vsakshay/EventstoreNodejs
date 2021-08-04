// Database
"use strict";
const format = require("pg-format");
const config = require("config");
const { user, host, database, password, port } = config.get("db");
const { Client } = require("pg");
const client = new Client({
  user: user,
  host: host,
  database: database,
  password: password,
  port: port,
});
client.connect();
const insertQuery = async (array) => {
  const query = format(
    "INSERT INTO event_store (aggregate_uuid,aggregate_version,brand,region,event_type,event_data,event_meta,inserted_at) VALUES %L",
    array
  );
  const result = await client.query(query);
  return result;
};

module.exports = { client, insertQuery };
