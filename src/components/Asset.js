import React from "react";

const Asset = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "250px",
      }}
    >
      {children}
    </div>
  );
};

export default Asset;
