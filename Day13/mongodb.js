const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

const dbConnect = async () => {
  const result = await client.connect();
  return result.db("e-comm");
};

module.exports = dbConnect;
