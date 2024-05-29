import reactCSS from 'reactcss'
import React, {useContext, useState} from "react";
import {Box} from "@mui/material";
import Modal from "@mui/material/Modal";
import {GlassBox} from "../utils/Glass";
import {ColorContext} from "../../App";
import SliderSwatches from "./SliderSwatches.jsx";
import tinycolor from "tinycolor2";
import Hue from "react-color/lib/components/hue/Hue.js";


function ColorSquare() {
    const [open, setOpen] = useState(false); // Control picker visibility
    const {color, setColor} = useContext(ColorContext);

    const toggleOpen = () => {
        setOpen(!open);
    };
    const handleColorChange = (newColor) => {
        if (!Object.hasOwn(newColor, 'hex')) { // if it's just the HSL object returned from Swatches
            console.log('Converting to hex');
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
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <GlassBox sx={{width: '50vw', margin: "3vmin", padding: "3vmin",}}>
                        <div style={{maxWidth: "80%"}}  >
                        <Hue   // todo FIXME PLEASEEE
                            color={color}
                            onChange={handleColorChange}
                            className="LargePicker"

                        />
                            </div>
                        <SliderSwatches onClick={handleColorChange} hsl={tinycolor(color).toHsl()}/>
                    </GlassBox>
                </Modal>
            )}
        </div>
    );
}

export default ColorSquare;
