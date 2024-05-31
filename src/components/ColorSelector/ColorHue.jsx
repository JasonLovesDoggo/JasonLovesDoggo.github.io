import React, { useEffect, useRef } from "react";
import reactCSS from "reactcss";

export const calculateChange = (e, direction, hsl, container) => {
  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;
  const x = typeof e.pageX === "number" ? e.pageX : e.touches[0].pageX;
  const y = typeof e.pageY === "number" ? e.pageY : e.touches[0].pageY;
  const left = x - (container.getBoundingClientRect().left + window.scrollX);
  const top = y - (container.getBoundingClientRect().top + window.scrollY);

  if (direction === "vertical") {
    let h;
    if (top < 0) {
      h = 359;
    } else if (top > containerHeight) {
      h = 0;
    } else {
      const percent = -((top * 100) / containerHeight) + 100;
      h = (360 * percent) / 100;
    }

    if (hsl.h !== h) {
      return {
        h,
        s: hsl.s,
        l: hsl.l,
        a: hsl.a,
        source: "hsl",
      };
    }
  } else {
    let h;
    if (left < 0) {
      h = 0;
    } else if (left > containerWidth) {
      h = 359;
    } else {
      const percent = (left * 100) / containerWidth;
      h = (360 * percent) / 100;
    }

    if (hsl.h !== h) {
      return {
        h,
        s: hsl.s,
        l: hsl.l,
        a: hsl.a,
        source: "hsl",
      };
    }
  }
  return null;
};

const Hue = (props) => {
  const containerRef = useRef(null);

  const handleChange = (e) => {
    const change = calculateChange(
      e,
      props.direction,
      props.hsl,
      containerRef.current,
    );
    change && typeof props.onChange === "function" && props.onChange(change, e);
  };

  const handleMouseDown = (e) => {
    handleChange(e);
    window.addEventListener("mousemove", handleChange);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseUp = () => {
    window.removeEventListener("mousemove", handleChange);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    return () => {
      window.removeEventListener("mousemove", handleChange);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const { direction = "horizontal", hsl } = props;

  const styles = reactCSS(
    {
      default: {
        hue: {
          absolute: "0px 0px 0px 0px",
          borderRadius: props.radius,
          boxShadow: props.shadow,
        },
        container: {
          padding: "0 2px",
          position: "relative",
          height: "100%",
          borderRadius: props.radius,
        },
        pointer: {
          position: "absolute",
          left: `${(hsl.h * 100) / 360}%`,
        },
        slider: {
          marginTop: "1px",
          width: "4px",
          borderRadius: "1px",
          height: "8px",
          boxShadow: "0 0 2px rgba(0, 0, 0, .6)",
          background: "#fff",
          transform: "translateX(-2px)",
        },
      },
      vertical: {
        pointer: {
          left: "0px",
          top: `${-((hsl.h * 100) / 360) + 100}%`,
        },
      },
    },
    { vertical: direction === "vertical" },
  );

  return (
    <div style={styles.hue}>
      <div
        className={`hue-${direction}`}
        style={styles.container}
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onTouchMove={handleChange}
        onTouchStart={handleChange}
      >
        <style>{`
                    .hue-horizontal {
                        background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
                        background: -webkit-linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
                    }
                    .hue-vertical {
                        background: linear-gradient(to top, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
                        background: -webkit-linear-gradient(to top, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
                    }
                `}</style>
        <div style={styles.pointer}>
          {props.pointer ? (
            <props.pointer {...props} />
          ) : (
            <div style={styles.slider} />
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Hue);
