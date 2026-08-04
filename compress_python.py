import os
import glob
from PIL import Image
import sys

# Max dimensions
MAX_WIDTH = 1920
MAX_HEIGHT = 1080
QUALITY = 85

IMAGE_ROOT = os.path.join(os.getcwd(), 'src', 'data', 'images')
SRC_ROOT = os.path.join(os.getcwd(), 'src')

renames = {} # old_filename -> new_filename

def compress_image(filepath):
    ext = os.path.splitext(filepath)[1].lower()
    if ext not in ['.png', '.jpg', '.jpeg', '.webp']:
        return

    try:
        orig_size = os.path.getsize(filepath)
        
        with Image.open(filepath) as img:
            # Calculate new size
            width, height = img.size
            if width > MAX_WIDTH or height > MAX_HEIGHT:
                ratio = min(MAX_WIDTH / width, MAX_HEIGHT / height)
                new_size = (int(width * ratio), int(height * ratio))
                img = img.resize(new_size, Image.Resampling.LANCZOS)
            
            # Convert to WebP
            out_filepath = os.path.splitext(filepath)[0] + '.webp'
            
            # Temporary file
            tmp_filepath = out_filepath + '.tmp'
            
            # Save
            if img.mode in ("RGBA", "P"):
                img.save(tmp_filepath, 'webp', quality=QUALITY)
            else:
                img.convert('RGB').save(tmp_filepath, 'webp', quality=QUALITY)
            
            new_size_bytes = os.path.getsize(tmp_filepath)
            
            if new_size_bytes < orig_size or ext != '.webp':
                # Replace old file
                if filepath != out_filepath:
                    os.remove(filepath)
                os.rename(tmp_filepath, out_filepath)
                
                # Record rename if extension changed
                if filepath != out_filepath:
                    old_name = os.path.basename(filepath)
                    new_name = os.path.basename(out_filepath)
                    renames[old_name] = new_name
                    
                print(f"Compressed {os.path.basename(filepath)}: {orig_size//1024}KB -> {new_size_bytes//1024}KB")
            else:
                os.remove(tmp_filepath)
                # print(f"Skipped {os.path.basename(filepath)} (already small)")
    except Exception as e:
        print(f"Error processing {filepath}: {e}")

def update_imports():
    if not renames:
        return
        
    for root, dirs, files in os.walk(SRC_ROOT):
        for file in files:
            if file.endswith(('.ts', '.tsx', '.js', '.jsx')):
                filepath = os.path.join(root, file)
                with open(filepath, 'r') as f:
                    content = f.read()
                
                modified = False
                for old_name, new_name in renames.items():
                    if old_name in content:
                        content = content.replace(old_name, new_name)
                        modified = True
                        print(f"Updated {old_name} to {new_name} in {filepath}")
                
                if modified:
                    with open(filepath, 'w') as f:
                        f.write(content)

if __name__ == '__main__':
    print("Starting compression...")
    for root, dirs, files in os.walk(IMAGE_ROOT):
        for file in files:
            filepath = os.path.join(root, file)
            compress_image(filepath)
            
    print("Updating imports...")
    update_imports()
    print("Done!")
