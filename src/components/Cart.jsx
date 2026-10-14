import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removecart,
  increaseQuantity,
  decreaseQuantity,
} from "../redux/createSlicer";

const Cart = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems);

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0,
  );

  if (cartItems.length === 0) {
    return (
      <div className="container text-center mt-5">
        <i className="bi bi-cart-x display-1 text-secondary"></i>
        <h3 className="mt-3">Your cart is empty</h3>
        <p className="text-muted">Add some products to get started.</p>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">
      <h2 className="mb-4">Shopping Cart ({cartItems.length} products)</h2>

      {cartItems.map((item) => (
        <div key={item.id} className="card mb-3 p-3">
          <div className="row align-items-center g-3">
            <div className="col-4 col-md-2 text-center">
              <img
                src={item.image}
                alt={item.title}
                className="img-fluid"
                style={{
                  height: "100px",
                  width: "100%",
                  objectFit: "contain",
                }}
              />
            </div>

            <div className="col-8 col-md-6">
              <h6>{item.title}</h6>

              <p className="text-primary fw-bold mb-2">
                ₹{Number(item.price).toFixed(2)}
              </p>

              <div className="d-flex align-items-center gap-3">
                <button
                  className="btn btn-outline-dark btn-sm"
                  onClick={() => dispatch(decreaseQuantity(item.id))}
                  disabled={item.quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  -
                </button>

                <span className="fw-bold">{item.quantity}</span>

                <button
                  className="btn btn-outline-dark btn-sm"
                  onClick={() => dispatch(increaseQuantity(item.id))}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <p className="mt-2 mb-0">
                Subtotal: ₹{(Number(item.price) * item.quantity).toFixed(2)}
              </p>
            </div>

            <div className="col-12 col-md-4 text-md-end">
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => dispatch(removecart(item.id))}
              >
                <i className="bi bi-trash me-1"></i>
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}

      <div className="text-end mt-2">
        <h4>Total: ₹{total.toFixed(2)}</h4>
      </div>

      <div className="d-flex justify-content-center mt-5 mb-4">
        <button className="btn btn-primary btn-sm rounded-3 w-25 p-2">
          CheckOut
        </button>
      </div>
    </div>
  );
};

export default Cart;
