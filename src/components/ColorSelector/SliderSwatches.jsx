import React from 'react'
import reactCSS from 'reactcss'
import SliderSwatch from 'react-color/lib/components/slider/SliderSwatch'
export const SliderSwatches = ({onClick, hsl}) => {
    const styles = reactCSS({
        'default': {
            swatches: {
                marginTop: '20px',
            },
            swatch: {
                boxSizing: 'border-box',
                width: '20%',
                paddingRight: '1px',
                float: 'left',
            },
            clear: {
                clear: 'both',
            },
        },
    })

    // Acceptible difference in floating point equality
    const epsilon = 0.1

    return (
        <div style={styles.swatches}>
            <div style={styles.swatch}>
                <SliderSwatch
                    hsl={hsl}
                    offset=".85"
                    active={Math.abs(hsl.l - 0.85) < epsilon
                        && Math.abs(hsl.s - 0.50) < epsilon}
                    onClick={onClick}
                    first
                />
            </div>
            <div style={styles.swatch}>
                <SliderSwatch
                    hsl={hsl}
                    offset=".7"
                    active={Math.abs(hsl.l - 0.7) < epsilon
                        && Math.abs(hsl.s - 0.50) < epsilon}
                    onClick={onClick}
                />
            </div>
            <div style={styles.swatch}>
                <SliderSwatch
                    hsl={hsl}
                    offset=".55"
                    active={Math.abs(hsl.l - 0.55) < epsilon
                        && Math.abs(hsl.s - 0.50) < epsilon}
                    onClick={onClick}
                />
            </div>
            <div style={styles.swatch}>
                <SliderSwatch
                    hsl={hsl}
                    offset=".4"
                    active={Math.abs(hsl.l - 0.4) < epsilon
                        && Math.abs(hsl.s - 0.50) < epsilon}
                    onClick={onClick}
                />
            </div>
            <div style={styles.swatch}>
                <SliderSwatch
                    hsl={hsl}
                    offset=".25"
                    active={Math.abs(hsl.l - 0.25) < epsilon
                        && Math.abs(hsl.s - 0.50) < epsilon}
                    onClick={onClick}
                    last
                />
            </div>
            <div style={styles.clear}/>
        </div>
    )
}

export default SliderSwatches
