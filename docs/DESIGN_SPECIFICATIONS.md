# Pando Website Design Specifications

## Overview
This document outlines the visual design, layout, and user experience requirements for the Pando website.

---

## Design Philosophy

### Core Principles
1. **Minimal and Clean**: Avoid clutter, focus on essential content
2. **Professional**: Establish credibility and trustworthiness
3. **Accessible**: Easy to navigate and understand
4. **Responsive**: Works seamlessly across all devices
5. **Fast**: Optimized for quick loading
6. **Purposeful**: Every element serves a clear function

---

## Visual Identity

### Color Palette

**Primary Colors (From Existing Branding):**
- **Sage Green**: `#6B8E7F` (approximate from logo)
  - Primary brand color
  - Use for: Headers, accents, navigation background
  - Conveys: Natural, trustworthy, stable
  
- **Cream/Off-White**: `#F5F0E8` (approximate from logo)
  - Secondary/background color
  - Use for: Main backgrounds, light sections, logo elements
  - Conveys: Clean, professional, approachable

- **Pastel Pink**: `#E8C5C1` (approximate from logo)
  - Accent color
  - Use for: CTAs, highlights, subtle accents
  - Conveys: Warm, innovative, distinctive

**Additional Recommended Colors:**
- **Dark Charcoal**: `#2C3333` 
  - For body text (better readability than pure black)
  
- **Light Gray**: `#F8F9FA`
  - Alternative background for section variation

**Usage Guidelines:**
- Sage Green: Primary brand presence, headers, nav
- Cream: Main backgrounds, creates calm atmosphere
- Pastel Pink: Strategic use for CTAs and important elements
- Dark Charcoal: All body text
- Maintain sufficient contrast for accessibility (4.5:1 ratio minimum)
- The natural, organic palette aligns with "Pando" (aspen grove) concept

### Typography

**Headings:**
- Font: Sans-serif, modern, highly readable
- Suggestions: Inter, Roboto, Open Sans, or similar
- Sizes:
  - H1: 2.5rem - 3rem (large displays), 2rem (mobile)
  - H2: 2rem - 2.5rem (large displays), 1.75rem (mobile)
  - H3: 1.5rem - 1.75rem (large displays), 1.25rem (mobile)

**Body Text:**
- Font: Same as headings or complementary sans-serif
- Size: 1rem (16px base)
- Line height: 1.6-1.8
- Color: Dark gray on light background (not pure black)

**Buttons/CTAs:**
- Font: Bold or semi-bold
- Uppercase or sentence case (be consistent)
- Adequate padding for touch targets

### Spacing and Layout

**Container Width:**
- Max width: 1200px for readable content
- Center aligned on large screens
- Full width with padding on mobile

**Spacing System:**
- Use consistent spacing units (multiples of 4px or 8px)
- Generous whitespace for breathing room
- Clear visual hierarchy

**Grid System:**
- 3-column grid for problem/feature cards
- Stack to single column on mobile (< 768px)
- Use flexbox or CSS Grid for layout

---

## Component Specifications

### Navigation Bar

**Desktop:**
- Fixed or sticky position (optional)
- Logo on left, navigation links on right
- Clean, minimal design
- Links: Home, About, Contact
- Max height: 70-80px

**Mobile:**
- Hamburger menu if needed
- Or simplified always-visible menu
- Ensure touch-friendly tap targets

**Styling:**
- Background: Light or dark (based on brand)
- Links: Hover states for better UX
- Active page indicator

### Hero Section

**Layout:**
- Full-width or contained within max-width
- Centered text alignment
- Vertical centering of content

**Elements:**
- H1 headline
- Subheadline paragraph
- 2 CTA buttons (primary and secondary)

**Styling:**
- Ample padding (100px+ on large screens)
- Background: Solid color, subtle gradient, or clean image
- Text must be highly readable with good contrast

### Problem/Challenge Cards

**Layout:**
- 3-column grid on desktop
- 2-column on tablet
- 1-column on mobile
- Equal height cards

**Card Design:**
- Light background with subtle border or shadow
- Icon or graphic at top (optional)
- Heading (H3)
- Description text (2-3 lines)
- Padding: 30-40px
- Border radius: 4-8px for modern look

### Vision/Content Sections

**Layout:**
- Contained width for readability (max 800px)
- Center aligned
- Generous top/bottom padding

**Styling:**
- Alternating background colors (optional)
- Clear section breaks
- Readable line length

### Call-to-Action Sections

**Layout:**
- Full-width or prominent placement
- Centered content
- Clear visual hierarchy

**Elements:**
- H2 heading
- Brief supporting text
- Primary CTA button

**Styling:**
- Contrasting background to draw attention
- Button: Large, obvious, with hover effects

### Footer

**Layout:**
- Full width
- Centered content within max-width container
- Single or multi-column based on content

**Content:**
- Copyright notice
- Patent pending disclaimer
- Links to legal pages (future)
- Social media links (if applicable)

