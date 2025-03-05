import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [cartProd, setCartProd] = useState([]);
  const [totalAmt, setTotalAmt] = useState(0);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartSet")) || [];
    setCartProd(storedCart);
  }, []);

  //calculate total amount
  useEffect(() => {
    const total = cartProd.reduce(
      (acc, product) => acc + product.price * product.cartTotalQuantity,
      0
    );
    setTotalAmt(total);
  }, [cartProd]);

  // Handle quantity increment
  const increaseQuantity = (id) => {
    const updatedCart = cartProd.map((product) =>
      product.id === id
        ? { ...product, cartTotalQuantity: product.cartTotalQuantity + 1 }
        : product
    );
    setCartProd(updatedCart);
    localStorage.setItem("cartSet", JSON.stringify(updatedCart));
  };

  // Handle quantity decrement
  const decreaseQuantity = (id) => {
    const updatedCart = cartProd
      .map((product) =>
        product.id === id
          ? {
              ...product,
              cartTotalQuantity: Math.max(1, product.cartTotalQuantity - 1),
            }
          : /** Updates the cartTotalQuantity by reducing it by 1,
             * but ensures it never goes below 1 using Math.max(1, product.cartTotalQuantity - 1).*/
            product
      )
      .filter((product) => product.cartTotalQuantity > 0);

    setCartProd(updatedCart);
    localStorage.setItem("cartSet", JSON.stringify(updatedCart));
  };

  // Handle product removal
  const removeFromCart = (id) => {
    const updatedCart = cartProd.filter((product) => product.id !== id);
    setCartProd(updatedCart);
    localStorage.setItem("cartSet", JSON.stringify(updatedCart));
  };
  const handleBack = () => {
    navigate("/home");
  };

  return (
    <div>
      <h1 style={{ padding: "10px" }} className="d-flex justify-content-center">
        Cart Page
      </h1>

      {cartProd.length === 0 ? (
        <div>
          <h6 style={{ padding: "10px" }}>Your cart is empty.....</h6>
        </div>
      ) : (
        <div style={{ padding: "10px" }}>
          {cartProd.map((product) => (
            <div
              key={product.id}
              style={{
                border: "1px solid #716868",
                padding: "10px",
                marginBottom: "10px",
                width: "50%",
              }}
            >
              <img src={product.images} width={100} height={100}></img>
              <h5>{product.title}</h5>
              <span className="d-flex align-items-center gap-2">
                <p style={{ color: "#878787" }}>Price: </p>
                <p>${product.price}</p>
              </span>
              <span className="d-flex align-items-center gap-2">
                <p style={{ color: "#878787" }}>Quantity: </p>
                <p>{product.cartTotalQuantity}</p>
              </span>

              <div className="d-flex gap-3">
                <button
                  type="button"
                  class="btn btn-success"
                  onClick={() => increaseQuantity(product.id)}
                >
                  +
                </button>
                <button
                  type="button"
                  class="btn btn-warning"
                  onClick={() => decreaseQuantity(product.id)}
                >
                  -
                </button>
                <button
                  type="button"
                  class="btn btn-dark"
                  onClick={() => removeFromCart(product.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <span style={{ padding: "10px" }}>
        <button
          type="button"
          class="btn btn-primary"
          onClick={handleBack}
          style={{ padding: "10px" }}
        >
          Bact to Home
        </button>
      </span>
      <div style={{ padding: "10px" }}>
        <h4>Total Amount: ${totalAmt.toFixed(2)}</h4>
      </div>
    </div>
  );
};

export default Cart;
