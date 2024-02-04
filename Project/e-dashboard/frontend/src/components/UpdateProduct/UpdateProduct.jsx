import React, { useEffect, useState } from "react";
import "./UpdateProduct.css";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const params = useParams();
  const navigation = useNavigate();

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    let result = await fetch(`http://localhost:5000/product/${params.id}`,{
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      }
    });
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  };

  const updateProduct = async () => {
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      method: "put",
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    if (result) {
      alert("Product details updated successfully.");
      navigation("/");
    } else {
      console.log("Error");
    }
  };
  return (
    <div className="body">
      <div className="updateProduct">
        <h1>Update Product</h1>
        <input
          type="text"
          placeholder="Enter product name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input
          type="number"
          placeholder="Enter product price"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        />
        <input
          type="text"
          placeholder="Enter product category"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        />
        <input
          type="text"
          placeholder="Enter product company"
          onChange={(e) => setCompany(e.target.value)}
          value={company}
        />
        <button onClick={updateProduct}>Update Product</button>
      </div>
    </div>
  );
}
