const express = require("express");
require("./config");
const Product = require("./product");

const app = express();
app.use(express.json());


app.listen(5000);
