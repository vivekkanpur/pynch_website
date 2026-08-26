import re
import csv
import json

def parse_mock_products():
    with open('src/data/mockProducts.ts', 'r', encoding='utf-8') as f:
        content = f.read()

    # We need to extract the MOCK_PRODUCTS array.
    # It looks like: export const MOCK_PRODUCTS = [ { ... } ];
    
    match = re.search(r'export const MOCK_PRODUCTS(?:\s*:\s*[^=]+)?\s*=\s*(\[.*);', content, re.DOTALL)
    if not match:
        # Try a more generic match if the exact one fails
        match = re.search(r'export const MOCK_PRODUCTS.*?=\s*(\[.*\]);', content, re.DOTALL)
        
    if not match:
        print("Could not find MOCK_PRODUCTS in the file.")
        return
        
    array_str = match.group(1)
    
    # Now we have a string representing a JS array. 
    # It has unquoted keys, and variable references like 'asset_0'
    # We will do some hacky string replacements to make it valid JSON-like so we can extract data.
    
    # 1. Replace variables like asset_123 with "asset_123"
    array_str = re.sub(r'(asset_\d+)', r'"\1"', array_str)
    
    # 2. Add quotes around keys
    array_str = re.sub(r'([{,]\s*)([a-zA-Z0-9_]+)\s*:', r'\1"\2":', array_str)
    
    # 3. Handle trailing commas
    array_str = re.sub(r',\s*([\]}])', r'\1', array_str)
    
    # 4. Remove single quotes and replace with double quotes for strings (basic attempt)
    array_str = array_str.replace("'", '"')

    try:
        products = json.loads(array_str)
    except json.JSONDecodeError as e:
        print(f"Failed to parse as JSON: {e}")
        # If it fails, we will just use a simpler regex based extraction.
        return fallback_extraction(content)

    return generate_csv(products)


def fallback_extraction(content):
    print("Using regex fallback extraction...")
    products = []
    
    # Extract blocks of { id: "...", name: "..." }
    blocks = re.finditer(r'\{\s*"id"\s*:\s*"([^"]+)",\s*"sku"\s*:\s*"([^"]+)",\s*"name"\s*:\s*"([^"]+)",\s*"tagline"\s*:\s*"([^"]*)",\s*"description"\s*:\s*"([^"]*)".*?"price"\s*:\s*([\d\.]+).*?"category"\s*:\s*"([^"]+)".*?"sizes"\s*:\s*\[(.*?)\].*?"materials"\s*:\s*"([^"]*)".*?"mood"\s*:\s*"([^"]+)"', content, re.DOTALL)
    
    for match in blocks:
        sizes_str = match.group(8)
        sizes = [s.strip().strip('"').strip("'") for s in sizes_str.split(',') if s.strip()]
        
        product = {
            'id': match.group(1),
            'sku': match.group(2),
            'name': match.group(3),
            'tagline': match.group(4),
            'description': match.group(5).replace('\\n', '\n'),
            'price': float(match.group(6)),
            'category': match.group(7),
            'sizes': sizes,
            'materials': match.group(9),
            'mood': match.group(10)
        }
        products.append(product)
        
    return generate_csv(products)


def generate_csv(products):
    headers = [
        'Handle', 'Title', 'Body (HTML)', 'Vendor', 'Type', 'Tags', 'Published',
        'Option1 Name', 'Option1 Value', 'Variant SKU', 'Variant Inventory Tracker',
        'Variant Inventory Qty', 'Variant Inventory Policy', 'Variant Fulfillment Service',
        'Variant Price', 'Variant Requires Shipping', 'Variant Taxable', 'Image Src', 'Image Position'
    ]
    
    with open('data/shopify_import.csv', 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(headers)
        
        for p in products:
            handle = p.get('id', '')
            title = p.get('name', '')
            body = p.get('description', '')
            vendor = 'PYNCH'
            ptype = p.get('category', '')
            
            mood = p.get('mood', 'None')
            material = p.get('materials', 'None')[:30]
            tags = f"Mood:{mood},Material:{material}"
            
            sizes = p.get('sizes', [])
            if not sizes:
                sizes = ['Default Size']
                
            for i, size in enumerate(sizes):
                is_first = (i == 0)
                
                row = [
                    handle,
                    title if is_first else '',
                    body if is_first else '',
                    vendor if is_first else '',
                    ptype if is_first else '',
                    tags if is_first else '',
                    'TRUE' if is_first else '',
                    'Size',
                    size,
                    f"{p.get('sku', '')}-{size.replace(' ', '')}",
                    'shopify',
                    '100',
                    'deny',
                    'manual',
                    p.get('price', 0),
                    'TRUE',
                    'TRUE',
                    '', ''
                ]
                writer.writerow(row)
                
    print(f"Created data/shopify_import.csv with {len(products)} products!")

if __name__ == '__main__':
    parse_mock_products()
