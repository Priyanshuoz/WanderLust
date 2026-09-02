const mongoose = require("mongoose");
const Listing = require("../models/listing");
const initData = require("./data.js");

let mongo_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("Connected to DB.");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(mongo_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({...obj, owner : "6a90731875df4d328a28c20b"}));
  await Listing.insertMany(initData.data);
  console.log("Data was initialized");
};

initDB();
