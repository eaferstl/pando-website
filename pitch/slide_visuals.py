# slide_visuals.py
# Generates two slide-style PNGs (16:9) inspired by your Slide 3 + Slide 4 concepts.

import numpy as np
import matplotlib.pyplot as plt
from matplotlib.patches import Polygon, FancyArrowPatch, Rectangle, Circle, Wedge

W, H = 16, 9  # aspect ratio units (not pixels)

# Brand Colors (from Pando website)
FLORAL_WHITE = "#F7F4EB"  # Background
BLACK_FOREST = "#002707"  # Titles
COFFEE_BEAN = "#1F1102"   # Body text
AMBER_HONEY = "#DF9F15"   # Accent color
AZURE_MIST = "#E1F0F4"    # Quote box background

# Font
FONT_FAMILY = "Arial"

def setup_ax():
    fig = plt.figure(figsize=(16, 9), dpi=200)  # high-res
    ax = plt.axes([0, 0, 1, 1])
    ax.set_xlim(0, W)
    ax.set_ylim(0, H)
    ax.axis("off")
    # Brand background color - clean, no vignette
    ax.add_patch(Rectangle((0, 0), W, H, facecolor=FLORAL_WHITE, edgecolor="none"))
    return fig, ax

def draw_cube(ax, x, y, s=1.2, face="#E8E4DB", edge=COFFEE_BEAN, alpha=1.0):
    """
    Closed isometric cube (container) using 3 visible faces.
    (x, y) is the center of the front face.
    """
    # front face
    fx0, fy0 = x - s, y - s*0.6
    fx1, fy1 = x + s, y + s*0.6
    front = np.array([[fx0, fy0], [fx1, fy0], [fx1, fy1], [fx0, fy1]])

    # side face (shift right-up) - drawn first so it's behind top
    sx, sy = 0.5*s, 0.5*s
    side = np.array([[fx1, fy0], [fx1, fy1], [fx1+sx, fy1+sy], [fx1+sx, fy0+sy]])

    # top face (closed lid) - connects front top edge to back
    dx, dy = 0.5*s, 0.5*s  # Same offset as side for proper alignment
    top = np.array([[fx0, fy1], [fx1, fy1], [fx1+dx, fy1+dy], [fx0+dx, fy1+dy]])

    # Draw in order: side first, then top, then front
    ax.add_patch(Polygon(side, closed=True, facecolor="#DDD9D0", edgecolor=edge, linewidth=1.5, alpha=alpha))
    ax.add_patch(Polygon(top,  closed=True, facecolor="#F0EDE5", edgecolor=edge, linewidth=1.5, alpha=alpha))
    ax.add_patch(Polygon(front,closed=True, facecolor=face,      edgecolor=edge, linewidth=1.5, alpha=alpha))

def draw_eye(ax, x, y, size=0.8):
    """Draw an eye symbol to represent observation."""
    # Outer eye shape (almond)
    eye_outer = Wedge((x, y), size, 0, 180, width=size*0.6, 
                       facecolor=AMBER_HONEY, edgecolor=COFFEE_BEAN, linewidth=2, alpha=0.9)
    eye_outer2 = Wedge((x, y), size, 180, 360, width=size*0.6, 
                        facecolor=AMBER_HONEY, edgecolor=COFFEE_BEAN, linewidth=2, alpha=0.9)
    ax.add_patch(eye_outer)
    ax.add_patch(eye_outer2)
    
    # Iris
    iris = Circle((x, y), size*0.4, facecolor=COFFEE_BEAN, edgecolor=COFFEE_BEAN, linewidth=1)
    ax.add_patch(iris)
    
    # Pupil
    pupil = Circle((x, y), size*0.15, facecolor=BLACK_FOREST, edgecolor="none")
    ax.add_patch(pupil)
    
    # Highlight
    highlight = Circle((x + size*0.1, y + size*0.1), size*0.08, facecolor="white", edgecolor="none", alpha=0.8)
    ax.add_patch(highlight)

def draw_quote_box(ax, x, y, text, width=10, height=1.0):
    """Draw a styled quote box with azure mist background and black forest outline."""
    # Box background
    box = Rectangle((x - width/2, y - height/2), width, height, 
                    facecolor=AZURE_MIST, edgecolor=BLACK_FOREST, 
                    linewidth=3, zorder=10)
    ax.add_patch(box)
    
    # Text inside box (fontsize=20, bold to match other text)
    ax.text(x, y, text, ha="center", va="center", fontsize=20,
            color=BLACK_FOREST, fontweight="bold", fontname=FONT_FAMILY, zorder=11)

