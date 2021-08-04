var assert = require("assert");
var chai = require("chai");
const addData = require("../adddata/adddata");
chai.should();
const csvExport = require("../exportFile/exportFile.toCsv");
const jsonExport = require("../exportFile/exportFile.toJson");
const batch = require("../services/generateRandomdata");
const { insertQuery } = require("../services/db");
describe("Test suite", () => {
  describe("Testing  function generateRandomdata and insertQuery", () => {
    it("Returns an array", async () => {
      const insertionNumber = 10;
      const date = "2021-01-01";
      const result = batch(insertionNumber, date);
      result.should.be.a("array");
      result.length.should.be.eq(insertionNumber);
      const insert = await insertQuery(result);
      insert.rowCount.should.be.eq(insertionNumber);
    });
  });
  describe("Testing function addData", () => {
    const date = "01-01-2021";
    it("Testing Data population", async () => {
      const count = 10;
      const userDate = "2021-01-01";
      const result = await addData(count, userDate);
      result.success.should.be.eq("true");
      result.message.should.be.eq("Data added successfully");
    });
  });
  describe("Testing csvexport function", () => {
    const date = "01-01-2021";
    it("Returns Data written successfully", async () => {
      const result = await csvExport(date);
      assert.strictEqual(result, "Data written successfully");
    });
  });
  describe("Testing jsonExport function", () => {
    const date = "01-01-2021";
    it("Returns Data written succesfully", async () => {
      const result = await jsonExport(date);
      assert.strictEqual(result, "Data written successfully");
    });
  });

  describe("Testing empty data on given date on jsonExport function", () => {
    const date = "02-01-2021";
    it("Returns Error message", async () => {
      const result = await jsonExport(date);
      result.success.should.be.eq("false");
      result.message.should.be.eq(`There is no data inserted at ${date}`);
    });
  });
  describe("Testing empty data on given date on csvExport function", () => {
    const date = "02-01-2021";
    it("Returns Error message", async () => {
      const result = await csvExport(date);
      result.success.should.be.eq("false");
      result.message.should.be.eq(`There is no data inserted at ${date}`);
    });
  });
});
