import React from "react";

const NotFound = () => {
  return (
    <div
      className="notFound d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: "80vh" }}
    >
      <h1 style={{ color: "red" }}>404</h1>
      <h1 style={{ color: "red" }}>Page Not Found</h1>
    </div>
  );
};

export default NotFound;
