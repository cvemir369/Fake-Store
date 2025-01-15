import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

function App() {
  const [allProducts, setAllProducts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [cart, setCart] = useState([]);

  const getAllProducts = async () => {
    try {
      const res = await axios.get(`https://fakestoreapi.com/products`);
      setAllProducts(res.data);
    } catch (error) {
      console.error("Error during getAllProducts GET request", error);
    }
  };

  const getAllCategories = async () => {
    try {
      const res = await axios.get(
        `https://fakestoreapi.com/products/categories`
      );
      setAllCategories(res.data);
    } catch (error) {
      console.error("Error during getAllCategories GET request", error);
    }
  };

  const handleAddCart = (product, quantity) => {
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex(
      (item) => item.id === product.id
    );

    if (productIndex >= 0) {
      updatedCart[productIndex].quantity += quantity;
    } else {
      updatedCart.push({ ...product, quantity });
    }
    setCart(updatedCart);
  };

  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    return cart
      .reduce((total, item) => total + item.quantity * item.price, 0)
      .toFixed(2);
  };

  useEffect(() => {
    getAllProducts();
    getAllCategories();
  }, []);

  return (
    <Router>
      <Header cartCount={getCartCount()} cartTotal={getCartTotal()} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              allProducts={allProducts}
              allCategories={allCategories}
              handleAddCart={handleAddCart}
            />
          }
        />
        <Route path="cart" element={<Cart cart={cart} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
