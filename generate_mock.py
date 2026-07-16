import os
import json

base_dir = 'src/data/images/products'
moods = {
    'Comphy': 'Sukoon',
    'Playful': 'Shararat',
    'Romantic': 'Ishq',
    'Seductress': 'Aarambh'
}

imports = []
products = []
import_count = 0

for mood_dir, mood_val in moods.items():
    mdir = os.path.join(base_dir, mood_dir)
    if not os.path.isdir(mdir): continue
    
    for product_name in os.listdir(mdir):
        pdir = os.path.join(mdir, product_name)
        if not os.path.isdir(pdir): continue
        
        files = [f for f in os.listdir(pdir) if os.path.isfile(os.path.join(pdir, f))]
        files.sort()
        if not files: continue
        
        product_images = []
        product_videos = []
        for f in files:
            ext = f.split('.')[-1].lower()
            if ext in ['png', 'webp', 'jpg', 'jpeg', 'mp4']:
                import_name = f"asset_{import_count}"
                import_path = f"./images/products/{mood_dir}/{product_name}/{f}"
                imports.append(f'import {import_name} from "{import_path}";')
                
                if ext == 'mp4':
                    product_videos.append(import_name)
                else:
                    product_images.append(import_name)
                
                import_count += 1
                
        category = "bras"
        if "thong" in product_name.lower() or "bikini" in product_name.lower() or "brief" in product_name.lower():
            category = "panties"
            
        sku = product_name.replace('#', '').strip()
        
        products.append(f"""
  {{
    id: "{product_name.replace(' ', '-').replace('#', '').lower()}",
    sku: "{sku}",
    name: "Style {sku}",
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

output = f"""{chr(10).join(imports)}

export const MOCK_PRODUCTS = [{','.join(products)}
];
"""

with open('src/data/mockProducts.ts', 'w') as f:
    f.write(output)

print("Generated mockProducts.ts successfully without 'Dont Know Yet'.")
