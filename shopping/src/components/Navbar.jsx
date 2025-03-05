import React, { useEffect, useState } from "react";
import { IoBagCheckSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartSet")) || [];
    const totalCount = storedCart.reduce(
      (acc, item) => acc + item.cartTotalQuantity,
      0
    );
    setCartCount(totalCount);
  }, []);
  {
    /**acc->stores the total count
    items->curr obj in array
     */
  }
  function handleLogout() {
    /* localStorage.removeItem("userToken"); */
    navigate("/login");
    
  }

  return (
    <div>
      <nav
        className="navBar d-flex align-items-center justify-content-between px-2 py-2"
        style={{
          background: "black",
          color: "white",
          position: "sticky",
          top: "0",
        }}
      >
        <h2>Online Shop</h2>
        <div className="d-flex align-items-center gap-3">
          <div className="d-flex align-items-center gap-3">
            <span
              onClick={() => navigate("/cartpage")}
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <IoBagCheckSharp title="cart" />
              <span
                className="count"
                style={{
                  border: "1px solid white",
                  paddingRight: "7px",
                  paddingLeft: "6px",
                  paddingTop: "2px",
                  paddingBottom: "2px",
                  borderRadius: "50px",
                  background: "yellow",
                  color: "black",
                }}
              >
                {cartCount}
              </span>
            </span>
          </div>
          <button type="button" class="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
