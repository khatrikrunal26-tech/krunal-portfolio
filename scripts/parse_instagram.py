import urllib.request
import re
import json
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

results = {}

for name, code, pid in reels:
    url = f'https://www.instagram.com/reel/{code}/embed/'
    print(f'Fetching {name} ({code})...')
    try:
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req, timeout=15) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            
            # Find display_url
            d_match = re.search(r'\\"display_url\\":\\"([^"\\]*(?:\\.[^"\\]*)*)\\"', html)
            if not d_match:
                d_match = re.search(r'"display_url":"([^"]+)"', html)

            # Find video_url
            v_match = re.search(r'\\"video_url\\":\\"([^"\\]*(?:\\.[^"\\]*)*)\\"', html)
            if not v_match:
                v_match = re.search(r'"video_url":"([^"]+)"', html)

            # Find caption
            c_match = re.search(r'\\"edge_media_to_caption\\":\{\\"edges\\":\[\{\\"node\\":\{\\"text\\":\\"([^"\\]*(?:\\.[^"\\]*)*)\\"', html)

            data = {'code': code, 'id': pid}

            if d_match:
                raw_d = d_match.group(1)
                clean_d = raw_d.encode('utf-8').decode('unicode_escape').replace('\\/', '/')
                data['display_url'] = clean_d
                print(f'  Found display_url')
                try:
                    thumb_req = urllib.request.Request(clean_d)
                    with urllib.request.urlopen(thumb_req, timeout=15) as tr:
                        thumb_bytes = tr.read()
                        thumb_path = os.path.join(out_dir, f'{name}.jpg')
                        with open(thumb_path, 'wb') as f:
                            f.write(thumb_bytes)
                        print(f'  ✓ Saved thumbnail ({len(thumb_bytes)} bytes) -> {name}.jpg')
                        data['thumbnail'] = f'/thumbnails/{name}.jpg'
                except Exception as e:
                    print(f'  x Failed to download thumb: {e}')

            if v_match:
                raw_v = v_match.group(1)
                clean_v = raw_v.encode('utf-8').decode('unicode_escape').replace('\\/', '/')
                data['video_url'] = clean_v
                print(f'  Found video_url')
                try:
                    v_req = urllib.request.Request(clean_v)
                    with urllib.request.urlopen(v_req, timeout=30) as vr:
                        v_bytes = vr.read()
                        v_path = os.path.join(video_dir, f'{name}.mp4')
                        with open(v_path, 'wb') as f:
                            f.write(v_bytes)
                        print(f'  ✓ Saved video ({len(v_bytes)} bytes) -> {name}.mp4')
                        data['local_video'] = f'/videos/{name}.mp4'
                except Exception as e:
                    print(f'  x Failed to download video: {e}')

            if c_match:
                raw_c = c_match.group(1)
                clean_c = raw_c.encode('utf-8').decode('unicode_escape')
                data['caption'] = clean_c
                print(f'  Caption: {clean_c[:60]}...')

            results[name] = data

    except Exception as e:
        print(f'Error fetching {name}: {e}')

with open(r'c:\Users\Admin\OneDrive\Documents\Portfolio\scripts\instagram_data.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, indent=2, ensure_ascii=False)

print('\nDone! Summary of parsed results:')
for k, v in results.items():
    print(k, 'local_video:', v.get('local_video'), 'thumbnail:', v.get('thumbnail'), 'caption:', v.get('caption', '')[:40])
