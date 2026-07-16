const fs = require('fs');
const path = require('path');

const baseDir = 'src/data/images/models/Models New';
const moods = fs.readdirSync(baseDir).filter(f => fs.statSync(path.join(baseDir, f)).isDirectory());

const result = {};

for (const mood of moods) {
  result[mood] = [];
  const moodDir = path.join(baseDir, mood);
  const products = fs.readdirSync(moodDir).filter(f => fs.statSync(path.join(moodDir, f)).isDirectory());
  
  for (const product of products) {
    const productDir = path.join(moodDir, product);
    const files = fs.readdirSync(productDir).filter(f => fs.statSync(path.join(productDir, f)).isFile());
    result[mood].push({
      name: product,
      files: files.map(f => path.join(productDir, f))
    });
  }
}

console.log(JSON.stringify(result, null, 2));
