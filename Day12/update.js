const dbConnect = require("./mongodb");

const update = async () => {
  const data = await dbConnect();
  const collection = data.collection("products");
  
  // Find all documents with the "brand" key
  const documentsWithBrand = await collection
    .find({ brand: { $exists: true } })
    .toArray();

  // Update each document with a unique "brand" value
  for (let i = 0; i < documentsWithBrand.length; i++) {
    const query = { _id: documentsWithBrand[i]._id }; // Assuming you have an "_id" field
    const updateOperation = { $set: { brand: `brand${i + 1}` } };

    const result = await collection.updateOne(query, updateOperation);

    console.log(
      `Updated document with _id ${documentsWithBrand[i]._id} - Modified ${result.modifiedCount} document(s)`
    );
  }
};
update();
