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

def draw_wave_function(ax, x, y, size=2.0, collapsed=False):
    """
    Draw a wave function visualization (like Copenhagen interpretation).
    For uncollapsed: bell curve / probability distribution
    For collapsed: sharp spike (measurement result)
    """
    # 3D-style base plane (perspective quad)
    plane_w = size * 1.6
    plane_d = size * 1.0  # depth
    plane_h = 0.05  # thickness
    
    # Base vertices for pseudo-3D plane
    base_left = x - plane_w/2
    base_right = x + plane_w/2
    base_front = y - plane_d/2
    base_back = y + plane_d/4
    
    # Perspective offset
    persp = plane_d * 0.4
    
    # Draw base plane (gray floor)
    plane = np.array([
        [base_left, base_front],
        [base_right, base_front],
        [base_right + persp*0.5, base_back],
        [base_left + persp*0.5, base_back]
    ])
    ax.add_patch(Polygon(plane, closed=True, facecolor="#D0D0D0", 
                         edgecolor=COFFEE_BEAN, linewidth=1.5, alpha=0.7))
    
    # Draw Y-axis (vertical)
    axis_height = size * 1.4
    ax.plot([base_left, base_left], [base_front, base_front + axis_height], 
            color=COFFEE_BEAN, linewidth=1.5)
    ax.add_patch(FancyArrowPatch((base_left, base_front + axis_height - 0.1), 
                                 (base_left, base_front + axis_height + 0.2),
                                 arrowstyle='-|>', mutation_scale=10,
                                 linewidth=1.5, color=COFFEE_BEAN))
    
    # Draw X-axis (horizontal, front edge)
    ax.plot([base_left, base_right], [base_front, base_front], 
            color=COFFEE_BEAN, linewidth=1.5)
    ax.add_patch(FancyArrowPatch((base_right - 0.1, base_front), 
                                 (base_right + 0.2, base_front),
                                 arrowstyle='-|>', mutation_scale=10,
                                 linewidth=1.5, color=COFFEE_BEAN))
    
    # Generate wave function curve
    center_x = x
    center_y = base_front + plane_d * 0.15
    
    if not collapsed:
        # Bell curve / probability distribution
        t = np.linspace(-1.5, 1.5, 100)
        wave_x = center_x + t * (plane_w/3)
        # Gaussian curve
        wave_height = np.exp(-t**2 * 1.5) * (axis_height * 0.7)
        wave_y = center_y + wave_height
        
        # Draw filled bell curve with gradient effect
        # Create polygon for filled area
        fill_x = np.concatenate([[wave_x[0]], wave_x, [wave_x[-1]]])
        fill_y = np.concatenate([[center_y], wave_y, [center_y]])
        fill_pts = np.column_stack([fill_x, fill_y])
        ax.add_patch(Polygon(fill_pts, closed=True, facecolor="#E8E4DB", 
                             edgecolor=COFFEE_BEAN, linewidth=2, alpha=0.9))
        
        # Add some depth lines
        for i in range(3):
            offset = (i + 1) * plane_d * 0.06
            depth_t = np.linspace(-1.2 + i*0.3, 1.2 - i*0.3, 50)
            depth_x = center_x + depth_t * (plane_w/3) + offset*0.3
            depth_height = np.exp(-depth_t**2 * 1.5) * (axis_height * 0.65 - i*0.15)
            depth_y = center_y + offset + depth_height
            ax.plot(depth_x, depth_y, color=COFFEE_BEAN, linewidth=0.8, alpha=0.4-i*0.1)
        
        # Label
        ax.text(base_left - 0.2, center_y + axis_height * 0.5, "Wave\nFunction",
                ha="right", va="center", fontsize=14, color=COFFEE_BEAN, 
                fontweight="bold", fontname=FONT_FAMILY)
        ax.text(base_left - 0.2, center_y + axis_height * 0.2, "ψ",
                ha="right", va="center", fontsize=18, color=COFFEE_BEAN, 
                fontweight="bold", fontname=FONT_FAMILY, style='italic')
    else:
        # Collapsed state - sharp spike
        spike_x = center_x + plane_w * 0.05
        spike_base_width = plane_w * 0.08
        spike_height = axis_height * 0.75
        
        # Draw spike as triangle
        spike = np.array([
            [spike_x - spike_base_width/2, center_y],
            [spike_x, center_y + spike_height],
            [spike_x + spike_base_width/2, center_y]
        ])
        ax.add_patch(Polygon(spike, closed=True, facecolor="#E8E4DB", 
                             edgecolor=COFFEE_BEAN, linewidth=2, alpha=0.9))
        
        # Convergence arrows pointing to the spike
        arrow_y = center_y + spike_height * 0.4
        ax.add_patch(FancyArrowPatch((spike_x - plane_w*0.35, arrow_y), 
                                     (spike_x - spike_base_width*0.8, arrow_y),
                                     arrowstyle='-|>', mutation_scale=10,
                                     linewidth=1.5, color=COFFEE_BEAN))
        ax.add_patch(FancyArrowPatch((spike_x + plane_w*0.35, arrow_y), 
                                     (spike_x + spike_base_width*0.8, arrow_y),
                                     arrowstyle='-|>', mutation_scale=10,
                                     linewidth=1.5, color=COFFEE_BEAN))
        
        # Label
        ax.text(spike_x + plane_w*0.4, center_y + spike_height + 0.2, 
                'wave function "collapse"',
                ha="center", va="bottom", fontsize=12, color=COFFEE_BEAN, 
                fontname=FONT_FAMILY, style='italic')
    
    # Axis labels
    ax.text(center_x, base_front - 0.4, "Position in Space",
            ha="center", va="top", fontsize=12, color=COFFEE_BEAN, 
            fontname=FONT_FAMILY)
    ax.text(base_right + 0.15, base_front - 0.15, "X",
            ha="left", va="top", fontsize=12, color=COFFEE_BEAN, 
            fontweight="bold", fontname=FONT_FAMILY)
    ax.text(base_left - 0.1, base_front + axis_height + 0.25, "Y",
            ha="right", va="bottom", fontsize=12, color=COFFEE_BEAN, 
            fontweight="bold", fontname=FONT_FAMILY)

