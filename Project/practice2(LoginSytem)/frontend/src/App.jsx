import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { AnimatePresence, motion } from "framer-motion";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import Products from "./components/Products/Products";
import AddProduct from "./components/AddProduct/AddProduct";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <AnimatePresence wait>
          <Routes>
            <Route
              path="/register"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Signup />
                </motion.div>
              }
            />
            <Route
              path="/login"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Login />
                </motion.div>
              }
            />
            <Route
              path="/profile"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Profile />
                </motion.div>
              }
            />
            <Route
              path="/"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Products />
                </motion.div>
              }
            />
            <Route
              path="/add-product"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <AddProduct />
                </motion.div>
              }
            />
          </Routes>
        </AnimatePresence>
        <Footer />
      </Router>
    </>
  );
}

export default App;
