import React, { useState, useContext } from "react";
import { CartContext } from "../Contexts";

const ProductCard = ({ product, handleCategorySelect, selectedCategory }) => {
  const [quantity, setQuantity] = useState(1);
  const { handleAddToCart } = useContext(CartContext);

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure className="px-10 pt-10">
        <img
          src={product.image}
          alt={product.title}
          className="rounded-xl max-h-40"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{product.title}</h2>
        <p className="flex items-end font-semibold text-2xl mt-3">
          ${product.price}
        </p>

        <div className="flex justify-center items-center mt-1">
          <button
            onClick={decrementQuantity}
            className="btn btn-outline btn-sm mx-2"
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            onClick={incrementQuantity}
            className="btn btn-outline btn-sm mx-2"
          >
            +
          </button>
        </div>

        <div className="card-actions mt-4">
          <button
            className="btn btn-primary"
            onClick={() => handleAddToCart(product, quantity)}
          >
            Add to cart
          </button>
        </div>
        <div
          onClick={() => {
            handleCategorySelect(
              selectedCategory !== product.category
                ? product.category
                : "All Categories"
            );
          }}
          className="link text-xs mt-3"
        >
          {selectedCategory !== product.category
            ? `see more from ${product.category}`
            : "see all categories"}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
