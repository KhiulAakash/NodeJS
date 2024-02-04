const dbConnect = require("./mongodb");

const deleteData = async () => {
  try {
    const db = await dbConnect();
    const collection = db.collection("products");
    const deleteData = { price: 999 };
    const result = await collection.deleteMany(deleteData);
    console.log(`Deleted ${result.deletedCount} document(s)`);
  } catch (err) {
    console.log("Error message:", err);
  }
};

deleteData();
