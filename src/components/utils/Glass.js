export default function generateGlassmorphismStyle({transparency, color, blur, outline}) {
    return {
        background: `rgba(${color.r}, ${color.g}, ${color.b}, ${transparency})`,
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`, // For older Safari versions
        border: outline ? `1px solid rgba(${color.r}, ${color.g}, ${color.b}, ${outline})` : "none",
    };
}