def slide3():
    fig, ax = setup_ax()
    # No vignette - clean background

    # Title (lowered to align with other slides)
    ax.text(W/2, 7.8, "There is No Way to Compute Without Revealing Information",
            ha="center", va="center", fontsize=36, color=BLACK_FOREST, fontweight="bold",
            fontname=FONT_FAMILY)

    # Central cube + label (lowered to avoid OBSERVABLE overlapping title)
    cube_x, cube_y = W/2, 4.0
    cube_s = 1.25
    draw_cube(ax, cube_x, cube_y, s=cube_s)
    ax.text(cube_x, cube_y, "EXECUTION", ha="center", va="center", fontsize=20,
            color=COFFEE_BEAN, fontweight="bold", fontname=FONT_FAMILY)

    # Vectors - precisely positioned with equal distances
    # Arrow endpoints at cube edges, labels closer to arrows
    arrow_length = 2.5
    label_offset = 0.3  # Distance from arrow end to label (closer now)
    
    # OBSERVABLE - top arrow
    ax.add_patch(FancyArrowPatch((cube_x, cube_y + cube_s*0.6 + 0.1), 
                                 (cube_x, cube_y + cube_s*0.6 + 0.1 + arrow_length*0.5),
                                 arrowstyle='-|>', mutation_scale=14,
                                 linewidth=1.5, color=AMBER_HONEY, alpha=0.9))
    ax.text(cube_x, cube_y + cube_s*0.6 + 0.1 + arrow_length*0.5 + label_offset, 
            "OBSERVABLE", ha="center", va="bottom", fontsize=20,
            color=COFFEE_BEAN, fontweight="bold", fontname=FONT_FAMILY)

    # REPRODUCIBLE - left arrow
    ax.add_patch(FancyArrowPatch((cube_x - cube_s - 0.1, cube_y), 
                                 (cube_x - cube_s - 0.1 - arrow_length, cube_y),
                                 arrowstyle='-|>', mutation_scale=14,
                                 linewidth=1.5, color=AMBER_HONEY, alpha=0.9))
    ax.text(cube_x - cube_s - 0.1 - arrow_length - label_offset, cube_y, 
            "REPRODUCIBLE", ha="right", va="center", fontsize=20,
            color=COFFEE_BEAN, fontweight="bold", fontname=FONT_FAMILY)

    # MUTABLE - right arrow
    ax.add_patch(FancyArrowPatch((cube_x + cube_s + 0.1, cube_y), 
                                 (cube_x + cube_s + 0.1 + arrow_length, cube_y),
                                 arrowstyle='-|>', mutation_scale=14,
                                 linewidth=1.5, color=AMBER_HONEY, alpha=0.9))
    ax.text(cube_x + cube_s + 0.1 + arrow_length + label_offset, cube_y, 
            "MUTABLE", ha="left", va="center", fontsize=20,
            color=COFFEE_BEAN, fontweight="bold", fontname=FONT_FAMILY)

    # Bottom quote box (narrower)
    draw_quote_box(ax, W/2, 1.2, "Every modern system exposes execution at runtime", 
                   width=9.5, height=0.9)

    fig.savefig("slide3_problem.png", transparent=False)
    plt.close(fig)

def slide4():
    fig, ax = setup_ax()
    # No vignette - clean background

    # Title (lowered to align with other slides)
    ax.text(W/2, 7.8, "The Breakthrough: Software Impermanence",
            ha="center", va="center", fontsize=36, color=BLACK_FOREST, fontweight="bold",
            fontname=FONT_FAMILY)

    # Left: cube (unobserved)
    draw_cube(ax, 4.0, 4.4, s=1.15)
    ax.text(4.0, 2.8, "Unobserved Execution", ha="center", va="center",
            fontsize=20, color=COFFEE_BEAN, fontweight="bold", fontname=FONT_FAMILY)

    # Center: Eye symbol for observation (much more obvious)
    eye_x = 8.0
    eye_y = 4.4
    draw_eye(ax, eye_x, eye_y, size=0.7)
    ax.text(eye_x, 6.0, "Observation", ha="center", va="bottom",
            fontsize=20, color=COFFEE_BEAN, fontweight="bold", fontname=FONT_FAMILY)
    
    # Vertical dashed lines around the eye to emphasize barrier/threshold
    ax.plot([eye_x - 1.2, eye_x - 1.2], [2.6, 5.8], color=AMBER_HONEY, 
            linewidth=2, linestyle='--', alpha=0.6)
    ax.plot([eye_x + 1.2, eye_x + 1.2], [2.6, 5.8], color=AMBER_HONEY, 
            linewidth=2, linestyle='--', alpha=0.6)

    # Arrow through observation
    ax.add_patch(FancyArrowPatch((5.3, eye_y), (10.7, eye_y),
                                 arrowstyle='-|>', mutation_scale=16,
                                 linewidth=2, color=AMBER_HONEY, alpha=0.9))

    # Right: "dissolved" particles (simulate collapse)
    rng = np.random.default_rng(7)
    n = 1400
    xs = rng.normal(12.5, 0.7, n)
    ys = rng.normal(eye_y, 0.45, n)
    # fade rightward
    alphas = np.clip(1.1 - (xs - 10.5)/3.0, 0.0, 0.55)
    ax.scatter(xs, ys, s=8, c=COFFEE_BEAN, alpha=alphas, linewidths=0)

    ax.text(12.5, 2.8, "Compromised State", ha="center", va="center",
            fontsize=20, color=COFFEE_BEAN, fontweight="bold", fontname=FONT_FAMILY)

    # Bottom quote box (narrower)
    draw_quote_box(ax, W/2, 1.2, "Observation deletes logic", 
                   width=5.5, height=0.9)

    fig.savefig("slide4_breakthrough.png", transparent=False)
    plt.close(fig)

if __name__ == "__main__":
    slide3()
    slide4()
    print("Wrote: slide3_problem.png, slide4_breakthrough.png")
