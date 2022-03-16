generateRandomHexColor = () => {

  const hexInts = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
  let hexColor = '#';
  while (hexColor.length < 7) {
    hexColor += hexInts[Math.floor(Math.random() * hexInts.length)];
  }
  return hexColor;
};


function hexToRgb(hex) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function rgbToHsl(r, g, b) {
  r /= 255, g /= 255, b /= 255;
  let max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }
  return [((h * 100 + 0.5) | 0), ' ' + ((s * 100 + 0.5) | 0) + '%', ' ' + ((l * 100 + 0.5) | 0) + '%'];
}

// console.log(generateRandomHexColor())

document.addEventListener('DOMContentLoaded', (event) => {
  let currentColor = generateRandomHexColor();
  if (window.location.hash !== 'changeThisToAHexCode') {
    if (window.location.hash) {
      currentColor = window.location.hash;
    } else {
      window.location.hash = 'changeThisToAHexCode';
    }
  }
  document.getElementById('rgb').innerText = `rgb(${hexToRgb(currentColor).r}, ${hexToRgb(currentColor).g}, ${hexToRgb(currentColor).b})`;
  document.getElementById('hsl').innerText = `hsl(${rgbToHsl(hexToRgb(currentColor).r, hexToRgb(currentColor).g, hexToRgb(currentColor).b)})`;
  document.getElementById('hex').innerText = currentColor;
  document.querySelector('body').style.backgroundColor = currentColor;
});

document.addEventListener('click', (event) => {
  if (!(['H2', 'H4'].includes(event.target.tagName))) {
    let currentColor = generateRandomHexColor();
    document.getElementById('rgb').innerText = `rgb(${hexToRgb(currentColor).r}, ${hexToRgb(currentColor).g}, ${hexToRgb(currentColor).b})`;
    document.getElementById('hsl').innerText = `hsl(${rgbToHsl(hexToRgb(currentColor).r, hexToRgb(currentColor).g, hexToRgb(currentColor).b)})`;
    document.getElementById('hex').innerText = currentColor;

    document.querySelector('body').style.backgroundColor = currentColor;

  }

});



