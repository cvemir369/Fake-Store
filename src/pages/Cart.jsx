import React from "react";

const Cart = ({ cart, handleRemoveFromCart, handleUpdateQuantity }) => {
  const getLineTotal = (item) => {
    return (item.quantity * item.price).toFixed(2);
  };

  const incrementQuantity = (item) => {
    handleUpdateQuantity(item.id, item.quantity + 1);
  };

  const decrementQuantity = (item) => {
    if (item.quantity > 1) {
      handleUpdateQuantity(item.id, item.quantity - 1);
    }
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
                <td>
                  <button
                    onClick={() => decrementQuantity(item)}
                    className="btn btn-outline btn-sm"
                  >
                    -
                  </button>
                  {item.quantity}
                  <button
                    onClick={() => incrementQuantity(item)}
                    className="btn btn-outline btn-sm"
                  >
                    +
                  </button>
                </td>
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
