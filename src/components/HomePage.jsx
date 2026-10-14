import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1665159882377-385d68d2bdff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    title: "Elegant Jewellery",
    subtitle: "Discover pieces that define your style.",
    category: "Jewelery",
  },
  {
    image:
      "https://plus.unsplash.com/premium_photo-1679079456083-9f288e224e96?w=1600&auto=format&fit=crop&q=85",
    title: "Latest Electronics",
    subtitle: "Technology designed for everyday life.",
    category: "Electronics",
  },
  {
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=1600&auto=format&fit=crop&q=85",
    title: "Modern Menswear",
    subtitle: "Upgrade your wardrobe with timeless fashion.",
    category: "Mens Wear",
  },
  {
    image:
      "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=1600&auto=format&fit=crop&q=85",
    title: "Fashion for Her",
    subtitle: "Explore styles made to stand out.",
    category: "Womens Wear",
  },
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // Automatic carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((previousSlide) => (previousSlide + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Fetch products from Fake Store API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get("https://fakestoreapi.com/products");

        setProducts(response.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Unable to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const slide = slides[currentSlide];
  const navigate = useNavigate()
  return (
    <div>
      {/* Hero carousel */}
      <main className="home-page">
        <section className="hero-carousel">
          {slides.map((item, index) => (
            <div
              key={item.category}
              className={`hero-slide ${index === currentSlide ? "active" : ""}`}
              style={{
                backgroundImage: `url("${item.image}")`,
              }}
              aria-hidden={index !== currentSlide}
            />
          ))}

          <div className="hero-overlay" />

          <div className="hero-content" key={slide.category}>
            <span className="hero-label">EXPLORE OUR COLLECTION</span>

            <h1>{slide.title}</h1>
            <p>{slide.subtitle}</p>

            <span className="hero-category text-capitalize">{slide.category}</span>
          </div>

          <div className="carousel-indicators">
            {slides.map((item, index) => (
              <button
                key={item.category}
                type="button"
                className={`carousel-dot ${
                  index === currentSlide ? "selected" : ""
                }`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Show ${item.category}`}
                aria-current={index === currentSlide ? "true" : undefined}
              />
            ))}
          </div>

          <div className="carousel-counter">
            {String(currentSlide + 1).padStart(2, "0")}
            <span> / {String(slides.length).padStart(2, "0")}</span>
          </div>
        </section>
      </main>

      {/* Product section */}
      <section className="container py-5">
        <h2 className="text-center fw-bold mb-2">Our Products</h2>

        <p className="text-center text-secondary mb-5">
          Explore our latest collection.
        </p>

        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading products...</p>
          </div>
        )}

        {!loading && error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="row g-4">
            {products.map((product) => (
              <div className="col-12 col-sm-6 col-lg-3" key={product.id}>
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
                    <h6 className="product-title text-capitalize">{product.title}</h6>

                    <p className="text-secondary small text-capitalize">{product.category}</p>

                    <div className="mt-auto">
                      <p className="product-price">
                        ₹{Number(product.price).toFixed(2)}
                      </p>

                      <button
                        type="button"
                        className="btn btn-primary w-100"
                        onClick={() => navigate(`/details/${product.id}`)}
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

export default Home;
