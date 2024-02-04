import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Signup from "./components/Signup/Signup";
import PrivateComponent from "./components/PrivateComponent/PrivateComponent";
import Login from "./components/Login/Login";
import AddProduct from "./components/AddProduct/AddProduct";
import ProductList from "./components/ProductList/ProductList";
import UpdateProduct from "./components/UpdateProduct/UpdateProduct";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<ProductList/>} />
            <Route path="/add" element={<AddProduct/>} />
            <Route path="/update/:id" element={<UpdateProduct/>} />
            <Route path="/logout" element={<h1>Logout component</h1>} />
            <Route path="/profile" element={<h1>Profile</h1>} />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
