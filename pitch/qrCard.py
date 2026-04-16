# PandoCore Lock Screen QR Card Generator
# Creates a professional lock screen wallpaper with LinkedIn QR code
# Aligned with PandoCore brand guidelines

from PIL import Image, ImageDraw, ImageFont
import os

# === PandoCore Brand Colors ===
BLACK_FOREST = (0, 39, 7)       # #002707 - Primary dark green
FLORAL_WHITE = (247, 244, 235)  # #F7F4EB - Background color
AMBER_HONEY = (223, 159, 21)    # #DF9F15 - Accent color
COFFEE_BEAN = (31, 17, 2)       # #1F1102 - Text color
AZURE_MIST = (225, 240, 244)    # #E1F0F4 - Secondary accent

# === Configuration ===
# Expand ~ to full home directory path
QR_PATH = os.path.expanduser("~/Desktop/LinkedInQR.png")
OUTPUT_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_PATH = os.path.join(OUTPUT_DIR, "eliot_lock_screen_qr.png")

# iPhone 14 Pro Max dimensions (can be adjusted for other devices)
WIDTH = 1170
HEIGHT = 2532

# === Content ===
NAME = "Eliot Ferstl"
TITLE = "Founder @ PandoCore"
TAGLINE = "Autonomous Runtime Security"

def load_font(size, bold=False):
    """Load Inter font with fallbacks for macOS/Linux/Windows"""
    font_paths = [
        # macOS system fonts
        "/System/Library/Fonts/SFProText-Bold.otf" if bold else "/System/Library/Fonts/SFProText-Regular.otf",
        "/System/Library/Fonts/Helvetica.ttc",
        # Common macOS font locations
        "/Library/Fonts/Arial Bold.ttf" if bold else "/Library/Fonts/Arial.ttf",
        # Linux fonts
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
        # Windows fonts
        "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf",
    ]
    
    for path in font_paths:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except:
                continue
    
    # Ultimate fallback
    return ImageFont.load_default()

def center_text(draw, text, y, font, color, width):
    """Draw centered text at the specified y position"""
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    x = (width - text_width) // 2
    draw.text((x, y), text, fill=color, font=font)
    return bbox[3] - bbox[1]  # Return text height

def draw_accent_line(draw, y, width, color, line_width=4, line_length=200):
    """Draw a centered horizontal accent line"""
    x_start = (width - line_length) // 2
    x_end = x_start + line_length
    draw.rectangle([x_start, y, x_end, y + line_width], fill=color)

def main():
    # Check if QR code exists
    if not os.path.exists(QR_PATH):
        print(f"Error: QR code not found at {QR_PATH}")
        print("Please ensure LinkedInQR.png is on your Desktop")
        return
    
    # Load QR code
    qr = Image.open(QR_PATH).convert("RGBA")
    
    # Create background with floral white
    bg = Image.new("RGBA", (WIDTH, HEIGHT), FLORAL_WHITE + (255,))
    draw = ImageDraw.Draw(bg)
    
    # === Load Fonts ===
    name_font = load_font(120, bold=True)
    title_font = load_font(56, bold=False)
    tagline_font = load_font(36, bold=False)
    
    # === Layout Calculations ===
    # Leave space at top for clock (iOS status bar area)
    content_start_y = 380
    
    # Draw accent line above name
    draw_accent_line(draw, content_start_y - 40, WIDTH, AMBER_HONEY, line_width=6, line_length=100)
    
    # Draw name
    name_y = content_start_y
    name_height = center_text(draw, NAME, name_y, name_font, BLACK_FOREST, WIDTH)
    
    # Draw title
    title_y = name_y + name_height + 20
    title_height = center_text(draw, TITLE, title_y, title_font, COFFEE_BEAN, WIDTH)
    
    # Draw tagline with amber honey color
    tagline_y = title_y + title_height + 16
    center_text(draw, TAGLINE, tagline_y, tagline_font, AMBER_HONEY, WIDTH)
    
    # Draw accent line below tagline
    draw_accent_line(draw, tagline_y + 60, WIDTH, AMBER_HONEY, line_width=6, line_length=100)
    
    # === QR Code Section ===
    qr_size = 780
    qr = qr.resize((qr_size, qr_size), Image.Resampling.LANCZOS)
    
    # Position QR code in the middle-lower area
    qr_y = 850
    qr_x = (WIDTH - qr_size) // 2
    
    # Add subtle border/shadow effect around QR code
    border_padding = 20
    border_rect = [
        qr_x - border_padding,
        qr_y - border_padding,
        qr_x + qr_size + border_padding,
        qr_y + qr_size + border_padding
    ]
    
    # Draw white background for QR (ensures visibility)
    draw.rectangle(border_rect, fill=(255, 255, 255, 255))
    
    # Draw subtle border
    draw.rectangle(border_rect, outline=BLACK_FOREST + (50,), width=2)
    
    # Paste QR code
    bg.paste(qr, (qr_x, qr_y), qr if qr.mode == 'RGBA' else None)
    
    # === Call to Action ===
    cta_y = qr_y + qr_size + 60
    cta_font = load_font(32, bold=False)
    center_text(draw, "Scan to connect on LinkedIn", cta_y, cta_font, COFFEE_BEAN, WIDTH)
    
    # === Bottom branding ===
    # Small PandoCore text at bottom (above swipe area)
    bottom_y = HEIGHT - 280
    brand_font = load_font(28, bold=True)
    center_text(draw, "PANDOCORE", bottom_y, brand_font, BLACK_FOREST + (128,), WIDTH)
    
    # === Save ===
    bg.save(OUTPUT_PATH)
    print(f"✓ Lock screen wallpaper saved to: {OUTPUT_PATH}")
    print(f"  Dimensions: {WIDTH}x{HEIGHT}")
    print(f"  Transfer to your iPhone and set as lock screen wallpaper")

if __name__ == "__main__":
    main()
