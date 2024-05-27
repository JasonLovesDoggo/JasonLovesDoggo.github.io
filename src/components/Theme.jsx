import React, {useContext, useMemo} from 'react';
import {ColorContext} from '../App.jsx';
import {createTheme, ThemeProvider} from '@mui/material/styles';

function DynamicThemeProvider({children}) {
    const {color} = useContext(ColorContext);

    const theme = useMemo(() => {
        const newTheme = createTheme({
            palette: {
                primary: {
                    main: color.hex, // Use the hex value from color
                },
            },
        });

        newTheme.palette.primary = newTheme.palette.augmentColor({
            color: newTheme.palette.primary,
            name: 'primary',
        });

        return newTheme; // Return the modified theme
    }, [color.hex]);

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default DynamicThemeProvider;
