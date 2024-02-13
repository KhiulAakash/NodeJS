import React, { useEffect, useState } from "react";
import "./AddProduct.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const isLogged = JSON.parse(localStorage.getItem("isLogged"));
    if (!isLogged) {
      return navigate("/login");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = JSON.parse(localStorage.getItem("user")).userId;
    const formData = new FormData();
    formData.append("avatar", selectedFile);
    formData.append("userId", userId);
    formData.append("productName", name);
    formData.append("price", price);

    try {
      const response = await axios.post(
        "http://localhost:5000/add-product",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <motion.div
      className="add-product"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <form onSubmit={handleSubmit}>
        <h1>AddProduct</h1>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Product Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="file"
          name="avatar"
          onChange={(e) => setSelectedFile(e.target.files[0])}
          required
        />
        <button type="submit">Add</button>
      </form>
    </motion.div>
  );
}