**Styling:**
- Subtle background color
- Smaller text size than body
- Adequate padding

---

## Button Styles

### Primary Button
- Background: Accent color
- Text: White or high-contrast
- Padding: 12-16px horizontal, 8-12px vertical
- Border radius: 4-6px
- Hover: Slightly darker or elevated shadow
- Cursor: pointer

### Secondary Button
- Background: Transparent or light
- Border: 1-2px solid
- Text: Primary color
- Same size as primary
- Hover: Background color change

### Guidelines
- Minimum touch target: 44x44px
- Clear active/hover states
- Loading state for form submissions
- Disabled state styling

---

## Form Design

### Form Elements
- Labels: Above inputs, clearly visible
- Inputs: Adequate padding, clear borders
- Textarea: Minimum height 100-150px
- Error messages: Red text, clear positioning
- Success messages: Green, prominent

### Validation
- Real-time validation as user types/tabs
- Clear error indicators
- Helpful error messages, not just "Invalid"
- Success state before submission

### Layout
- Single column for simplicity
- Logical field ordering
- Required fields clearly marked (*)
- Submit button: Prominent placement

---

## Responsive Design Breakpoints

### Mobile First Approach
Start with mobile design, enhance for larger screens.

### Breakpoints
```css
/* Mobile: default (< 768px) */
/* Tablet: 768px */
/* Desktop: 1024px */
/* Large Desktop: 1440px (optional) */
```

### Mobile Adjustments
- Single column layouts
- Larger touch targets
- Simplified navigation
- Reduced font sizes appropriately
- Stack content vertically

### Tablet Adjustments
- 2-column grids where appropriate
- Increased font sizes
- More whitespace

### Desktop Adjustments
- 3-column grids
- Maximum content width applied
- Enhanced hover effects
- Optimal line lengths for reading

---

## Accessibility Guidelines

### Color Contrast
- Text on background: Minimum 4.5:1 ratio
- Large text (18pt+): Minimum 3:1 ratio
- Interactive elements: Clear focus indicators

### Navigation
- Keyboard accessible (tab order logical)
- Skip to main content link
- Clear focus indicators
- ARIA labels where appropriate

### Images
- Alt text for all images
- Decorative images: Empty alt attribute
- Meaningful images: Descriptive alt text

### Forms
- Labels associated with inputs
- Error messages announced
- Clear instructions
- Required fields indicated

---

## Performance Optimization

### Images
- Compress all images before upload
- Use appropriate formats (JPG for photos, PNG for graphics)
- Consider WebP for modern browsers
- Lazy loading for below-fold images

### CSS
- Minify production CSS
- Remove unused styles
- Use efficient selectors
- Limit external stylesheets

### JavaScript
- Minify production JS
- Load non-critical scripts async/defer
- Keep dependencies minimal
- Avoid render-blocking scripts

### General
- Enable GZIP compression
- Minimize HTTP requests
- Optimize fonts (system fonts or limited weights)
- Test with PageSpeed Insights

---

## Browser Testing Requirements

### Desktop Browsers
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

### Mobile Browsers
- iOS Safari (latest 2 versions)
- Chrome Mobile (latest version)
- Samsung Internet (if serving international users)

### Testing Checklist
- [ ] Layout displays correctly
- [ ] Navigation works smoothly
- [ ] Forms function properly
- [ ] Images load and display
- [ ] No console errors
- [ ] Performance acceptable
- [ ] Responsive breakpoints work

---

## Animation and Interactions

### Subtle Animations
- Smooth scroll to anchor links
- Button hover effects (color change, slight scale)
- Card hover: subtle elevation or border
- Form focus: clear visual feedback

### Loading States
- Form submission: Button disabled with "Sending..." text
- Page loads: Minimal if any loading indicators
- Image loading: Placeholder or blur-up

### Guidelines
- Keep animations subtle and professional
- Avoid distracting or excessive motion
- Respect prefers-reduced-motion
- Ensure animations don't impact usability

---

## Content Presentation

### Text Hierarchy
1. H1: Single instance per page (main headline)
2. H2: Section headings
3. H3: Subsection headings
4. Body: Paragraph text with adequate line height

### Visual Hierarchy
- Most important content most prominent
- Use size, weight, color to guide eye
- Clear visual flow from top to bottom
- CTAs visually distinct

### Whitespace Usage
- Generous padding between sections
- Breathing room around text blocks
- Not cramped or cluttered

---

## Image and Media Guidelines

### Logo Usage
- Maintain clear space around logo
- Don't distort or modify
- Use on appropriate backgrounds
- Include high-DPI versions (2x, 3x)

### Icons (if used)
- Consistent style throughout
- Appropriate size for context
- Accessible with text labels
- Source: Font Awesome, Feather Icons, or custom

### Photography (if used)
- Professional quality
- Consistent style/treatment
- Relevant to content
- Properly licensed

---

## Layout Templates

