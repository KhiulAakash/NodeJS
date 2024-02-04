import React, { useEffect, useState } from "react";
import "./ProductList.css";
import { Link } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:5000/products", {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    setProducts(result);
  };
  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:5000/product/${id}`, {
      method: "Delete",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      }
    });
    result = await result.json();
    if (result) {
      alert("Product has been deleted");
      getProducts();
    }
  };

  const searchHandle = async (e) => {
    let key = e.target.value;
    if (key.trim() !== "") {
      let result = await fetch(`http://localhost:5000/search/${key}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      setProducts(result);
    } else {
      getProducts();
    }
  };
  return (
    <div className="productList">
      <h3>Product List</h3>
      <div className="search">
        <input
          type="text"
          placeholder="Search...."
          onChange={(e) => searchHandle(e)}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>S.N</th>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Product category</th>
            <th>Product company</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((eachProduct, index) => (
            <tr key={eachProduct._id}>
              <td>{index + 1}</td>
              <td>{eachProduct.name}</td>
              <td>Rs. {eachProduct.price}</td>
              <td>{eachProduct.category}</td>
              <td>{eachProduct.company}</td>
              <td>
                <button onClick={() => deleteProduct(eachProduct._id)}>
                  delete
                </button>{" "}
                <button>
                  <Link to={`/update/${eachProduct._id}`}>update</Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