def draw_multi_path_boxes(ax, x, y, width=2.0, height=1.2, n_rows=3, n_cols=4):
    """
    Draw multiple small boxes representing multi-path ephemeral execution.
    Creates a grid of small interconnected boxes to visualize parallel/superposition paths.
    """
    box_w = width / (n_cols + 0.5)  # width of each small box
    box_h = height / (n_rows + 0.5)  # height of each small box
    gap_x = box_w * 0.15
    gap_y = box_h * 0.15
    
    start_x = x - width/2 + box_w/2
    start_y = y - height/2 + box_h/2
    
    # Draw the small boxes
    for row in range(n_rows):
        for col in range(n_cols):
            bx = start_x + col * (box_w + gap_x)
            by = start_y + row * (box_h + gap_y)
            
            # Small isometric-style box (simplified)
            rect = Rectangle((bx - box_w/2, by - box_h/2), box_w, box_h,
                            facecolor="#E8E4DB", edgecolor=COFFEE_BEAN, 
                            linewidth=1.0, alpha=0.85)
            ax.add_patch(rect)
            
            # Add subtle 3D effect (top and side)
            offset = box_w * 0.15
            # Top face
            top = np.array([
                [bx - box_w/2, by + box_h/2],
                [bx + box_w/2, by + box_h/2],
                [bx + box_w/2 + offset, by + box_h/2 + offset*0.6],
                [bx - box_w/2 + offset, by + box_h/2 + offset*0.6]
            ])
            ax.add_patch(Polygon(top, closed=True, facecolor="#F0EDE5", 
                                edgecolor=COFFEE_BEAN, linewidth=0.8, alpha=0.7))
            # Side face
            side = np.array([
                [bx + box_w/2, by - box_h/2],
                [bx + box_w/2, by + box_h/2],
                [bx + box_w/2 + offset, by + box_h/2 + offset*0.6],
                [bx + box_w/2 + offset, by - box_h/2 + offset*0.6]
            ])
            ax.add_patch(Polygon(side, closed=True, facecolor="#DDD9D0", 
                                edgecolor=COFFEE_BEAN, linewidth=0.8, alpha=0.7))
    
    # Draw some connecting lines between boxes to show paths
    for row in range(n_rows):
        for col in range(n_cols - 1):
            bx1 = start_x + col * (box_w + gap_x) + box_w/2
            bx2 = start_x + (col + 1) * (box_w + gap_x) - box_w/2
            by = start_y + row * (box_h + gap_y)
            ax.plot([bx1, bx2], [by, by], color=AMBER_HONEY, linewidth=1.0, alpha=0.5)

