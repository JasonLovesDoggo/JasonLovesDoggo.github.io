import React, {useContext, useMemo} from 'react';
import {ColorContext} from '../App.jsx';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {colorScheme, harmony} from 'simpler-color'

function DynamicThemeProvider({children}) {
    const {color} = useContext(ColorContext);

    const theme = useMemo(() => {
                const scheme = harmony(color.hex)
                console.table(scheme)
                return createTheme({
                    palette: {
                        primary: {
                            main: scheme.primary
                        },
                        secondary: {
                            main: scheme.secondary,
                            // ... other variants as needed
                        },
                        accent: {
                            main: scheme.accent
                        },
                        error: {
                            main: scheme.error,
                        },
                        text: {
                            primary: scheme.neutral,
                        },
                        // Add other color palettes like error, warning, etc. if needed
                    },
                    // Customize typography, spacing, etc. as per your design
                }); // Return the modified theme
            },
            [color.hex]
        )
    ;

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default DynamicThemeProvider;
