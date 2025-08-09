// TODO: ADD DATABASE INIT DATA and ./data/initData.json data
import { readFile } from "node:fs/promises";
import User from "../models/Model.js";

// TODO: sync Model
await User.sync({ force: true });

const stringInitData = await readFile(
  "./src/scripts/data/initData.json",
  "utf-8"
);
const initData = JSON.parse(stringInitData);

// TODO: ADD DATABASE INIT DATA and ./data/initData.json data
const users = await User.bulkCreate(initData);
console.log(users);
