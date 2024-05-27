import {css} from "@emotion/react"; // Or your preferred CSS-in-JS library

export default function generateGlassmorphismStyle({transparency, color, blur, outline}) {
    const outlineCSS = outline
        ? `1px solid rgba(${color.r}, ${color.g}, ${color.b}, ${outline})`
        : "none"; // Default to no outline

    return css`
        /* Begin Auto-Generated Glassmorphism Styles */
        background: rgba(${color.r}, ${color.g}, ${color.b}, ${transparency});
        border-radius: 16px;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(${blur}px);
        -webkit-backdrop-filter: blur(${blur}px);
        border: ${outlineCSS};
        /* End Auto-Generated Glassmorphism Styles */
    `;
}
