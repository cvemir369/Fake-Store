import React, { useContext } from "react";
import { CartContext } from "../Contexts";

const Cart = ({ handleRemoveFromCart }) => {
  const cart = useContext(CartContext);
  const getLineTotal = (item) => {
    return (item.quantity * item.price).toFixed(2);
  };

  return (
    <div className="container mt-5">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Line Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>${item.price}</td>
                <td>{item.quantity}</td>
                <td>${getLineTotal(item)}</td>
                <td>
                  <button
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="btn btn-danger"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="text-right">
        <h3>
          Total: $
          {cart
            .reduce((total, item) => total + item.quantity * item.price, 0)
            .toFixed(2)}
        </h3>
      </div>
    </div>
  );
};

export default Cart;
