const fs = require('fs');
const path = require('path');

function getModifiedFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (file === 'node_modules' || file === '.git' || file === 'dist' || file === '.next') continue;
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            getModifiedFiles(filePath, fileList);
        } else {
            // Check if modified today
            const mtime = stat.mtime;
            const now = new Date();
            if (mtime.toDateString() === now.toDateString()) {
                fileList.push(filePath);
            }
        }
    }
    return fileList;
}

const modifiedFiles = getModifiedFiles(path.join(__dirname, 'src'));
fs.writeFileSync('modified_today.txt', modifiedFiles.join('\n'));
