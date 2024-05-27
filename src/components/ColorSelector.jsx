import {ColorPicker, useColor} from "react-color-palette";
import "react-color-palette/css";
import React, {useState} from 'react';
import {Box} from '@mui/material';
import Modal from '@mui/material/Modal';

function ColorSquare() {
    const [open, setOpen] = useState(false); // Control picker visibility
    const [color, setColor] = useColor("rgb(28,106,218)"); // Default color (blue)

    const toggleOpen = () => {
        setOpen(!open);
    };
    const handleColorChange = (newColor) => {
        setColor(newColor);
        // Update CSS variables directly
        document.documentElement.style.setProperty('--primary-color', newColor);
        document.documentElement.style.setProperty('--secondary-color', newColor);
        // ... Add more variables as needed
    };
    const modelStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '1em',
        '&:focus': {
            outline: 'none',
        }
    };
    return (
        <div>
            <Box
                onClick={toggleOpen}
                style={{
                    borderRadius: 5,
                    width: '1.5em',
                    height: '1.5em',
                    backgroundColor: color.hex,
                    cursor: 'pointer',
                    position: 'relative', // For positioning the picker
                }}
            />
            {open && (
                <Modal open={open}
                       onClose={toggleOpen}

                       aria-labelledby="modal-modal-title"
                       aria-describedby="modal-modal-description">
                    {/*onClick={toggleOpen}>*/}
                    <Box sx={modelStyle}>

                        <ColorPicker
                            style={{
                                width: '50vw',
                                height: '50vh',
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)'
                            }}
                            color={color}
                            hideAlpha={true}
                            height={200}
                            hideInput={true}
                            onChange={handleColorChange}
                        /> </Box>
                </Modal>
            )}
        </div>
    );
}

export default ColorSquare;
