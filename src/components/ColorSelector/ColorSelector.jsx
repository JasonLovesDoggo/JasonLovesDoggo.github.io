import reactCSS from "reactcss";
import React, { useContext, useState } from "react";
import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import { GlassBox } from "../utils/Glass";
import { ColorContext } from "../../App";
import SliderSwatches from "./SliderSwatches.jsx";
import tinycolor from "tinycolor2";

import Pointer from "./ColorPointer";
import Hue from "./ColorHue";

function ColorSquare() {
  const [open, setOpen] = useState(false); // Control picker visibility
  const { color, setColor } = useContext(ColorContext);

  const toggleOpen = () => {
    setOpen(!open);
  };
  const handleColorChange = (newColor) => {
    if (!Object.hasOwn(newColor, "hex")) {
      // if it's just the HSL object returned from Swatches
      newColor = tinycolor(newColor).toHexString();
    } else {
      newColor = newColor.hex;
    }
    setColor(newColor);
  };

  const modelStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    height: "80vh",
    padding: "1em",
    "&:focus": {
      outline: "none",
    },
  };

  const styles = reactCSS({
    default: {
      hue: {
        height: "12px",
        position: "relative",
      },
      Hue: {
        radius: "2px",
      },
    },
  });

  const hsl = tinycolor(color).toHsl();

  return (
    <div>
      <Box
        onClick={toggleOpen}
        style={{
          borderRadius: 5,
          width: "1.5em",
          height: "1.5em",
          backgroundColor: color,
          cursor: "pointer",
          position: "relative", // For positioning the picker
        }}
      />
      {open && (
        <Modal
          open={open}
          sx={modelStyle}
          onClose={toggleOpen}
          aria-labelledby="Color Picker"
          aria-describedby="This is a model to display a color picker to customize the entire website's theme"
        >
          <GlassBox sx={{ width: "50vw", margin: "3vmin", padding: "3vmin" }}>
            <div className="slider-picker">
              <div style={styles.hue}>
                <Hue
                  style={styles.hue}
                  hsl={hsl}
                  pointer={Pointer}
                  onChange={handleColorChange}
                />
              </div>
              <div style={styles.swatches}>
                <SliderSwatches
                  hsl={hsl}
                  onClick={handleColorChange}
                  nColors={5}
                  upper={0.85}
                  lower={0.25}
                />
              </div>
            </div>
          </GlassBox>
        </Modal>
      )}
    </div>
  );
}

export default ColorSquare;
