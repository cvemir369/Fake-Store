import React, { useState } from "react";

const ProductCard = ({ product, handleAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

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
        <p>${product.price}</p>
        <div className="btn btn-sm">more from {product.category}...</div>

        <div className="flex justify-center items-center mt-4">
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
            onClick={() => handleAddToCart(product, quantity)} // передаем товар и количество
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