def slide4():
    fig, ax = setup_ax()
    # No vignette - clean background

    # Title (lowered to align with other slides)
    ax.text(W/2, 7.8, "The Breakthrough: Software Impermanence",
            ha="center", va="center", fontsize=36, color=BLACK_FOREST, fontweight="bold",
            fontname=FONT_FAMILY)

    # ===== TOP PATH: Current Execution Tool =====
    top_y = 5.6  # Upper path Y position
    
    # Left: Single cube (unobserved) - Current tool
    draw_cube(ax, 3.5, top_y, s=0.9)
    ax.text(3.5, top_y - 1.0, "Current Execution Tool", ha="center", va="center",
            fontsize=16, color=COFFEE_BEAN, fontweight="bold", fontname=FONT_FAMILY)
    ax.text(3.5, top_y, "Single\nPath", ha="center", va="center", fontsize=11,
            color=COFFEE_BEAN, fontname=FONT_FAMILY)

    # ===== BOTTOM PATH: Future Superposition Execution Tool =====
    bottom_y = 2.8  # Lower path Y position
    
    # Left: Multiple small boxes representing multi-path execution
    draw_multi_path_boxes(ax, 3.5, bottom_y, width=2.4, height=1.4, n_rows=3, n_cols=4)
    ax.text(3.5, bottom_y - 1.3, "Future Superposition\nExecution Tool", ha="center", va="center",
            fontsize=16, color=COFFEE_BEAN, fontweight="bold", fontname=FONT_FAMILY)

    # ===== CENTER: Eye symbol for observation =====
    eye_x = 8.0
    eye_y = 4.2  # Centered between the two paths
    draw_eye(ax, eye_x, eye_y, size=0.7)
    ax.text(eye_x, eye_y + 1.4, "Observation", ha="center", va="bottom",
            fontsize=20, color=COFFEE_BEAN, fontweight="bold", fontname=FONT_FAMILY)
    
    # Vertical dashed lines around the eye to emphasize barrier/threshold
    ax.plot([eye_x - 1.2, eye_x - 1.2], [1.3, 6.6], color=AMBER_HONEY, 
            linewidth=2, linestyle='--', alpha=0.6)
    ax.plot([eye_x + 1.2, eye_x + 1.2], [1.3, 6.6], color=AMBER_HONEY, 
            linewidth=2, linestyle='--', alpha=0.6)

    # ===== ARROWS: Both paths converge through observation =====
    # Top path arrow
    ax.add_patch(FancyArrowPatch((4.6, top_y), (6.7, eye_y + 0.3),
                                 arrowstyle='-|>', mutation_scale=14,
                                 linewidth=2, color=AMBER_HONEY, alpha=0.9,
                                 connectionstyle="arc3,rad=-0.15"))
    
    # Bottom path arrow
    ax.add_patch(FancyArrowPatch((4.8, bottom_y), (6.7, eye_y - 0.3),
                                 arrowstyle='-|>', mutation_scale=14,
                                 linewidth=2, color=AMBER_HONEY, alpha=0.9,
                                 connectionstyle="arc3,rad=0.15"))
    
    # Arrow from observation to compromised state
    ax.add_patch(FancyArrowPatch((9.3, eye_y), (10.5, eye_y),
                                 arrowstyle='-|>', mutation_scale=16,
                                 linewidth=2.5, color=AMBER_HONEY, alpha=0.9))

    # ===== RIGHT: "dissolved" particles (compromised state) =====
    rng = np.random.default_rng(7)
    n = 1400
    xs = rng.normal(12.8, 0.7, n)
    ys = rng.normal(eye_y, 0.5, n)
    # fade rightward
    alphas = np.clip(1.1 - (xs - 10.5)/3.0, 0.0, 0.55)
    ax.scatter(xs, ys, s=8, c=COFFEE_BEAN, alpha=alphas, linewidths=0)

    ax.text(12.8, eye_y - 1.8, "Compromised State", ha="center", va="center",
            fontsize=20, color=COFFEE_BEAN, fontweight="bold", fontname=FONT_FAMILY)

    # Bottom quote box (narrower)
    draw_quote_box(ax, W/2, 0.6, "Observation deletes logic", 
                   width=5.5, height=0.7)

    fig.savefig("slide4_breakthrough.png", transparent=False)
    plt.close(fig)

