/**
 * Image Compression Script
 * Converts all PNG images to WebP format (much smaller)
 * and compresses existing WebP files.
 * Also updates import paths in mockProducts.ts
 * 
 * Run: node compress_images.js
 * Requires: npm install sharp
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const IMAGE_ROOT = path.join(process.cwd(), 'src', 'data', 'images');
const MOCK_PRODUCTS_PATH = path.join(process.cwd(), 'src', 'data', 'mockProducts.ts');

// Max dimensions (resize larger images)
const MAX_WIDTH = 1200;
const MAX_HEIGHT = 1600;
const WEBP_QUALITY = 80;

let totalOriginalSize = 0;
let totalNewSize = 0;
let filesConverted = 0;
let filesCompressed = 0;
let importUpdates = []; // Track PNG -> WebP renames for import updates

async function getAllFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await getAllFiles(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

async function compressImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  
  // Skip non-image files
  if (!['.png', '.webp', '.jpg', '.jpeg'].includes(ext)) {
    return;
  }

  try {
    const originalSize = fs.statSync(filePath).size;
    totalOriginalSize += originalSize;

    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
      // Convert to WebP
      const outputPath = filePath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
      
      await sharp(filePath)
        .resize(MAX_WIDTH, MAX_HEIGHT, { 
          fit: 'inside', 
          withoutEnlargement: true 
        })
        .webp({ quality: WEBP_QUALITY })
        .toFile(outputPath);

      const newSize = fs.statSync(outputPath).size;
      totalNewSize += newSize;

      // Delete original PNG/JPG
      fs.unlinkSync(filePath);

      const savings = ((1 - newSize / originalSize) * 100).toFixed(1);
      console.log(`✅ ${path.basename(filePath)} → .webp (${formatSize(originalSize)} → ${formatSize(newSize)}, -${savings}%)`);
      
      // Track for import updates
      importUpdates.push({
        oldName: path.basename(filePath),
        newName: path.basename(outputPath),
        oldPath: filePath,
        newPath: outputPath
      });
      
      filesConverted++;
    } else if (ext === '.webp') {
      // Compress existing WebP (resize if too large)
      const metadata = await sharp(filePath).metadata();
      
      if (metadata.width > MAX_WIDTH || metadata.height > MAX_HEIGHT || originalSize > 500000) {
        const tempPath = filePath + '.tmp';
        
        await sharp(filePath)
          .resize(MAX_WIDTH, MAX_HEIGHT, { 
            fit: 'inside', 
            withoutEnlargement: true 
          })
          .webp({ quality: WEBP_QUALITY })
          .toFile(tempPath);

        const newSize = fs.statSync(tempPath).size;
        
        // Only replace if actually smaller
        if (newSize < originalSize) {
          fs.unlinkSync(filePath);
          fs.renameSync(tempPath, filePath);
          totalNewSize += newSize;
          const savings = ((1 - newSize / originalSize) * 100).toFixed(1);
          console.log(`🔧 ${path.basename(filePath)} compressed (${formatSize(originalSize)} → ${formatSize(newSize)}, -${savings}%)`);
          filesCompressed++;
        } else {
          fs.unlinkSync(tempPath);
          totalNewSize += originalSize;
          console.log(`⏭️  ${path.basename(filePath)} already optimal (${formatSize(originalSize)})`);
        }
      } else {
        totalNewSize += originalSize;
        console.log(`⏭️  ${path.basename(filePath)} already small (${formatSize(originalSize)})`);
      }
    }
  } catch (err) {
    console.error(`❌ Error processing ${filePath}: ${err.message}`);
  }
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function updateImports() {
  if (importUpdates.length === 0) {
    console.log('\nNo import updates needed.');
    return;
  }

  console.log(`\n📝 Updating ${importUpdates.length} import paths in mockProducts.ts...`);
  
  let content = fs.readFileSync(MOCK_PRODUCTS_PATH, 'utf-8');
  
  for (const update of importUpdates) {
    // Replace .png/.jpg extension with .webp in import paths
    const oldImport = update.oldName;
    const newImport = update.newName;
    
    if (content.includes(oldImport)) {
      content = content.replaceAll(oldImport, newImport);
      console.log(`  Updated: ${oldImport} → ${newImport}`);
    }
  }
  
  fs.writeFileSync(MOCK_PRODUCTS_PATH, content, 'utf-8');
  console.log('✅ mockProducts.ts updated successfully!');
}

async function main() {
  console.log('🖼️  PYNCH Image Compression Tool');
  console.log('================================\n');
  
  // Process models directory
  const modelsDir = path.join(IMAGE_ROOT, 'models');
  if (fs.existsSync(modelsDir)) {
    console.log('📁 Processing models/...\n');
    const modelFiles = await getAllFiles(modelsDir);
    for (const file of modelFiles) {
      await compressImage(file);
    }
  }

  // Process products directory
  const productsDir = path.join(IMAGE_ROOT, 'products');
  if (fs.existsSync(productsDir)) {
    console.log('\n📁 Processing products/...\n');
    const productFiles = await getAllFiles(productsDir);
    for (const file of productFiles) {
      await compressImage(file);
    }
  }

  // Process root images (Mood01.png etc.)
  console.log('\n📁 Processing root images...\n');
  const rootFiles = fs.readdirSync(IMAGE_ROOT)
    .filter(f => !fs.statSync(path.join(IMAGE_ROOT, f)).isDirectory())
    .map(f => path.join(IMAGE_ROOT, f));
  
  for (const file of rootFiles) {
    await compressImage(file);
  }

  // Update import paths in mockProducts.ts
  updateImports();

  // Summary
  console.log('\n================================');
  console.log('📊 COMPRESSION SUMMARY');
  console.log('================================');
  console.log(`Files converted (PNG → WebP): ${filesConverted}`);
  console.log(`Files compressed (WebP):      ${filesCompressed}`);
  console.log(`Original total size:          ${formatSize(totalOriginalSize)}`);
  console.log(`New total size:               ${formatSize(totalNewSize)}`);
  console.log(`Total savings:                ${formatSize(totalOriginalSize - totalNewSize)} (${((1 - totalNewSize / totalOriginalSize) * 100).toFixed(1)}%)`);
}

main().catch(console.error);
