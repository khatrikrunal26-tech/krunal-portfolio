import urllib.request
import os

url = 'https://www.instagram.com/reel/DcQ32bGM1eX/embed/'
req = urllib.request.Request(url)
with urllib.request.urlopen(req, timeout=15) as r:
    html = r.read().decode('utf-8', errors='ignore')

def extract_between(text, start_key, end_char):
    pos = text.find(start_key)
    if pos == -1:
        return None
    start = pos + len(start_key)
    # If starts with \" or "
    if text[start:start+2] == '\\"':
        start += 2
    elif text[start:start+1] == '"':
        start += 1
    end = text.find(end_char, start)
    if end == -1:
        return None
    val = text[start:end]
    # Clean up slashes
    val = val.replace('\\/', '/').replace('\\u0026', '&')
    return val

d_url = extract_between(html, 'display_url', '"')
v_url = extract_between(html, 'video_url', '"')

print('d_url:', d_url[:90] if d_url else None)
print('v_url:', v_url[:90] if v_url else None)

if d_url:
    req = urllib.request.Request(d_url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as r:
        b = r.read()
        with open(r'c:\Users\Admin\OneDrive\Documents\Portfolio\public\thumbnails\insta-3.jpg', 'wb') as f:
            f.write(b)
        print('Wrote insta-3.jpg:', len(b), 'bytes')

if v_url:
    req = urllib.request.Request(v_url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as r:
        b = r.read()
        with open(r'c:\Users\Admin\OneDrive\Documents\Portfolio\public\videos\insta-3.mp4', 'wb') as f:
            f.write(b)
        print('Wrote insta-3.mp4:', len(b), 'bytes')
