const mongoose = require("mongoose");

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});

mongoose.connection.once("error", (err) => {
  console.error(err);
});

async function mongoConnect() {
  await mongoose.connect(process.env.MONGO_CONNECTION_URL);
}

async function mongoDisConnect() {
  await mongoose.disconnect();
}

module.exports = { mongoConnect, mongoDisConnect };
