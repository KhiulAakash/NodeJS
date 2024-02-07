import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [info, setInfo] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleInfoChange = (event) => {
    setInfo(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      setMessage("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", selectedFile);
    formData.append("name", name);
    formData.append("info", info);

    try {
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(response.data.status);
      fetchImages(); // Fetch updated images after successful upload
    } catch (error) {
      console.error("Error uploading image:", error);
      setMessage("Error uploading image. Please try again.");
    }
  };

  const fetchImages = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getImage");
      setImages(response.data.image);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  setTimeout(() => {
    setMessage("");
  }, 5000);

  return (
    <div className="form-box">
      <div className="form">
        <h1>Image Upload</h1>
        <form onSubmit={handleSubmit}>
          <div className="input">
            <input type="file" name="avatar" onChange={handleFileChange} />
            <input
              type="text"
              name="name"
              placeholder="Enter name"
              value={name}
              onChange={handleNameChange}
              required
            />
            <input
              type="text"
              name="info"
              placeholder="Enter info"
              value={info}
              onChange={handleInfoChange}
              required
            />
          </div>
          <button type="submit">Upload Image</button>
        </form>
        {message && <p>{message}</p>}
      </div>
      <h2>Uploaded Images</h2>
      <div className="gallery-body">
        <div className="gallery">
          {images.map((image, index) => (
            <img
              key={index}
              src={`http://localhost:5000/images/${image.image}`}
              alt={`Image ${index}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
