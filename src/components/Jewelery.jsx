import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import { useNavigate } from "react-router-dom"; 

const Jewelery = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const slide = {
    image:
      "https://images.unsplash.com/photo-1665159882377-385d68d2bdff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    title: "Elegant Jewellery",
    subtitle: "Discover pieces that define your style.",
    category: "Jewelery",
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          "https://fakestoreapi.com/products/category/jewelery"
        );

        setProducts(response.data);
      } catch (err) {
        console.error("Failed to fetch electronics:", err);
        setError("Unable to load electronics products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      {/* Hero section */}
      <main className="home-page">
        <section
          className="hero-carousel"
          style={{
            backgroundImage: `url("${slide.image}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="hero-overlay" />

          <div className="hero-content">
            <span className="hero-label">
              EXPLORE OUR COLLECTION
            </span>

            <h1>{slide.title}</h1>
            <p>{slide.subtitle}</p>

            <span className="hero-category text-capitalize">
              {slide.category}
            </span>
          </div>
        </section>
      </main>

      {/* Jewelery products */}
      <section className="container py-5">
        <h2 className="text-center fw-bold mb-2">
          Jewelery
        </h2>

        <p className="text-center text-secondary mb-5">
          Explore our latest Jewelery products.
        </p>

        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading Jewelery...</p>
          </div>
        )}

        {!loading && error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <p className="text-center">No Jewelery products found.</p>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="row g-4">
            {products.map((product) => (
              <div
                className="col-12 col-sm-6 col-lg-3"
                key={product.id}
              >
                <div className="card product-card h-100 border-0 shadow-sm">
                  <div className="product-image-wrapper">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="product-image"
                      loading="lazy"
                    />
                  </div>

                  <div className="card-body d-flex flex-column">
                    <h6 className="product-title text-capitalize">
                      {product.title}
                    </h6>

                    <p className="text-secondary small text-capitalize">
                      {product.category}
                    </p>

                    <div className="mt-auto">
                      <p className="product-price">
                        ₹{Number(product.price).toFixed(2)}
                      </p>

                      <button
                        type="button"
                        className="btn btn-primary w-100"
                        onClick={() =>
                          navigate(`/details/${product.id}`)
                        }
                      >
                        View Product
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Jewelery;
