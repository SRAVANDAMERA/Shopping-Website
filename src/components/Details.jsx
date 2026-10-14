
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addcart } from '../redux/createSlicer'

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );

        setProduct(response.data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setError("Unable to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  function back() {
    const categoryRoutes = {
      electronics: "/electronics",
      jewelery: "/jewelery",
      "men's clothing": "/mens",
      "women's clothing": "/womens",
    };

    navigate(categoryRoutes[product.category] || "/");
  }

  function handleAddToCart() {
    if (!product) return;

    const alreadyAdded = cartItems.some(
      (item) => item.id === product.id
    );

    if (alreadyAdded) {
      alert("Product is already in your cart.");
      return;
    }

    dispatch(addcart(product));
    alert("Product added to cart successfully!");
  }

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-3">Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">{error}</div>
        <button
          className="btn btn-dark"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mt-5">
        <p>Product not found.</p>
        <button
          className="btn btn-dark"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">
      <div className="row g-4 align-items-start">
        <div className="col-12 col-md-4 text-center">
          <img
            src={product.image}
            alt={product.title}
            className="img-fluid"
            style={{
              height: "300px",
              maxWidth: "100%",
              objectFit: "contain",
            }}
          />

          <h4 className="text-primary mt-3">
            ₹{Number(product.price).toFixed(2)}
          </h4>
        </div>

        <div className="col-12 col-md-5">
          <h4 className="text-muted mb-3">{product.title}</h4>

          <p className="text-secondary text-capitalize">
            {product.category}
          </p>

          <p>{product.description}</p>

          <div className="d-flex flex-wrap gap-2 mt-4">
            <button
              className="btn btn-dark rounded"
              onClick={back}
            >
              <i className="bi bi-arrow-left me-2"></i>
              Back
            </button>

            <button
              className="btn btn-primary rounded"
              onClick={handleAddToCart}
            >
              <i className="bi bi-cart-plus me-2"></i>
              Add to Cart
            </button>
          </div>
        </div>

        <div className="col-12 col-md-3">
          <div className="border rounded-3 p-3">
            <h5 className="mb-3">Product Rating</h5>

            <p>
              <strong>Rating:</strong>{" "}
              <span className="badge bg-success">
                {product.rating?.rate ?? "N/A"} ★
              </span>
            </p>

            <p>
              <strong>Reviews:</strong>{" "}
              {product.rating?.count ?? 0}
            </p>

            <p className="mb-0">
              <strong>Product ID:</strong> {product.id}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
