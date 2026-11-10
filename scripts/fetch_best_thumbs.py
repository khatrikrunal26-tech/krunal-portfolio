import urllib.request
import re
import os

for name, code in [('insta-1', 'DcgKFe4tKTw'), ('insta-2', 'DcX2TB1o2nH')]:
    url = f'https://www.instagram.com/reel/{code}/embed/'
    req = urllib.request.Request(url)
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode('utf-8', errors='ignore')

    # Look for display_resources
    # JSON array with config_width and config_height
    matches = re.findall(r'\\"src\\":\\"([^"\\]+)\\",\\"config_width\\":(\d+),\\"config_height\\":(\d+)', html)
    print(name, 'display resources found:', len(matches))
    for src, w, h in matches:
        print(f'  {w}x{h} -> {src[:60]}...')
    
    # Also check if there is a 1080 or high res image
    if matches:
        # Pick the largest one
        best = max(matches, key=lambda x: int(x[1]) * int(x[2]))
        best_url = best[0].replace('\\\\\\/', '/').replace('\\/', '/').replace('\\u0026', '&')
        print(f'  Best for {name}: {best[1]}x{best[2]}')
        try:
            r = urllib.request.Request(best_url)
            with urllib.request.urlopen(r) as img_resp:
                b = img_resp.read()
                path = rf'c:\Users\Admin\OneDrive\Documents\Portfolio\public\thumbnails\{name}.jpg'
                with open(path, 'wb') as f:
                    f.write(b)
                print(f'  ✓ Saved {name}.jpg ({len(b)} bytes)')
        except Exception as e:
            print(f'  Failed: {e}')

