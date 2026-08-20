import os
import csv
import urllib.parse

def generate_csv():
    base_dir = 'public/images/models/Models New'
    moods = {
        'Comphy': 'Sukoon',
        'Playful': 'Shararat',
        'Romantic': 'Ishq',
        'Seductress': 'Aarambh'
    }

    headers = [
        'Handle', 'Title', 'Body (HTML)', 'Vendor', 'Type', 'Tags', 'Published',
        'Option1 Name', 'Option1 Value', 'Variant SKU', 'Variant Inventory Tracker',
        'Variant Inventory Qty', 'Variant Inventory Policy', 'Variant Fulfillment Service',
        'Variant Price', 'Variant Requires Shipping', 'Variant Taxable', 'Image Src', 'Image Position'
    ]

    with open('shopify_import.csv', 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(headers)

        for mood_dir, mood_val in moods.items():
            mdir = os.path.join(base_dir, mood_dir)
            if not os.path.isdir(mdir): continue
            
            for product_name in os.listdir(mdir):
                pdir = os.path.join(mdir, product_name)
                if not os.path.isdir(pdir): continue
                
                # Determine basic details
                handle = product_name.replace(' ', '-').lower()
                sku = product_name[:3].upper() + "-001"
                category = "bras"
                if "thong" in product_name.lower() or "bikini" in product_name.lower() or "brief" in product_name.lower():
                    category = "panties"
                
                price = 3500
                description = "A beautifully crafted piece for your everyday essential. Join the waitlist for exclusive access."
                tags = f"Mood:{mood_val},Material:Premium Lace & Organic Cotton"
                sizes = ["XS", "S", "M", "L", "XL"]

                # Write variant rows
                for i, size in enumerate(sizes):
                    is_first = (i == 0)
                    row = [
                        handle,
                        product_name if is_first else '',
                        description if is_first else '',
                        'PYNCH' if is_first else '',
                        category if is_first else '',
                        tags if is_first else '',
                        'TRUE' if is_first else '',
                        'Size',
                        size,
                        f"{sku}-{size}",
                        'shopify',
                        '100',
                        'deny',
                        'manual',
                        price,
                        'TRUE',
                        'TRUE',
                        '', ''
                    ]
                    writer.writerow(row)

                # Collect images and append them as image rows
                files = [file for file in os.listdir(pdir) if os.path.isfile(os.path.join(pdir, file))]
                files.sort()
                
                img_position = 1
                for file in files:
                    ext = file.split('.')[-1].lower()
                    if ext in ['png', 'webp', 'jpg', 'jpeg']:
                        # properly URL-encode the path (handles spaces like "Models New" and product names)
                        path_part = f"images/models/Models New/{mood_dir}/{product_name}/{file}"
                        encoded_path = urllib.parse.quote(path_part)
                        image_url = f"https://justpynch.com/{encoded_path}"
                        
                        img_row = [
                            handle, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
                            image_url,
                            img_position
                        ]
                        writer.writerow(img_row)
                        img_position += 1

    print("Generated shopify_import.csv successfully with public images!")

if __name__ == '__main__':
    generate_csv()
