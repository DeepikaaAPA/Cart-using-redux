import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateQuantity, removeItem } from "../features/cartSlice";

const Cart = () => {
  const items = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();

  const handleQuantityChange = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  return (
    <div className="container mt-5">
      <h2 className="text-success text-center">Shopping Cart</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Product</th>

            <th>Price per item</th>
            <th>Quantity</th>
            <th>Total price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td className="lead">
                {item.name}
                <p className="text-muted small fw-100">{item.description}</p>

                <img src={item.image} alt={item.name + " img NA"} width="50" />
              </td>
              <td>Rs.{item.price}</td>
              <td>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => {
                    if (e.target.value < 1) {
                      item.quantity = 1;
                    }
                    handleQuantityChange(item.id, Number(e.target.value));
                  }}
                  className="form-control"
                />
              </td>
              <td>Rs.{item.price * item.quantity}</td>
              <td>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="btn btn-danger"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-3 text-success text-center">
        <h3>Total Amount: Rs.{totalAmount}</h3>
      </div>
    </div>
  );
};

export default Cart;
