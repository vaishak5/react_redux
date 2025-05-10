import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../Slice/slice";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import NavbarWithoutLogin from "./NavbarWithoutLogin";
import { FaLongArrowAltDown } from "react-icons/fa";
import { FaLongArrowAltUp } from "react-icons/fa";
const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, status, error } = useSelector(
    (state) => state.productsList
  );
  const [cart, setCart] = useState([]);

  const token = localStorage.getItem("token");

  // Fetch products on mount
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartSet")) || [];
    setCart(storedCart);
  }, []);

  const handleCart = (event, product) => {
    event.preventDefault();
    event.stopPropagation();

    if (!token) {
      localStorage.setItem("pendingCartItem", JSON.stringify(product));
      toast.error("You must be logged in to add items to cart!", {
        position: "top-right",
        autoClose: 1500,
      });
      navigate("/login");
      return;
    }

    const existingItem = cart.find((item) => item.id === product.id);
    const updatedCart = existingItem
      ? cart.map((item) =>
          item.id === product.id
            ? { ...item, cartTotalQuantity: item.cartTotalQuantity + 1 }
            : item
        )
      : [...cart, { ...product, cartTotalQuantity: 1 }];

    setCart(updatedCart);
    localStorage.setItem("cartSet", JSON.stringify(updatedCart));

    toast.success(`${product.title} added to the cart`, {
      position: "bottom-left",
      autoClose: 1000,
    });

    setTimeout(() => {
      navigate("/cartpage");
    }, 1500);
  };

  // Search and filter state
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const toggleFilters = () => setShowFilters((prev) => !prev);

  // Filtered & sorted products
  const getFilteredProducts = () => {
    let filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (priceRange) {
      filtered = filtered.filter((product) => {
        const price = product.price;
        if (priceRange === "0-50") return price < 50;
        if (priceRange === "50-100") return price >= 50 && price <= 100;
        if (priceRange === "100-200") return price >= 100 && price <= 200;
        if (priceRange === "200+") return price > 200;
        return true;
      });
    }

    if (sortOrder === "asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  };

  const filteredProducts = getFilteredProducts();
  //scroll to top functionality
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };
  const [showScrollBottom, setShowScrollBottom] = useState(true);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      setIsVisible(scrollTop > 300);
      setShowScrollBottom(scrollTop + windowHeight < fullHeight - 100); // show until you're near the bottom
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div>
      {token ? (
        <Navbar
          searchTerm={searchTerm}
          handleSearch={handleSearch}
          toggleFilters={toggleFilters}
        />
      ) : (
        <NavbarWithoutLogin
          searchTerm={searchTerm}
          handleSearch={handleSearch}
          toggleFilters={toggleFilters}
        />
      )}

      {showFilters && (
        <div className="d-flex gap-3 px-3 py-2 align-items-center justify-content-center">
          <select
            className="form-select"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            style={{ width: "200px" }}
          >
            <option value="">All Prices</option>
            <option value="0-50">Under $50</option>
            <option value="50-100">$50 - $100</option>
            <option value="100-200">$100 - $200</option>
            <option value="200+">Above $200</option>
          </select>

          <select
            className="form-select"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            style={{ width: "200px" }}
          >
            <option value="">Sort by Price</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>
      )}

      {status === "loading" && <p>Loading products...</p>}
      {status === "failed" && <p>Error: {error}</p>}

      <div
        className="products-grid py-2 px-1"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "5px",
          cursor: "pointer",
        }}
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="product-card"
              onClick={() => navigate(`/product/${product.id}`)}
              style={{ border: "1px solid #716868", padding: "10px" }}
            >
              <img
                src={product.images?.[0] || "fallback-image.jpg"}
                alt={product.title}
                width={100}
                height={100}
              />
              <h4>{product.title}</h4>
              <span className="d-flex gap-2">
                <p style={{ color: "#878787" }}>Price: </p>
                <p>${product.price}</p>
              </span>
              <span className="d-flex gap-2">
                <p style={{ color: "#878787" }}>Description:</p>
                <p>{product.description}</p>
              </span>
              <div className="d-flex flex-column">
                <div className="d-flex align-items-center gap-2">
                  <p style={{ color: "#878787", marginBottom: "0px" }}>
                    Category:
                  </p>
                  <span className="d-flex">{product.category.name}</span>
                </div>
                <span>
                  <img
                    src={product.category.image}
                    style={{ width: "100px", borderRadius: "50px" }}
                    alt="category"
                  />
                </span>
              </div>
              <span className="d-flex justify-content-center">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={(event) => handleCart(event, product)}
                >
                  Add To Cart
                </button>
              </span>
            </div>
          ))
        ) : (
          <div
            style={{
              gridColumn: "1 / -1",
              textAlign: "center",
              color: "#888",
              padding: "20px",
              fontSize: "18px",
            }}
          >
            Product not found.
          </div>
        )}
      </div>
      {isVisible && (
        <button
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "40px",
            right: "30px",
            backgroundColor: "#000",
            color: "#fff",
            border: "none",
            padding: "10px 15px",
            borderRadius: "50%",
            fontSize: "20px",
            cursor: "pointer",
            zIndex: 1000,
          }}
          title="Scroll to Top"
        >
          <FaLongArrowAltUp />
        </button>
      )}

      {showScrollBottom && (
        <button
          onClick={scrollToBottom}
          style={{
            position: "fixed",
            bottom: "100px",
            right: "30px",
            backgroundColor: "#000",
            color: "#fff",
            border: "none",
            padding: "10px 15px",
            borderRadius: "50%",
            fontSize: "20px",
            cursor: "pointer",
            zIndex: 1000,
          }}
          title="Scroll to Bottom"
        >
          <FaLongArrowAltDown />
        </button>
      )}
    </div>
  );
};

export default Home;
