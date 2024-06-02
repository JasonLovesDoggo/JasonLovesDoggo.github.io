import { useContext } from "react";
import { ColorContext } from "../../App";
import { Box } from "@mui/material";
import tinycolor from "tinycolor2";

export default function generateGlassmorphismStyle({
  transparency,
  color,
  blur,
  outline,
}) {
  color = tinycolor(color).toRgb();
  return {
    background: `rgba(${color.r}, ${color.g}, ${color.b}, ${transparency})`,
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`, // For older Safari versions
    border: outline
      ? `1px solid rgba(${color.r}, ${color.g}, ${color.b}, ${outline})`
      : "none",
  };
}

export function GlassBox({ children, sx = {} }) {
  const { color } = useContext(ColorContext);
  const styles = generateGlassmorphismStyle({
    transparency: 0.4,
    color: color,
    blur: 9.2,
    outline: 0.3,
  });
  return <Box style={{ ...sx, ...styles }}>{children}</Box>;
}
