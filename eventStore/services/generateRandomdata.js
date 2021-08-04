"use strict"
const faker = require("faker");
const _ = require("lodash");
const array = ["add", "remove"];
const array1 = [true, false];
const array2 = ["size", "bis", "searchterm", "item", "store", "style"];
var arrayBatch = [];
const generateRandomdata = (number, userDate) => {
  arrayBatch = [];
  for (let i = 0; i < number; i++) {
    const randomObj = {
      stringthree: Math.random().toString(36).substring(2, 5),
      uuid: faker.datatype.uuid(),
      requuid: faker.datatype.uuid(),
      brand: "uq",
      region: "jp",
      event_type: _.sample(array),
      aggregate_version: _.sample(array2),
      trueOrfalse: _.sample(array1),
      id: _.random(250, 40000),
      l2id: _.random(123600, 125000),
      updated_inserted: userDate,
      collectionId: _.random(206, 500),
      clientid: "collectionpf",
      styleId: _.random(40000, 50000),
      storeId: _.random(16000000, 20000000),
      size: _.random(0, 100),
      sizeid: _.random(100, 10000),
      timestamp: _.random(1000000000, 5000000000),
    };
    const {
      id,
      stringthree,
      uuid,
      requuid,
      brand,
      region,
      event_type,
      aggregate_version,
      trueOrfalse,
      l2id,
      updated_inserted,
      collectionId,
      clientid,
      styleId,
      storeId,
      size,
      sizeid,
      timestamp,
    } = randomObj;
    const sizeTitle = `test${stringthree}`;
    const searchTerm = `this is my sea${stringthree}rchterm`;
    const event_data_itembis = {
      id: id,
      l2id: l2id,
      updatedAt: updated_inserted,
      insertedAt: updated_inserted,
      collectionId: collectionId,
      isRepresentative: trueOrfalse,
    };
    const event_meta = {
      client_id: clientid,
      request_id: requuid,
    };

    const event_data_store = {
      id: id,
      storeId: storeId,
      updatedAt: updated_inserted,
      insertedAt: updated_inserted,
      collectionId: collectionId,
    };

    const event_data_style = {
      id: id,
      styleId: styleId,
      updatedAt: updated_inserted,
      insertedAt: updated_inserted,
      collectionId: collectionId,
    };
    const event_data_search = {
      id: id,
      updatedAt: updated_inserted,
      insertedAt: updated_inserted,
      collectionId: collectionId,
      searchTermId: searchTerm,
    };

    const event_data_size = {
      cup: "",
      hip: size,
      bust: size * 0.1,
      foot: size * 0.2,
      waist: size * 0.3,
      height: size * 1.1,
      inseam: size * 1.2,
      sleeve: size * 0.4,
      weight: size * 0.9,
      cup_int: size,
      size_id: `0${sizeid}`,
      bust_top: size * 2,
      timestamp: timestamp,
      bust_under: size * 0.8,
      size_title: sizeTitle,
      sleeve_neck: size * 1.2,
      dress_length: size * 1.5,
      shoulder_width: size * 0.5,
      around_the_head: 1.2,
      around_the_neck: 2.2,
      create_timestamp: timestamp,
      semi_order_shirt: {
        sleeve: size * 0.4,
        body_size: size * 1.2,
        around_the_neck: size,
      },
      semi_order_jacket: {
        jacket_garment_width: size * 0.5,
        jacket_sleeve_length: size * 0.9,
        jacket_garment_length: size * 0.9,
      },
      unit_of_measurement: "metric",
    };
    const itemBisArray = [
      uuid,
      aggregate_version,
      brand,
      region,
      event_type,
      event_data_itembis,
      event_meta,
      updated_inserted,
    ];
    const searchtermArray = [
      uuid,
      aggregate_version,
      brand,
      region,
      event_type,
      event_data_search,
      event_meta,
      updated_inserted,
    ];
    const sizeArray = [
      uuid,
      aggregate_version,
      brand,
      region,
      event_type,
      event_data_size,
      event_meta,
      updated_inserted,
    ];
    const storeArray = [
      uuid,
      aggregate_version,
      brand,
      region,
      event_type,
      event_data_store,
      event_meta,
      updated_inserted,
    ];
    const styleArray = [
      uuid,
      aggregate_version,
      brand,
      region,
      event_type,
      event_data_style,
      event_meta,
      updated_inserted,
    ];
    switch (aggregate_version) {
      case "size":
        arrayBatch.push(sizeArray);
        break;
      case "item":
        arrayBatch.push(itemBisArray);
        break;
      case "store":
        arrayBatch.push(storeArray);
        break;
      case "searchterm":
        arrayBatch.push(searchtermArray);
        break;
      case "style":
        arrayBatch.push(styleArray);
        break;
      default:
        arrayBatch.push(itemBisArray);
    }
  }
  return arrayBatch;
};
module.exports = generateRandomdata;
