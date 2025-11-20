# Pando Website File Structure

## Overview
This document outlines the complete file structure for the Pando website.

## Directory Structure

```
pandoWebsite/
├── docs/                          # Documentation (this directory)
│   ├── FILE_STRUCTURE.md         # This file
│   ├── CONTENT_REQUIREMENTS.md   # Detailed content requirements for each page
│   ├── MESSAGING_GUIDELINES.md   # Tone, voice, and messaging approach
│   ├── DESIGN_SPECIFICATIONS.md  # Visual design requirements
│   └── DEPLOYMENT.md             # Hosting and deployment instructions
│
├── index.html                     # Landing/Home page
├── about.html                     # About page (team, background, vision)
├── contact.html                   # Contact form page
│
├── css/
│   └── styles.css                # Main stylesheet
│
├── js/
│   └── main.js                   # JavaScript for forms and interactions
│
├── images/                        # Branding and visual assets
│   ├── logo.png                  # Pando logo
│   └── [additional images]       # Other graphics as needed
│
└── README.md                      # Quick start guide for website

```

## Page Purposes

### index.html (Landing Page)
- Primary entry point for all visitors
- Communicates core value proposition
- Drives visitors to learn more or make contact
- Should be compelling but maintain IP protection

### about.html
- Team background and credentials
- Vision and mission
- Professional credibility
- Why this problem matters

### contact.html
- Simple, professional contact form
- Email capture for serious inquiries
- Clear messaging about development stage

## Technical Stack

- **HTML5**: Semantic markup for accessibility
- **CSS3**: Modern styling with flexbox/grid for responsive design
- **Vanilla JavaScript**: No frameworks needed for simple functionality
- **Form handling**: Basic client-side validation with server-side requirements

## Design Principles

1. **Minimal and Clean**: Avoid complexity and clutter
2. **Professional**: Establish credibility and trust
3. **Responsive**: Mobile-first design approach
4. **Fast**: Optimize for quick loading
5. **Accessible**: Follow WCAG guidelines where possible

## Asset Requirements

### Images Directory Should Contain:
- Logo (various sizes: logo.png, logo@2x.png)
- Favicon (favicon.ico)
- OpenGraph image for social sharing (og-image.png)
- Any additional graphics or backgrounds

### Branding Consistency
- Use consistent color palette throughout
- Maintain logo usage guidelines
- Ensure professional appearance across all pages

## Development Notes

- Keep all file paths relative for easy deployment
- Comment code for maintainability
- Validate HTML/CSS for standards compliance
- Test across major browsers (Chrome, Firefox, Safari)
- Test on mobile devices

## Future Expandability

The structure allows for easy addition of:
- Additional pages (add .html files in root)
- More assets (images/ directory)
- Enhanced styling (css/ directory)
- Additional features (js/ directory)

## Deployment Considerations

- All files should be static (HTML/CSS/JS)
- No server-side dependencies for core functionality
- Contact form will need backend integration (see DEPLOYMENT.md)
- Consider using a simple hosting service (Netlify, Vercel, GitHub Pages)
