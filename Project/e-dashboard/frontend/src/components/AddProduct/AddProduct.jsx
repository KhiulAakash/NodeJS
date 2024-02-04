import React, { useState } from "react";
import "./AddProduct.css";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);

  const addProduct = async () => {
    if (
      name.trim() === "" ||
      price.trim() === "" ||  
      category.trim() === "" ||
      company.trim() === ""
    ) {
      setError(true);
      return;
    }

    console.log(name, price, category, company);
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch("http://localhost:5000/add-product", {
      method: "post",
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: {
        "Content-Type": "application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    if(result){
        alert("Product added successfully.")
        setError(false);
        setName('');
        setPrice('');
        setCategory('');
        setCompany('');
    }
  };
  return (
    <div className="body">
      <div className="addProduct">
        <h1>Add Product</h1>
        <input
          type="text"
          placeholder="Enter product name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        {error && name.trim() === "" && <span>Enter valid name</span>}
        <input
          type="number"
          placeholder="Enter product price"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        />
        {error && price.trim() === "" && <span>Enter valid price</span>}
        <input
          type="text"
          placeholder="Enter product category"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        />
        {error && category.trim() === "" && <span>Enter valid category</span>}
        <input
          type="text"
          placeholder="Enter product company"
          onChange={(e) => setCompany(e.target.value)}
          value={company}
        />
        {error && company.trim() === "" && <span>Enter valid company</span>}
        <button onClick={addProduct}>Add Product</button>
      </div>
    </div>
  );
}
