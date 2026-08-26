#!/usr/bin/env python3
import csv
import re

# Your public base URL where images are hosted
BASE_URL = "https://www.justpynch.com"

# Read mockProducts.ts
with open('src/data/mockProducts.ts', 'r') as f:
    content = f.read()

# Extract the array content
start = content.find('[')
end = content.rfind(']')
inner = content[start+1:end]

# Split into individual product objects
items = []
depth = 0
buf = ''
for ch in inner:
    if ch == '{':
        depth += 1
        buf += ch
    elif ch == '}':
        depth -= 1
        buf += ch
    elif ch == ',' and depth == 0:
        if buf.strip():
            items.append(buf.strip())
        buf = ''
    else:
        buf += ch
if buf.strip():
    items.append(buf.strip())

print(f"Found {len(items)} products")

# Write Shopify CSV
with open('data/shopify_import.csv', 'w', newline='', encoding='utf-8') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow([
        'Handle', 'Title', 'Body (HTML)', 'Vendor', 'Product Type',
        'Tags', 'Published', 'Option1 Name', 'Option1 Value',
        'Variant SKU', 'Variant Price', 'Image Src', 'Image Position'
    ])

    for item in items:
        # Extract basic fields
        id_match = re.search(r'\bid\s*:\s*"([^"]+)"', item)
        name_match = re.search(r'\bname\s*:\s*"([^"]+)"', item)
        desc_match = re.search(r'\bdescription\s*:\s*"((?:[^"\\]|\\.)*)"', item)
        price_match = re.search(r'\bprice\s*:\s*([0-9]+)', item)
        category_match = re.search(r'\bcategory\s*:\s*"([^"]+)"', item)
        sku_match = re.search(r'\bsku\s*:\s*"([^"]+)"', item)
        mood_match = re.search(r'\bmood\s*:\s*"([^"]+)"', item)

        # Extract images from the first color
        images = []
        colors_match = re.search(r'\bcolors\s*:\s*\[(.*?)\n\s*\]', item, re.DOTALL)
        if colors_match:
            # Find images array within first color object
            first_color = colors_match.group(1)
            images_match = re.search(r'\bimages\s*:\s*\[(.*?)\]', first_color, re.DOTALL)
            if images_match:
                img_str = images_match.group(1)
                # Split by comma and clean
                raw_imgs = img_str.split(',')
                for img in raw_imgs:
                    cleaned = img.strip().strip('"').strip()
                    if cleaned:
                        images.append(cleaned)

        handle = id_match.group(1) if id_match else ''
        title = name_match.group(1) if name_match else ''
        description = desc_match.group(1).replace("\\'", "'") if desc_match else ''
        price = price_match.group(1) if price_match else '3500'
        category = category_match.group(1) if category_match else ''
        sku = sku_match.group(1) if sku_match else ''
        mood = mood_match.group(1) if mood_match else ''

        tags = ','.join(filter(None, [mood, category]))

        # Convert relative image paths to full public URLs
        image_urls = [f"{BASE_URL}{img}" if img.startswith('/') else img for img in images]

        # First row with product data
        writer.writerow([
            handle,
            title,
            description,
            'PYNCH',
            category,
            tags,
            'TRUE',
            'Size',
            'Standard',
            sku,
            price,
            image_urls[0] if image_urls else '',
            '1' if image_urls else ''
        ])

        # Additional rows for extra images (same handle, empty other fields)
        for idx, img_url in enumerate(image_urls[1:], start=2):
            writer.writerow([
                handle,
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                img_url,
                str(idx)
            ])

print(f"Generated data/shopify_import.csv with {len(items)} products")
