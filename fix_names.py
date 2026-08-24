import os

base_dir = 'public/images/models/Models New'

mappings = {
    'Comphy': {
        'RH001': {'bra': 'Pillow Talk Wireless Bralette', 'panties': 'Pillow Talk Mid Rise Brief'},
        'DT3931': {'bra': 'The Daydream Bodysuit', 'panties': None}
    },
    'Playful': {
        '2870': {'bra': 'Caught You Looking Plunge Bralette', 'panties': 'Caught You Looking Mid Rise Bikini'},
        '9276': {'bra': 'The Tease Scoop Bralette', 'panties': 'The Tease Mid Rise Brief'},
        'T13': {'bra': 'Full Circle Molded Bra', 'panties': 'Full Circle Seamless Brief'},
        '6616': {'bra': 'Wink Wink Plunge Bralette', 'panties': 'Wink Wink Low Rise Bikini'},
        '2839': {'bra': 'Main Character Lace Bralette', 'panties': None},
        '9306 Only Bra': {'bra': 'Scene Stealer Molded Cup Bra', 'panties': None},
        '2343': {'bra': 'Truth or Dare Triangle Bralette', 'panties': 'Truth or Dare Mid Rise Thong'},
        'B29': {'bra': 'The Dare Wireless Bralette', 'panties': 'The Dare Mid Rise Brief'},
    },
    'Romantic': {
        '8810': {'bra': 'Midnight Whisper Mesh Bralette', 'panties': 'Midnight Whisper High Rise Brief'},
        '8826': {'bra': 'Love Letter Lace Balconette', 'panties': 'Love Letter Lace Thong'},
        '9350': {'bra': 'The Promise Lace Plunge Bra', 'panties': 'The Promise Lace Bikini'},
        '2867': {'bra': 'First Blush Demi Bra', 'panties': 'First Blush Mid Rise Brief'},
        '2876': {'bra': 'Stolen Glance Plunge Bralette', 'panties': 'Stolen Glance Low Rise Bikini'},
        '2851': {'bra': 'The Confession Lace Plunge Bra', 'panties': 'The Confession Lace Thong'},
    },
    'Seductress': {
        '2857': {'bra': 'The Unveiling Triangle Bralette', 'panties': 'The Unveiling Low Rise Thong'},
        '2366': {'bra': 'Opening Act Halter Bralette', 'panties': 'Opening Act Mid Rise Brief'},
        '2856': {'bra': 'Bold Move Unlined Bralette', 'panties': 'Bold Move Mid Rise Bikini'},
    }
}

for mood, items in mappings.items():
    mdir = os.path.join(base_dir, mood)
    if not os.path.isdir(mdir):
        continue
    for code, names in items.items():
        code_dir = os.path.join(mdir, code)
        if not os.path.isdir(code_dir):
            continue
        
        bra_dir = os.path.join(code_dir, 'bra')
        panties_dir = os.path.join(code_dir, 'panties')
        
        if os.path.isdir(bra_dir) and names.get('bra'):
            new_bra_dir = os.path.join(mdir, names['bra'])
            if not os.path.exists(new_bra_dir):
                os.rename(bra_dir, new_bra_dir)
                print(f"Renamed {bra_dir} to {new_bra_dir}")
            
        if os.path.isdir(panties_dir) and names.get('panties'):
            new_panties_dir = os.path.join(mdir, names['panties'])
            if not os.path.exists(new_panties_dir):
                os.rename(panties_dir, new_panties_dir)
                print(f"Renamed {panties_dir} to {new_panties_dir}")
            
        # check if bra_dir and panties_dir are absent because they never existed
        # and instead all files are right in code_dir
        if names.get('bra') and not os.path.exists(os.path.join(mdir, names['bra'])):
            new_dir = os.path.join(mdir, names['bra'])
            try:
                os.rename(code_dir, new_dir)
                print(f"Renamed {code_dir} to {new_dir}")
                continue
            except Exception as e:
                pass

        if os.path.isdir(code_dir):
            if not os.listdir(code_dir):
                os.rmdir(code_dir)

