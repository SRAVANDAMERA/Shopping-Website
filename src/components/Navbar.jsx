import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Navbar.css";

const Navbar = () => {
  const cartCount = useSelector(
    (state) => state.cart.cartCount
  );

  return (
    <nav className="custom-navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="navbar-brand text-white">
          Shopping
        </NavLink>

        <div className="navbar-links">
          <NavLink to="/" end className="navbar-link">
            Home
          </NavLink>

          <NavLink to="/electronics" className="navbar-link">
            Electronics
          </NavLink>

          <NavLink to="/jewelery" className="navbar-link">
            Jewelery
          </NavLink>

          <NavLink to="/mens" className="navbar-link">
            Mens Wear
          </NavLink>

          <NavLink to="/womens" className="navbar-link">
            Womens Wear
          </NavLink>
        </div>

        <NavLink
          to="/cart"
          className="cart-link"
          aria-label={`Shopping cart with ${cartCount} items`}
        >
          <i className="bi bi-cart3"></i>

          <span className="cart-count">
            {cartCount}
          </span>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
