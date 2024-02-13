import React, { useEffect, useState } from "react";
import "./AdminUsers.css";
import { useAuth } from "../../store/auth";
import { Link } from "react-router-dom";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const { authorizationToken } = useAuth(); // Corrected

  const getAllUsersData = async () => {
    try {
      const resp = await fetch("http://localhost:5000/api/admin/users", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await resp.json();
      console.log(data);
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsersData();
  }, []);

  const deleteUser = async (id) => {
    const confirmation = window.confirm("Are you sure you want to delete?");
    if (confirmation) {
      const resp = await fetch(
        `http://localhost:5000/api/admin/users/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      if (resp.ok) {
        getAllUsersData();
      }
    }
  };
  return (
    <div className="AdminUsers">
      <section>
        <div className="container">
          <h1>Admin Users Data</h1>
        </div>
        <div className="container-admin-users">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((curUser, index) => (
                <tr key={index}>
                  <td>{curUser.username}</td>
                  <td>{curUser.email}</td>
                  <td>{curUser.phone}</td>
                  <td>
                    <button>
                      <Link to={`/admin/update/${curUser._id}`}>Edit</Link>
                    </button>
                  </td>
                  <td>
                    <button onClick={() => deleteUser(curUser._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
