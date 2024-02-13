import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../store/auth";

export default function AdminUpdate() {
  const { id } = useParams();
  const { authorizationToken } = useAuth();
  const [userData, setUserData] = useState({});
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/admin/users/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: authorizationToken,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
          setFormData({
            username: data.username,
            email: data.email,
            phone: data.phone,
          });
        } else {
          console.log("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUserData();
  }, [id, authorizationToken]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/users/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        console.log("User updated successfully");
      } else {
        console.log("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="AdminUpdate">
      <h1>Update User</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Phone:
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Update User</button>
      </form>
    </div>
  );
}
