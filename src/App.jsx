import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import {
  AllProductsContext,
  AllCategoriesContext,
  CartContext,
  HeaderContext,
  HomeContext,
} from "./Contexts";
import toast, { Toaster } from "react-hot-toast";

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
    toast.success("Added to cart!");
  };

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    toast.success("Removed from cart!");
    localStorage.removeItem("cart");
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
      <Toaster />
      <HeaderContext.Provider
        value={{ cartCount: getCartCount(), cartTotal: getCartTotal() }}
      >
        <AllCategoriesContext.Provider value={allCategories}>
          <AllProductsContext.Provider value={allProducts}>
            <CartContext.Provider
              value={{ cart, handleRemoveFromCart, handleUpdateQuantity }}
            >
              <HomeContext.Provider value={{ handleAddCart }}>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/*" element={<NotFound />} />
                  </Routes>
                </Layout>
              </HomeContext.Provider>
            </CartContext.Provider>
          </AllProductsContext.Provider>
        </AllCategoriesContext.Provider>
      </HeaderContext.Provider>
    </Router>
  );
}

export default App;
