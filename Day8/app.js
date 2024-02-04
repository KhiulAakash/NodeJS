const express = require("express");
const app = express();

app.get("", (req, res) => {
  console.log("Client Data:", req.query.name);
  res.send(`<h1>Welcome, This is Home Page.</h1>
  <a href="/about">About</a>`);
});

app.get("/about", (req, res) => {
  res.send(`
    <h1> Welcome, This is About Page.</h1>
    <a href="/">Home</a>
    <input type="text" placeholder="Username" value="${req.query.name}"/>
    <button>Click Me!</button>
    `);
});

app.get("/help", (req, res) => {
  res.send([
    {
      name: "Aakash",
      email: "aakash@test.com",
    },
    {
      name: "Puja",
      email: "puja@test.com",
    },
  ]);
});

app.listen(5000);
