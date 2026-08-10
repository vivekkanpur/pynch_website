import os
import subprocess
from PIL import Image

def get_modified_images():
    # Get all images modified or deleted in the last commit (HEAD~1 to HEAD)
    result = subprocess.run(['git', 'diff', '--name-status', 'HEAD~1', 'HEAD'], capture_output=True, text=True)
    lines = result.stdout.strip().split('\n')
    images = []
    for line in lines:
        if not line: continue
        parts = line.split('\t')
        status = parts[0]
        # If it was modified (M) or deleted (D), the old version is in HEAD~1
        if status in ['M', 'D']:
            path = parts[1]
            if path.startswith('src/data/images/') and path.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
                images.append((status, path))
    return images

def process_images():
    images = get_modified_images()
    print(f"Found {len(images)} modified/deleted images.")
    
    restored_count = 0
    for status, path in images:
        try:
            # Extract the old file from HEAD~1
            old_file_cmd = ['git', 'show', f'HEAD~1:{path}']
            result = subprocess.run(old_file_cmd, capture_output=True)
            if result.returncode != 0:
                continue
                
            old_data = result.stdout
            temp_path = "temp_old_image"
            with open(temp_path, "wb") as f:
                f.write(old_data)
                
            with Image.open(temp_path) as img:
                width, height = img.size
                # Check if 16:9 (or wide)
                # 16/9 is ~1.77. We can check if width > height * 1.5
                if width > height * 1.5:
                    print(f"Restoring wide image: {path} (Original size: {width}x{height})")
                    
                    # Convert to WebP without resizing
                    new_filename = os.path.splitext(path)[0] + '.webp'
                    
                    if img.mode in ("RGBA", "P"):
                        img.save(new_filename, 'webp', quality=80)
                    else:
                        img.convert('RGB').save(new_filename, 'webp', quality=80)
                    
                    restored_count += 1
            os.remove(temp_path)
            
        except Exception as e:
            print(f"Error processing {path}: {e}")
            
    print(f"Successfully restored and re-compressed {restored_count} wide images.")

if __name__ == '__main__':
    process_images()
