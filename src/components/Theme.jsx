import React, {useContext, useMemo} from 'react';
import {ColorContext} from '../App.jsx';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {colorScheme, harmony} from 'simpler-color'

function DynamicThemeProvider({children}) {
    const {color} = useContext(ColorContext);

    const theme = useMemo(() => {
                const scheme = colorScheme(
                    harmony(color.hex), // , // 👈 From these base colors...
                    // 👇 ...your color palettes are auto-generated
                    colors => ({
                        // 👇 which you then map to UI roles.
                        primaryButton: colors.primary(40),
                        primaryButtonText: colors.primary(95),
                        surface: colors.neutral(98),
                        text: colors.neutral(10),
                        accent: colors.secondary(40),
                        darkAccent: colors.primary(30),
                        lightAccent: colors.primary(70),
                    })); // Generate a color palette based on the selected color

                return createTheme({
                    palette: {
                        primary: {
                            main: scheme.primaryButton,  // Assuming this is your main primary color
                            light: scheme.lightAccent, // A lighter variant
                            dark: scheme.darkAccent,     // Create a darker variant if needed
                            contrastText: scheme.text,   // Text color that contrasts with primary
                        },
                        secondary: {
                            main: scheme.accent,
                            // ... other variants as needed
                        },
                        background: {
                            default: scheme.surface,
                            // paper: scheme.neutral(95), // Slightly different shade for paper
                        },
                        text: {
                            primary: scheme.text,
                            // secondary: scheme.neutral(50), // A less prominent text color
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
