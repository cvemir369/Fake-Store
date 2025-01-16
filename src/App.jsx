import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

function App() {
  const [allProducts, setAllProducts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart) {
      setCart(savedCart);
    }

    getAllProducts();
    getAllCategories();
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

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

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
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
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              handleRemoveFromCart={handleRemoveFromCart}
              handleUpdateQuantity={handleUpdateQuantity}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
