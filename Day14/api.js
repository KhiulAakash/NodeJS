const express = require('express');
const mongodb = require('mongodb');
const dbConnect = require('./mongodb');

const app = express();
app.use(express.json());

app.get('/', async (req, resp) => {
    const db = await dbConnect();
    const result = await db.collection('products').find().toArray();
    resp.send(result);
});

// app.post('/', async (req, resp) => {
//     const db = await dbConnect();
//     const result = await db.collection('products').insertOne(req.body);
//     console.log(`Inserted count: ${result.insertedCount}`);
//     resp.send(result);
// });

// app.put('/:name', async (req, resp) => {
//     const db = await dbConnect();
//     const query = {
//         name: req.params.name
//     };
//     const operation = { $set: req.body };
//     const result = await db.collection('products').updateOne(query, operation);
//     console.log(req.body);
//     resp.send({ result: "updated" });
// });

// app.delete('/:id', async (req, resp) => {
//     console.log(req.params.id);
//     const db = await dbConnect();
//     const result = await db.collection('products').deleteOne({ _id: new mongodb.ObjectId(req.params.id) });
//     resp.send("done");
// });

app.listen(5000);