### Standard Page Layout
```
┌────────────────────────┐
│     Navigation         │
├────────────────────────┤
│     Hero/Header        │
├────────────────────────┤
│   Main Content Area    │
│   (multiple sections)  │
├────────────────────────┤
│       Footer           │
└────────────────────────┘
```

### Card Grid Layout (Problem Section)
```
┌──────┬──────┬──────┐
│ Card │ Card │ Card │
│  1   │  2   │  3   │
└──────┴──────┴──────┘
```
Mobile: Stack vertically

### Form Layout
```
┌────────────────────────┐
│      Form Title        │
├────────────────────────┤
│  [Label]               │
│  [Input Field]         │
├────────────────────────┤
│  [Label]               │
│  [Input Field]         │
├────────────────────────┤
│  [Submit Button]       │
└────────────────────────┘
```

---

## Code Quality Standards

### HTML
- Valid HTML5
- Semantic markup
- Proper nesting and indentation
- Comments for major sections
- No inline styles

### CSS
- Organized by sections
- Consistent naming convention (BEM or similar)
- Avoid !important unless necessary
- Use CSS variables for colors/spacing
- Mobile-first media queries

### JavaScript
- Clean, readable code
- Comments for complex logic
- Avoid global namespace pollution
- Handle errors gracefully
- Cross-browser compatible

---

## File Naming Conventions

### General
- Lowercase only
- Hyphens for spaces (not underscores)
- Descriptive names

### Examples
- HTML: `index.html`, `about.html`, `contact.html`
- CSS: `styles.css`, `normalize.css`
- JS: `main.js`, `form-validation.js`
- Images: `logo.png`, `hero-bg.jpg`, `icon-security.svg`

---

## Build Checklist

### Pre-Launch
- [ ] All pages created and linked
- [ ] Content proofread and approved
- [ ] Images optimized and loaded
- [ ] Forms tested and functional
- [ ] Responsive design verified
- [ ] Browser compatibility tested
- [ ] Accessibility audit completed
- [ ] Performance optimized
- [ ] SEO meta tags added
- [ ] Analytics configured (if using)
- [ ] Contact form backend integrated
- [ ] Legal disclaimers present
- [ ] Final review with stakeholder

### Post-Launch
- [ ] Monitor form submissions
- [ ] Check analytics for errors/issues
- [ ] Gather user feedback
- [ ] Plan iterative improvements
- [ ] Keep content current

---

## Future Enhancements (Optional)

Consider these additions as the startup grows:

1. **Blog/News Section**: Share updates and insights
2. **Case Studies**: When appropriate and IP-safe
3. **FAQ Page**: Address common questions
4. **Resources Section**: Whitepapers, guides, etc.
5. **Newsletter Signup**: Build an email list
6. **Social Proof**: Testimonials, partners, media mentions
7. **Demo Request**: For qualified prospects
8. **Careers Page**: When hiring

Each addition should maintain IP protection standards.

---

## Design Inspiration

### Style
- Modern, clean SaaS websites
- Professional startup landing pages
- Tech company sites with strong visual hierarchy

### Examples to Reference (for style only)
- Stripe.com: Clean, professional, clear CTAs
- Vercel.com: Modern, minimal, technical yet accessible
- Tailwind UI components: Well-designed UI patterns

**Note:** Borrow design patterns and aesthetics only, not content or proprietary features.

---

## Quality Assurance

### Visual QA Checklist
- [ ] Branding consistent
- [ ] Colors match specifications
- [ ] Typography hierarchy clear
- [ ] Spacing consistent
- [ ] Alignment proper
- [ ] No broken images
- [ ] All links functional
- [ ] No spelling/grammar errors

### Technical QA Checklist
- [ ] Valid HTML/CSS
- [ ] No console errors
- [ ] Forms validate correctly
- [ ] Responsive on all breakpoints
- [ ] Cross-browser compatible
- [ ] Accessible (keyboard, screen readers)
- [ ] Fast load times
- [ ] SEO elements present

---

## Maintenance and Updates

### Regular Reviews
- Quarterly content review
- Update as company evolves
- Refresh design as needed
- Monitor performance metrics

### Version Control
- Track changes in git
- Tag major releases
- Document significant updates
- Maintain change log

---

## Design Deliverables

When implementing, provide:

1. **HTML Files**: All pages with semantic markup
2. **CSS File**: Single stylesheet with organized sections
3. **JavaScript File**: Functionality for forms and interactions
4. **Images**: Optimized branding assets
5. **README**: Quick start and deployment guide
6. **Documentation**: This docs folder for reference

---

## Success Criteria

The design will be successful if it:
- ✓ Looks professional and inspires trust
- ✓ Clearly communicates value without revealing IP
- ✓ Encourages qualified parties to make contact
- ✓ Works flawlessly across devices and browsers
- ✓ Loads quickly and performs well
- ✓ Maintains brand consistency
- ✓ Supports business goals of the startup
