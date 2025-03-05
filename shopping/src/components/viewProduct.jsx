import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../Slice/slice"; // Import Redux action

const ViewProduct = () => {
  const { id } = useParams(); // Get product ID from URL
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { product, status, error } = useSelector((state) => state.productsList);

  useEffect(() => {
    dispatch(fetchProductById(id)); // Fetch product when component mounts
  }, [dispatch, id]);

  if (status === "loading") {
    return <p>Loading product...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="bodySet d-flex gap-3 px-2 py-2">
      {product ? ( // Ensure product is not null
        <>
          <div className="d-flex">
            <img
              src={product.images}
              alt="Product"
              style={{ width: "350px", height: "417px" }}
            />
          </div>
          <div className="productsList">
            <p style={{ fontSize: "18px" }}>{product.title}</p>
            <div className="d-flex align-items-baseline gap-2 my-2">
              <p style={{ color: "#878787" }}>Category:</p>
              {product.category ? (
                <p className="d-flex flex-column gap-3">
                  <span className="d-flex align-items-center gap-1">
                    {product.category.name}
                  </span>
                  <img
                    src={product.category.image}
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50px",
                    }}
                  />
                </p>
              ) : (
                <p style={{ fontSize: "14px", color: "#878787" }}>
                  No Categories available
                </p>
              )}
            </div>
            <span className="d-flex align-items-center">
              <p style={{ color: "#878787" }}>Price:</p>
              <p
                style={{
                  color: "#212121",
                  fontWeight: "bold",
                  fontSize: "28px",
                }}
              >
                ${product.price}
              </p>
            </span>
            <span className="d-flex my-3 gap-2">
              <p style={{ color: "#878787" }}>Description:</p>
              <p style={{ fontSize: "14px", color: "#212121" }}>
                {product.description}
              </p>
            </span>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/home")}
            >
              Back To Home Page
            </button>
          </div>
        </>
      ) : (
        <p>No product found</p>
      )}
    </div>
  );
};

export default ViewProduct;
