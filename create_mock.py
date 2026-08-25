import os
import json
from PIL import Image

def is_green_background(image_path):
    try:
        with Image.open(image_path) as img:
            img = img.convert('RGB')
            width, height = img.size
            border_pixels = []
            for x in range(0, width, max(1, width // 20)):
                border_pixels.append(img.getpixel((x, 0)))
                border_pixels.append(img.getpixel((x, height - 1)))
            for y in range(0, height, max(1, height // 20)):
                border_pixels.append(img.getpixel((0, y)))
                border_pixels.append(img.getpixel((width - 1, y)))
                
            green_count = 0
            for r, g, b in border_pixels:
                if g > r + 10 and g > b + 10:
                    green_count += 1
            return green_count > len(border_pixels) * 0.4
    except:
        return False

base_dir = 'public/images/models/Models New'
moods = {
    'Comphy': 'Sukoon',
    'Playful': 'Shararat',
    'Romantic': 'Ishq',
    'Seductress': 'Aarambh'
}

products = []

for mood_dir, mood_val in moods.items():
    mdir = os.path.join(base_dir, mood_dir)
    if not os.path.isdir(mdir): continue
    
    for product_name in os.listdir(mdir):
        pdir = os.path.join(mdir, product_name)
        if not os.path.isdir(pdir): continue
        
        files = [f for f in os.listdir(pdir) if os.path.isfile(os.path.join(pdir, f))]
        
        # Sort files so that green background images come first, then alphabetically
        files.sort(key=lambda x: (not is_green_background(os.path.join(pdir, x)), x))
        
        product_images = []
        product_videos = []
        for f in files:
            ext = f.split('.')[-1].lower()
            if ext in ['png', 'webp', 'jpg', 'jpeg', 'mp4']:
                public_path = f"/images/models/Models New/{mood_dir}/{product_name}/{f}"
                
                if ext == 'mp4':
                    product_videos.append(f'"{public_path}"')
                else:
                    product_images.append(f'"{public_path}"')
                
        category = "bras"
        if "thong" in product_name.lower() or "bikini" in product_name.lower() or "brief" in product_name.lower():
            category = "panties"
            
        products.append(f"""
  {{
    id: "{product_name.replace(' ', '-').lower()}",
    sku: "{product_name[:3].upper()}-001",
    name: "{product_name}",
    tagline: "New",
    description: "A beautifully crafted piece for your everyday essential. Join the waitlist for exclusive access.",
    price: 3500,
    category: "{category}",
    mood: "{mood_val}",
    colors: [
      {{
        name: "Signature",
        hex: "#1A1A1A",
        images: [{', '.join(product_images)}]
      }}
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    materials: "Premium Lace & Organic Cotton",
    details: ["Unlined", "Adjustable straps"],
    features: ["Comfortable fit"],
    fitInfo: "True to size.",
    story: "Designed for ultimate comfort and expression.",
    shopifyVariants: null,
    videos: [{', '.join(product_videos)}]
  }}""")

output = f"""export const MOCK_PRODUCTS = [{','.join(products)}
];
"""

with open('src/data/mockProducts.ts', 'w') as f:
    f.write(output)

print("Generated mockProducts.ts successfully.")
