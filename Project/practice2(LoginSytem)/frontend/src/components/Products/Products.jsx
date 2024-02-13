import React, { useEffect, useState } from "react";
import "./Products.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

export default function Products() {
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const isLogged = JSON.parse(localStorage.getItem("isLogged"));
    if (!isLogged) {
      return navigate("/login");
    }
    fetchImages();
  }, []);
  const fetchImages = async () => {
    const userId = JSON.parse(localStorage.getItem("user")).userId;
    try {
      const response = await axios.get("http://localhost:5000/get-images", {
        params: { userId: userId },
      });
      setImages(response.data.image);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };
  return (
    <motion.div
      className="product"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1>Products</h1>
      <hr />
      <br />
      <div className="gallery-body">
        <div className="gallery">
          {images.map((image, index) => (
            <div key={index} className="gallery-box">
              <img
                src={`http://localhost:5000/images/${image.image}`}
                alt={`Image ${index}`}
              />
              <h3>{image.name}</h3>
              <p>Rs. {image.price}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
