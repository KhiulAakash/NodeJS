import React, { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [responseMessage, setResponseMessage] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/addUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });
      const responseData = await response.json();
      console.log(responseData);
      setResponseMessage(responseData.status);
      setTimeout(() => {
        setResponseMessage(null);
      }, 3000);
    } catch (error) {
      console.log("Error during fetch:", error);
      setResponseMessage(responseData.status);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type="file"
        name="file"
      />
      <br />
      <button onClick={handleSubmit}>Add User</button>
      <br />
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}

export default App;
