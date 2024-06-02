import React from "react";

export const SliderPointer = () => {
  const styles = {
    width: "1rem",
    cursor: "pointer",
    height: "1rem",
    borderRadius: "30%",
    transform: "translate(-0.5rem, -0.1rem)",
    backgroundColor: "rgb(248, 248, 248)",
    boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.37)",
  };

  return <div style={styles} />;
};

export default SliderPointer;
