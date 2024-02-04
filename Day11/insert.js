const dbConnect = require("./mongodb");

const insert = async () => {
  try {
    const db = await dbConnect();
    const dataToInsert = [
      {
        name: "text",
        brand: "Test",
        price: 999,
        category: "mobile",
      },
      {
        name: "text2",
        brand: "Test2",
        price: 999,
        category: "mobile",
      },
      {
        name: "text3",
        brand: "Test3",
        price: 999,
        category: "mobile",
      },
    ];
    const result = await db.insertMany(dataToInsert);
    console.log(`Inserted count:${result.insertedCount}`);
  } catch (error) {
    console.log(error);
  }
};
insert();