def slide5():
    fig, ax = setup_ax()
    # No vignette - clean background

    # Title
    ax.text(W/2, 7.8, "Superposition Execution: Self-Protecting Software",
            ha="center", va="center", fontsize=36, color=BLACK_FOREST, fontweight="bold",
            fontname=FONT_FAMILY)

    # Bullet points
    bullet_x = 1.0
    bullet_y = 6.8
    ax.text(bullet_x, bullet_y, "•", ha="left", va="center", fontsize=20,
            color=AMBER_HONEY, fontweight="bold", fontname=FONT_FAMILY)
    ax.text(bullet_x + 0.5, bullet_y, "Workloads exist in entropy-bound Kubernetes(K8s) pods that self-delete under attack",
            ha="left", va="center", fontsize=18, color=COFFEE_BEAN, fontname=FONT_FAMILY)
    
    ax.text(bullet_x, bullet_y - 0.6, "•", ha="left", va="center", fontsize=20,
            color=AMBER_HONEY, fontweight="bold", fontname=FONT_FAMILY)
    ax.text(bullet_x + 0.5, bullet_y - 0.6, "Delivers secure execution with near-native performance",
            ha="left", va="center", fontsize=18, color=COFFEE_BEAN, fontname=FONT_FAMILY)

    # Section title for the graphic
    ax.text(W/4 + 0.8, 5.3, "The Copenhagen Interpretation:",
            ha="center", va="center", fontsize=18, color=BLACK_FOREST, fontweight="bold",
            fontname=FONT_FAMILY)

    # Left wave function (uncollapsed - probability distribution) - moved closer to center
    draw_wave_function(ax, 5.0, 3.3, size=1.8, collapsed=False)
    
    # Measurement arrow in the center
    ax.add_patch(FancyArrowPatch((7.8, 4.0), (8.8, 4.0),
                                 arrowstyle='-|>', mutation_scale=18,
                                 linewidth=2.5, color=AMBER_HONEY))
    ax.text(8.3, 4.5, "Measurement", ha="center", va="bottom", fontsize=16,
            color=COFFEE_BEAN, fontweight="bold", fontname=FONT_FAMILY)

    # Right wave function (collapsed - spike) - moved closer to center
    draw_wave_function(ax, 11.2, 3.3, size=1.8, collapsed=True)

    # Bottom quote box - centered
    draw_quote_box(ax, W/2, 0.9, "Inspiration: Quantum Wave\nFunction Collapse", 
                   width=5.5, height=1.3)

    fig.savefig("slide5_superposition.png", transparent=False)
    plt.close(fig)

if __name__ == "__main__":
    slide3()
    slide4()
    slide5()
    print("Wrote: slide3_problem.png, slide4_breakthrough.png, slide5_superposition.png")
