import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../Slice/slice";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, status, error } = useSelector(
    (state) => state.productsList
  );
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (status === "save") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartSet")) || [];
    setCart(storedCart);
  }, []);

  const handleCart = (event, product) => {
    event.stopPropagation();
    const existingItem = cart.find((item) => item.id === product.id);
    {
      /**find:returns value of first element in the array
       * item.id->comes from cart arr contains all the products currently in the shopping cart.
       * product.id: Comes from the product passed as arg to handleCart.
       * This is the new product the user is trying to add the cart.
       */
    }
    let updatedCart;

    if (existingItem) {
      updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, cartTotalQuantity: item.cartTotalQuantity + 1 }
          : item
      );
      {
        /**1)looping the cart array 2)if the product id matches the increases cart quantity 3)otherwise return item  */
      }
    } else {
      updatedCart = [...cart, { ...product, cartTotalQuantity: 1 }];
    }
    {
      /**1)creates a new arr with add product  */
    }

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

  return (
    <div>
      <Navbar />
      {status === "loading" && <p>Loading products...</p>}
      {status === "failed" && <p>Error: {error}</p>}

      <div
        className="products-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "5px",
          cursor: "pointer",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="product-card"
            onClick={() => navigate(`/product/${product.id}`)}
            style={{ border: "1px solid #ddd", padding: "10px" }}
          >
            <img
              src={product.images}
              alt={product.title}
              className="product-image"
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
                <span className="d-flex " style={{}}>
                  {product.category.name}
                </span>
              </div>
              <span>
                <img
                  src={product.category.image}
                  style={{ width: "100px", borderRadius: "50px" }}
                ></img>
              </span>
            </div>
            <span className="d-flex justify-content-center">
              <button
                type="button"
                class="btn btn-success"
                onClick={(event) => handleCart(event, product)}
              >
                Add To Cart
              </button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
{
  /**Handle Add to Cart
  Checks if the product is already in the cart.
  If yes, increments the quantity.
  If no, adds it with quantity 1.
  Updates localStorage and state.
  Shows toast notification and redirects to /cartpage. */
}
