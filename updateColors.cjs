const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'mockProducts.ts');
let content = fs.readFileSync(filePath, 'utf8');

// The regex matches the colors array for "Signature"
const regex = /colors:\s*\[\s*\{\s*name:\s*"Signature",\s*hex:\s*"#[A-Fa-f0-9]+",\s*images:\s*(\[[^\]]+\])\s*\}\s*\]/g;

content = content.replace(regex, (match, imagesArrayStr) => {
  return `colors: [
      {
        name: "After Dark",
        hex: "#242424",
        images: ${imagesArrayStr}
      },
      {
        name: "Pillow Fight",
        hex: "#F4F0E6",
        images: ${imagesArrayStr}
      },
      {
        name: "Bedhead / Pillow Fight",
        hex: "#D1D1D1,#F4F0E6",
        images: ${imagesArrayStr}
      }
    ]`;
});

fs.writeFileSync(filePath, content, 'utf8');
console.log('Updated colors in mockProducts.ts');
