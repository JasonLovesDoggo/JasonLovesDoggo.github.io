import reactCSS from 'reactcss'
import "react-color-palette/css";
import React, { useContext, useState } from "react";
import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import { ColorContext } from "../App";
import { SliderPicker } from "react-color";
import { GlassBox } from './utils/Glass';

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
    width: "100vw",
    height: "100vh",
    padding: "1em",
    "&:focus": {
      outline: "none",
    },
  };
  const sliderStyle = reactCSS({height: '200px'}) // todo
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
          sx={modelStyle}
          onClose={toggleOpen}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          {/*onClick={toggleOpen}>*/}
          <GlassBox sx={{width: '50vw', margin: "3vmin", padding: "3vmin",  }}>
            <SliderPicker
              style={sliderStyle}
              color={color}
              onChange={handleColorChange}
            />
          </GlassBox>
        </Modal>
      )}
    </div>
  );
}

export default ColorSquare;
