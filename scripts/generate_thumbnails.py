import os
import math
import random
from PIL import Image, ImageDraw, ImageFilter, ImageFont

os.makedirs('public/thumbnails', exist_ok=True)

# Helper to create radial gradient glow
def add_radial_glow(img, cx, cy, radius, color, max_alpha=180):
    glow = Image.new('RGBA', img.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(glow)
    steps = 40
    for r in range(radius, 0, -radius // steps):
        factor = (1.0 - (r / radius)) ** 2
        alpha = int(max_alpha * factor)
        draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(color[0], color[1], color[2], alpha))
    glow = glow.filter(ImageFilter.GaussianBlur(radius // 10))
    img.paste(Image.alpha_composite(img.convert('RGBA'), glow).convert('RGB'), (0, 0))

# Helper to draw subtle tech grid
def draw_tech_grid(draw, w, h, step=40, color=(255, 255, 255, 12)):
    for x in range(0, w, step):
        draw.line([(x, 0), (x, h)], fill=color, width=1)
    for y in range(0, h, step):
        draw.line([(0, y), (w, y)], fill=color, width=1)
    # Crosshairs at select intersections
    for x in range(step * 2, w, step * 4):
        for y in range(step * 2, h, step * 4):
            draw.line([(x - 4, y), (x + 4, y)], fill=(56, 189, 248, 60), width=1)
            draw.line([(x, y - 4), (x, y + 4)], fill=(56, 189, 248, 60), width=1)

# Helper to draw smooth bezier curves for motion design
def draw_bezier_curve(draw, p0, p1, p2, p3, steps=100, color=(56, 189, 248, 255), width=3):
    points = []
    for i in range(steps + 1):
        t = i / steps
        x = (1-t)**3 * p0[0] + 3*(1-t)**2*t * p1[0] + 3*(1-t)*t**2 * p2[0] + t**3 * p3[0]
        y = (1-t)**3 * p0[1] + 3*(1-t)**2*t * p1[1] + 3*(1-t)*t**2 * p2[1] + t**3 * p3[1]
        points.append((x, y))
    for i in range(len(points) - 1):
        draw.line([points[i], points[i+1]], fill=color, width=width)

# ─────────────────────────────────────────────────────────────
# 1. DEEPSEEK HARNESS — MINIMAL MOTION DESIGN (1280x720)
# ─────────────────────────────────────────────────────────────
def gen_deepseek():
    w, h = 1280, 720
    img = Image.new('RGB', (w, h), (4, 7, 11))
    add_radial_glow(img, 640, 360, 450, (14, 165, 233), 85)
    add_radial_glow(img, 450, 300, 300, (99, 102, 241), 70)
    
    rgba = img.convert('RGBA')
    overlay = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    
    draw_tech_grid(d, w, h, step=48, color=(255, 255, 255, 14))
    
    # Elegant flowing harness motion waves
    for i in range(12):
        offset = i * 22
        alpha = int(180 - i * 12)
        color = (56, 189, 248, max(20, alpha))
        draw_bezier_curve(d, (80, 520 - offset), (380, 160 - offset), (820, 560 + offset), (1200, 240 + offset), color=color, width=2)
    
    # Center Minimal UI Harness Node
    cx, cy = 640, 360
    d.ellipse([cx - 85, cy - 85, cx + 85, cy + 85], outline=(56, 189, 248, 160), width=2)
    d.ellipse([cx - 70, cy - 70, cx + 70, cy + 70], fill=(15, 23, 42, 210), outline=(255, 255, 255, 60), width=1)
    
    # Diamond / Core shape
    pts = [(cx, cy - 42), (cx + 42, cy), (cx, cy + 42), (cx - 42, cy)]
    d.polygon(pts, fill=(56, 189, 248, 220))
    
    # Pulse rings & connection lines
    d.line([(200, cy), (cx - 85, cy)], fill=(56, 189, 248, 100), width=1)
    d.line([(cx + 85, cy), (1080, cy)], fill=(56, 189, 248, 100), width=1)
    
    # Text Badges
    d.rectangle([cx - 180, 560, cx + 180, 595], fill=(4, 7, 11, 220), outline=(56, 189, 248, 100), width=1)
    d.text((cx - 160, 568), "DEEPSEEK HARNESS · MINIMAL MOTION", fill=(255, 255, 255, 240))
    
    d.rectangle([60, 50, 220, 80], fill=(255, 255, 255, 15), outline=(255, 255, 255, 40))
    d.text((75, 58), "60 FPS · VECTOR RENDER", fill=(56, 189, 248, 220))
    
    final_img = Image.alpha_composite(rgba, overlay).convert('RGB')
    final_img.save('public/thumbnails/deepseek-harness.jpg', 'JPEG', quality=95)
    print("Generated deepseek-harness.jpg")

# ─────────────────────────────────────────────────────────────
# 2. GROK — MINIMAL MOTION DESIGN (1280x720)
# ─────────────────────────────────────────────────────────────
def gen_grok():
    w, h = 1280, 720
    img = Image.new('RGB', (w, h), (3, 5, 8))
    # Ambient multi-tone aura (purple + cyan + amber) inspired by reference centerpiece
    add_radial_glow(img, 640, 360, 480, (168, 85, 247), 90)
    add_radial_glow(img, 720, 320, 350, (245, 158, 11), 70)
    add_radial_glow(img, 560, 400, 380, (56, 189, 248), 85)
    
    rgba = img.convert('RGBA')
    overlay = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    
    draw_tech_grid(d, w, h, step=52, color=(255, 255, 255, 12))
    
    cx, cy = 640, 360
    # Grok Faceted Asterisk Prism Centerpiece
    arms = 6
    for i in range(arms):
        angle = i * (math.pi * 2 / arms)
        for offset, color in [(-0.15, (168, 85, 247, 220)), (0, (255, 255, 255, 240)), (0.15, (56, 189, 248, 220))]:
            a = angle + offset
            x_end = cx + math.cos(a) * 160
            y_end = cy + math.sin(a) * 160
            x_mid1 = cx + math.cos(a - 0.25) * 60
            y_mid1 = cy + math.sin(a - 0.25) * 60
            x_mid2 = cx + math.cos(a + 0.25) * 60
            y_mid2 = cy + math.sin(a + 0.25) * 60
            d.polygon([(cx, cy), (x_mid1, y_mid1), (x_end, y_end), (x_mid2, y_mid2)], fill=color)
    
    # Outer velocity trails
    for r in [200, 240, 280]:
        d.ellipse([cx - r, cy - r, cx + r, cy + r], outline=(255, 255, 255, 25), width=1)
    
    # Monochromatic text pill
    d.rectangle([cx - 150, 560, cx + 150, 595], fill=(3, 5, 8, 230), outline=(255, 255, 255, 60), width=1)
    d.text((cx - 130, 568), "GROK · MINIMAL MOTION SYSTEM", fill=(255, 255, 255, 240))
    
    d.rectangle([60, 50, 240, 80], fill=(255, 255, 255, 15), outline=(255, 255, 255, 40))
    d.text((75, 58), "BEZIER ACCELERATION · 60FPS", fill=(255, 255, 255, 220))
    
    final_img = Image.alpha_composite(rgba, overlay).convert('RGB')
    final_img.save('public/thumbnails/grok-motion.jpg', 'JPEG', quality=95)
    print("Generated grok-motion.jpg")

# ─────────────────────────────────────────────────────────────
# 3. GOOGLE DRIVE — MINIMAL MOTION DESIGN (1280x720)
# ─────────────────────────────────────────────────────────────
def gen_google_drive():
    w, h = 1280, 720
    img = Image.new('RGB', (w, h), (4, 7, 12))
    # 3-color glow: Yellow, Blue, Green (Google Drive brand palette)
    add_radial_glow(img, 640, 240, 360, (234, 179, 8), 85)   # Amber/Yellow top
    add_radial_glow(img, 760, 460, 360, (37, 99, 235), 85)   # Blue right
    add_radial_glow(img, 520, 460, 360, (34, 197, 94), 85)   # Green left
    
    rgba = img.convert('RGBA')
    overlay = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    
    draw_tech_grid(d, w, h, step=48, color=(255, 255, 255, 12))
    
    cx, cy = 640, 350
    # Isometric 3D Google Drive Triangle Loop
    # Top bar (Yellow)
    p_top = (cx, cy - 140)
    p_right = (cx + 150, cy + 90)
    p_left = (cx - 150, cy + 90)
    
    # Draw broad glowing ribbon segments
    # Yellow segment (top to right)
    d.polygon([(p_top[0] - 25, p_top[1]), (p_top[0] + 55, p_top[1] + 35), (cx + 80, cy + 10), (cx + 15, cy - 50)], fill=(250, 204, 21, 230))
    # Blue segment (right to bottom-left)
    d.polygon([(p_right[0], p_right[1] - 40), (p_right[0] - 25, p_right[1] + 25), (cx - 40, cy + 90), (cx + 20, cy + 40)], fill=(59, 130, 246, 230))
    # Green segment (bottom-left to top)
    d.polygon([(p_left[0] + 25, p_left[1] + 25), (p_left[0] - 20, p_left[1] - 30), (p_top[0] - 50, p_top[1] + 40), (cx - 15, cy + 20)], fill=(34, 197, 94, 230))
    
    # Highlight lines
    d.line([p_top, p_right, p_left, p_top], fill=(255, 255, 255, 160), width=2)
    
    # Text Pill
    d.rectangle([cx - 180, 560, cx + 180, 595], fill=(4, 7, 12, 230), outline=(56, 189, 248, 80), width=1)
    d.text((cx - 160, 568), "GOOGLE DRIVE · KINETIC GEOMETRY", fill=(255, 255, 255, 240))
    
    d.rectangle([60, 50, 240, 80], fill=(255, 255, 255, 15), outline=(255, 255, 255, 40))
    d.text((75, 58), "MOTION DESIGN · 4K 60FPS", fill=(250, 204, 21, 220))
    
    final_img = Image.alpha_composite(rgba, overlay).convert('RGB')
    final_img.save('public/thumbnails/google-drive-motion.jpg', 'JPEG', quality=95)
    print("Generated google-drive-motion.jpg")

# ─────────────────────────────────────────────────────────────
# 4. TALKING HEAD 1 — HIGH-RETENTION EDIT (1280x720)
# ─────────────────────────────────────────────────────────────
def gen_talking_head_1():
    w, h = 1280, 720
    img = Image.new('RGB', (w, h), (8, 12, 20))
    
    # Studio lighting: Teal back-rim left, warm amber rim right
    add_radial_glow(img, 380, 360, 450, (14, 165, 233), 110)
    add_radial_glow(img, 900, 360, 450, (249, 115, 22), 85)
    
    rgba = img.convert('RGBA')
    overlay = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    
    # Studio acoustic background slats
    for x in range(100, 1180, 64):
        d.line([(x, 0), (x, h)], fill=(255, 255, 255, 10), width=2)
    
    # Silhouette of professional creator with studio headset/mic
    cx, cy = 640, 380
    # Head & Shoulders Silhouette with Rim Light
    d.ellipse([cx - 100, cy - 200, cx + 100, cy], fill=(15, 23, 42, 250), outline=(56, 189, 248, 140), width=3)
    d.polygon([(cx - 240, h), (cx - 180, cy - 40), (cx + 180, cy - 40), (cx + 240, h)], fill=(15, 23, 42, 250))
    # Warm amber rim on right shoulder
    d.line([(cx + 100, cy - 40), (cx + 240, h)], fill=(249, 115, 22, 180), width=4)
    # Teal rim on left shoulder
    d.line([(cx - 100, cy - 40), (cx - 240, h)], fill=(56, 189, 248, 180), width=4)
    
    # Shure SM7B Studio Mic Silhouette in foreground
    d.rectangle([cx + 110, cy - 80, cx + 170, cy + 20], fill=(2, 6, 23, 255), outline=(255, 255, 255, 80), width=2)
    d.line([(cx + 140, cy + 20), (cx + 140, h)], fill=(2, 6, 23, 255), width=12)
    
    # Dynamic Viral Subtitle Box ("THE 3-SECOND HOOK")
    sub_w, sub_h = 420, 65
    sub_x, sub_y = cx - sub_w // 2, 490
    d.rectangle([sub_x, sub_y, sub_x + sub_w, sub_y + sub_h], fill=(0, 0, 0, 230), outline=(250, 204, 21, 200), width=2)
    d.text((sub_x + 35, sub_y + 18), "THE 3-SECOND HOOK", fill=(250, 204, 21, 255))
    d.text((sub_x + 230, sub_y + 18), "· 94% RETENTION", fill=(255, 255, 255, 240))
    
    # Soundwave bars at bottom
    for i in range(32):
        bx = 200 + i * 28
        bar_h = random.choice([16, 28, 48, 64, 32, 20])
        d.line([(bx, 660 - bar_h // 2), (bx, 660 + bar_h // 2)], fill=(56, 189, 248, 180), width=3)
    
    # Top badge
    d.rectangle([60, 50, 280, 80], fill=(255, 255, 255, 15), outline=(56, 189, 248, 60))
    d.text((75, 58), "TALKING HEAD · DYNAMIC PACING", fill=(56, 189, 248, 220))
    
    final_img = Image.alpha_composite(rgba, overlay).convert('RGB')
    final_img.save('public/thumbnails/talking-head-1.jpg', 'JPEG', quality=95)
    print("Generated talking-head-1.jpg")

# ─────────────────────────────────────────────────────────────
# 5. TALKING HEAD 2 — DYNAMIC PACING 02 (720x1280, 9:16 VERTICAL)
# ─────────────────────────────────────────────────────────────
def gen_talking_head_2():
    w, h = 720, 1280
    img = Image.new('RGB', (w, h), (6, 9, 15))
    
    # Atmospheric vertical mobile backlight (Cyan + Violet)
    add_radial_glow(img, 360, 560, 450, (56, 189, 248), 120)
    add_radial_glow(img, 360, 380, 380, (168, 85, 247), 90)
    
    rgba = img.convert('RGBA')
    overlay = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    
    cx, cy = 360, 600
    # Upper-body creator silhouette in studio
    d.ellipse([cx - 110, cy - 250, cx + 110, cy - 30], fill=(15, 23, 42, 250), outline=(56, 189, 248, 160), width=3)
    d.polygon([(cx - 280, h), (cx - 190, cy - 50), (cx + 190, cy - 50), (cx + 280, h)], fill=(15, 23, 42, 250))
    
    # Kinetic glowing cyan/purple edge highlights
    d.line([(cx - 190, cy - 50), (cx - 280, h)], fill=(56, 189, 248, 200), width=4)
    d.line([(cx + 190, cy - 50), (cx + 280, h)], fill=(168, 85, 247, 200), width=4)
    
    # Studio mic positioned near speaker
    d.rectangle([cx - 180, cy - 100, cx - 120, cy], fill=(2, 6, 23, 255), outline=(255, 255, 255, 100), width=2)
    d.line([(cx - 150, cy), (cx - 150, h)], fill=(2, 6, 23, 255), width=10)
    
    # Viral 9:16 Kinetic Subtitle Box ("STOP SCROLLING!")
    sub_w, sub_h = 440, 75
    sub_x, sub_y = cx - sub_w // 2, 740
    d.rectangle([sub_x, sub_y, sub_x + sub_w, sub_y + sub_h], fill=(0, 0, 0, 240), outline=(250, 204, 21, 230), width=3)
    d.text((sub_x + 35, sub_y + 24), "STOP SCROLLING!", fill=(250, 204, 21, 255))
    d.text((sub_x + 230, sub_y + 24), "· WATCH THIS", fill=(255, 255, 255, 240))
    
    # Sub-caption
    d.rectangle([sub_x + 20, sub_y + 90, sub_x + sub_w - 20, sub_y + 135], fill=(15, 23, 42, 210), outline=(56, 189, 248, 80))
    d.text((sub_x + 40, sub_y + 102), "RETENTION OPTIMIZED · AFTER MOTION", fill=(56, 189, 248, 220))
    
    # Mobile HUD overlays
    d.rectangle([50, 60, 200, 95], fill=(255, 255, 255, 15), outline=(255, 255, 255, 40))
    d.text((65, 72), "9:16 VERTICAL REEL", fill=(255, 255, 255, 220))
    
    d.rectangle([w - 180, 60, w - 50, 95], fill=(239, 68, 68, 40), outline=(239, 68, 68, 120))
    d.text((w - 155, 72), "● 4K 60FPS", fill=(239, 68, 68, 240))
    
    final_img = Image.alpha_composite(rgba, overlay).convert('RGB')
    final_img.save('public/thumbnails/talking-head-2.jpg', 'JPEG', quality=95)
    print("Generated talking-head-2.jpg")

if __name__ == '__main__':
    gen_deepseek()
    gen_grok()
    gen_google_drive()
    gen_talking_head_1()
    gen_talking_head_2()
    print("All 5 thumbnails successfully generated!")

