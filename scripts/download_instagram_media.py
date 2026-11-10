import urllib.request
import os

reels = [
    ('insta-1', 'DcgKFe4tKTw', 'ig-reel-1'),
    ('insta-2', 'DcX2TB1o2nH', 'ig-reel-2'),
    ('insta-3', 'DcQ32bGM1eX', 'ig-reel-3'),
]

out_dir = r'c:\Users\Admin\OneDrive\Documents\Portfolio\public\thumbnails'
video_dir = r'c:\Users\Admin\OneDrive\Documents\Portfolio\public\videos'
os.makedirs(out_dir, exist_ok=True)
os.makedirs(video_dir, exist_ok=True)

def get_prop(html, name):
    key = name + '\\":\\"'
    pos = html.find(key)
    if pos == -1:
        # fallback without backslash
        key = name + '":"'
        pos = html.find(key)
        if pos == -1:
            return None
        start = pos + len(key)
        end = html.find('"', start)
    else:
        start = pos + len(key)
        end = html.find('\\"', start)
    
    val = html[start:end]
    val = val.replace('\\\\\\/', '/').replace('\\/', '/').replace('\\u0026', '&')
    return val

for name, code, pid in reels:
    url = f'https://www.instagram.com/reel/{code}/embed/'
    print(f'\n=== Processing {name} ({code}) ===')
    try:
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req, timeout=15) as resp:
            html = resp.read().decode('utf-8', errors='ignore')

        d_url = get_prop(html, 'display_url')
        v_url = get_prop(html, 'video_url')

        print('  d_url:', d_url[:80] if d_url else 'None')
        print('  v_url:', v_url[:80] if v_url else 'None')

        if d_url:
            try:
                tr = urllib.request.Request(d_url)
                with urllib.request.urlopen(tr, timeout=15) as t_resp:
                    b = t_resp.read()
                    thumb_path = os.path.join(out_dir, f'{name}.jpg')
                    with open(thumb_path, 'wb') as f:
                        f.write(b)
                    print(f'  ✓ Saved real thumbnail -> {name}.jpg ({len(b)} bytes)')
            except Exception as e:
                print(f'  x Failed saving thumbnail: {e}')

        if v_url:
            try:
                vr = urllib.request.Request(v_url)
                with urllib.request.urlopen(vr, timeout=30) as v_resp:
                    b = v_resp.read()
                    video_path = os.path.join(video_dir, f'{name}.mp4')
                    with open(video_path, 'wb') as f:
                        f.write(b)
                    print(f'  ✓ Saved real video MP4 -> {name}.mp4 ({len(b)} bytes)')
            except Exception as e:
                print(f'  x Failed saving video: {e}')

    except Exception as e:
        print(f'Error processing {name}: {e}')

print('\nDone processing all 3 reels!')

