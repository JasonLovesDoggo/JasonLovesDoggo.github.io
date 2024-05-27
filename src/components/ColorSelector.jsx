import { ColorPicker } from "react-color-palette";
import "react-color-palette/css";
import React, { useContext, useState } from "react";
import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import { ColorContext } from "../App.jsx";

export function getColorObject(hex) {
  // Remove # if present
  hex = hex.replace("#", "");

  // Convert hex to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Convert RGB to HSV
  const hsv = rgbToHsv(r, g, b);

  return {
    hex: "#" + hex,
    rgb: { r, g, b },
    hsv,
  };
}

function rgbToHsv(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h,
    s,
    v = max;

  const d = max - min;
  s = max === 0 ? 0 : d / max;

  if (max === min) {
    h = 0; // achromatic
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    v: Math.round(v * 100),
  };
}

function ColorSquare() {
  const [open, setOpen] = useState(false); // Control picker visibility
  const { color, setColor } = useContext(ColorContext);

  const toggleOpen = () => {
    setOpen(!open);
  };
  const handleColorChange = (newColor) => {
    setColor(newColor);
  };
  const modelStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "1em",
    "&:focus": {
      outline: "none",
    },
  };
  return (
    <div>
      <Box
        onClick={toggleOpen}
        style={{
          borderRadius: 5,
          width: "1.5em",
          height: "1.5em",
          backgroundColor: color.hex,
          cursor: "pointer",
          position: "relative", // For positioning the picker
        }}
      />
      {open && (
        <Modal
          open={open}
          onClose={toggleOpen}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          {/*onClick={toggleOpen}>*/}
          <Box sx={modelStyle}>
            <ColorPicker
              style={{
                width: "50vw",
                height: "50vh",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
              color={color}
              hideAlpha={true}
              height={200}
              hideInput={true}
              onChange={handleColorChange}
            />{" "}
          </Box>
        </Modal>
      )}
    </div>
  );
}

export default ColorSquare;
