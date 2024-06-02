import React from "react";
import reactCSS from "reactcss";
import SliderSwatch from "react-color/lib/components/slider/SliderSwatch";
export const SliderSwatches = ({ onClick, hsl, nColors, upper, lower }) => {
  const styles = reactCSS({
    default: {
      swatches: {
        marginTop: "20px",
      },
      swatch: {
        boxSizing: "border-box",
        width: "20%",
        paddingRight: "1px",
        float: "left",
      },
      clear: {
        clear: "both",
      },
    },
  });

  // Acceptable difference in floating point equality
  const epsilon = 0.1;

  return (
    <div style={styles.swatches}>
      {Array.from({ length: nColors }, (_, i) => {
        return lower + ((upper - lower) * i) / (nColors - 1);
      })
        .reverse()
        .map((offset, i) => {
          return (
            <div style={styles.swatch} key={i}>
              <SliderSwatch
                hsl={hsl}
                offset={offset}
                active={
                  Math.abs(hsl.l - offset) < epsilon &&
                  Math.abs(hsl.s - 0.5) < epsilon
                }
                onClick={onClick}
              />
            </div>
          );
        })}
      <div style={styles.clear} />
    </div>
  );
};

export default SliderSwatches;
