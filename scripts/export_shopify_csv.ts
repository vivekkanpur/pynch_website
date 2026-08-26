import * as fs from 'fs';
import { MOCK_PRODUCTS } from '../src/data/mockProducts';

// Helper to escape CSV fields (wrap in quotes if contains comma, quotes, or newlines)
function escapeCSV(field: any): string {
  if (field === null || field === undefined) return '';
  const str = String(field);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function generateCSV() {
  // Shopify CSV Headers (Standard)
  const headers = [
    'Handle',
    'Title',
    'Body (HTML)',
    'Vendor',
    'Type',
    'Tags',
    'Published',
    'Option1 Name',
    'Option1 Value',
    'Variant SKU',
    'Variant Inventory Tracker',
    'Variant Inventory Qty',
    'Variant Inventory Policy',
    'Variant Fulfillment Service',
    'Variant Price',
    'Variant Requires Shipping',
    'Variant Taxable',
    'Image Src',
    'Image Position',
  ];

  let csvContent = headers.join(',') + '\n';

  MOCK_PRODUCTS.forEach((product) => {
    // Basic Product Info
    const handle = product.id; // e.g., pynch-001
    const title = product.name;
    const bodyHtml = product.description;
    const vendor = 'PYNCH';
    const type = product.category;
    
    // Add custom fields as tags for now (Mood, Materials) so they are searchable in Shopify
    const tags = [
      `Mood:${product.mood || 'None'}`,
      `Material:${product.materials?.substring(0, 30) || 'None'}`
    ].join(',');

    // A product might have multiple sizes. Shopify creates a row for EACH variant (size)
    const sizes = product.sizes && product.sizes.length > 0 ? product.sizes : ['Default Size'];
    
    sizes.forEach((size, index) => {
      // The first row for a product needs all the details (Title, Body, etc.)
      // Subsequent rows for the same product just need Handle and Variant details
      const isFirstRow = index === 0;

      const row = [
        handle,
        isFirstRow ? title : '',
        isFirstRow ? bodyHtml : '',
        isFirstRow ? vendor : '',
        isFirstRow ? type : '',
        isFirstRow ? tags : '',
        isFirstRow ? 'TRUE' : '', // Published
        'Size', // Option1 Name
        size,   // Option1 Value
        `${product.sku}-${size.replace(/ /g, '')}`, // Variant SKU
        'shopify', // Variant Inventory Tracker
        '100',     // Variant Inventory Qty (Mocking 100 stock)
        'deny',    // Variant Inventory Policy
        'manual',  // Variant Fulfillment Service
        product.price, // Variant Price
        'TRUE',    // Variant Requires Shipping
        'TRUE',    // Variant Taxable
        '', // Image Src (handled below)
        '', // Image Position
      ];

      csvContent += row.map(escapeCSV).join(',') + '\n';
    });

    // Shopify allows adding images by adding rows with just the Handle and Image Src
    // We will extract images from the first color
    if (product.colors && product.colors[0] && product.colors[0].images) {
      product.colors[0].images.forEach((imgUrl, imgIndex) => {
        // If it's the very first image, we could have put it on the first variant row, 
        // but it's cleaner to append image rows.
        // NOTE: Shopify requires publicly accessible URLs for images. 
        // Since some of your images might be local paths (e.g., /src/assets/...), 
        // they won't import into Shopify unless they are full HTTPS URLs.
        
        // Only include if it's a valid http URL
        if (imgUrl.startsWith('http')) {
          const imgRow = [
            handle, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
            imgUrl, // Image Src
            imgIndex + 1 // Image Position
          ];
          csvContent += imgRow.map(escapeCSV).join(',') + '\n';
        }
      });
    }
  });

  fs.writeFileSync('data/shopify_import.csv', csvContent, 'utf-8');
  console.log('Successfully generated data/shopify_import.csv with', MOCK_PRODUCTS.length, 'products.');
}

generateCSV();
