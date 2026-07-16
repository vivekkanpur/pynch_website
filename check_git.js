const fs = require('fs');
const path = require('path');
const gitPath = path.join(__dirname, '.git');
console.log('Exists:', fs.existsSync(gitPath));
if (fs.existsSync(gitPath)) {
    console.log('Is directory:', fs.statSync(gitPath).isDirectory());
}
