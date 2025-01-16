import React, { useContext } from "react";
import { useState } from "react";
import ProductCard from "../components/ProductCard";
import Category from "../components/Category";
import Hero from "../components/Hero";
import { AllCategoriesContext, AllProductsContext } from "../Contexts";

const Home = ({ handleAddCart }) => {
  const allCategories = useContext(AllCategoriesContext);
  const allProducts = useContext(AllProductsContext);

  // State to track the selected category
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  // Event handler to set the selected category
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  // Filter products based on the selected category
  const filteredProducts =
    selectedCategory === "All Categories"
      ? allProducts
      : allProducts.filter((product) => product.category === selectedCategory);

  return (
    <>
      <Hero />
      <div role="tablist" className="tabs grid-cols-5 tabs-boxed items-center">
        <a
          role="tab"
          className={`tab ${
            selectedCategory === "All Categories" ? "tab-active" : ""
          } text-xs font-semibold p-2 h-full`}
          onClick={() => handleCategorySelect("All Categories")}
        >
          All Categories
        </a>
        {allCategories.map((category, index) => (
          <Category
            key={index}
            category={category}
            isActive={selectedCategory === category}
            onCategorySelect={handleCategorySelect}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-5 justify-center">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            handleAddToCart={handleAddCart}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
