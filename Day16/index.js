const express = require("express");
require("./config");
const Product = require("./product");

const app = express();
app.use(express.json());
app.post("/create", async (req, resp) => {
  let data = new Product(req.body);
  let result = await data.save();
  console.log(req.body);
  resp.send(result);
});

app.get("/list", async (req, resp) => {
  let data = await Product.find({ name: "name7" });
  resp.send(data);
});

app.delete("/delete/:_id", async (req, resp) => {
  console.log(req.params);
  let data = await Product.deleteOne(req.params);
  resp.send(data);
});

app.put("/update/:_id", async (req, resp) => {
  console.log(req.params);
  let data = await Product.updateOne(req.params, { $set: req.body });
  resp.send(data);
});

app.listen(5000);
