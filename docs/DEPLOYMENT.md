# Pando Website Deployment Guide

## Overview
This document provides instructions for deploying and hosting the Pando website.

---

## Hosting Options

### Recommended: Static Site Hosting

The Pando website is a static site (HTML/CSS/JS) and can be hosted on various platforms:

#### Option 1: Netlify (Recommended)
**Pros:**
- Free tier available
- Automatic HTTPS
- Easy form handling with Netlify Forms
- Continuous deployment from git
- Custom domain support
- Excellent performance

**Setup:**
1. Create Netlify account (netlify.com)
2. Connect git repository or drag/drop folder
3. Configure custom domain (if desired)
4. Set up Netlify Forms for contact form
5. Deploy with one click

**Contact Form Integration:**
Add `netlify` attribute to form tag:
```html
<form name="contact" method="POST" data-netlify="true">
```

#### Option 2: Vercel
**Pros:**
- Free tier available
- Excellent performance
- Easy deployment from git
- Custom domain support
- Built-in analytics

**Setup:**
1. Create Vercel account (vercel.com)
2. Import git repository
3. Configure deployment settings
4. Add custom domain
5. Deploy

**Contact Form:**
Requires custom serverless function or third-party service

#### Option 3: GitHub Pages
**Pros:**
- Free
- Direct deployment from GitHub repository
- Good for open-source projects

**Setup:**
1. Push website to GitHub repository
2. Go to repository Settings → Pages
3. Select branch to deploy
4. Add custom domain (optional)

**Contact Form:**
Requires third-party service (FormSpree, Formsubmit, etc.)

#### Option 4: Traditional Web Hosting
**Pros:**
- Full control
- Can use custom backend

**Setup:**
1. Purchase hosting (Bluehost, SiteGround, etc.)
2. Upload files via FTP/SFTP
3. Configure domain
4. Set up PHP/backend for contact form

---

## Pre-Deployment Checklist

### Content Review
- [ ] All content proofread and approved
- [ ] No IP-revealing information present
- [ ] Patent pending notices included
- [ ] Contact information accurate
- [ ] Legal disclaimers present

### Technical Review
- [ ] All HTML valid (use W3C validator)
- [ ] CSS valid and minified
- [ ] JavaScript working correctly
- [ ] Images optimized and compressed
- [ ] No broken links
- [ ] All file paths relative (not absolute)

### Testing
- [ ] Test on Chrome, Firefox, Safari, Edge
- [ ] Test on mobile devices
- [ ] Test form submission
- [ ] Check responsive breakpoints
- [ ] Verify load speed
- [ ] Test accessibility with screen reader

### SEO/Meta
- [ ] Title tags on all pages
- [ ] Meta descriptions on all pages
- [ ] Open Graph tags (for social sharing)
- [ ] Favicon present
- [ ] Robots.txt (if needed)
- [ ] Sitemap.xml (if needed)

---

## Contact Form Integration

### Options for Form Handling

#### 1. Netlify Forms (If using Netlify)
**Setup:**
```html
<form name="contact" method="POST" data-netlify="true">
  <input type="hidden" name="form-name" value="contact" />
  <!-- form fields -->
</form>
```

**Configuration:**
- Submissions appear in Netlify dashboard
- Set up email notifications
- Configure spam filtering
- No additional code needed

#### 2. FormSpree
**Setup:**
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  <!-- form fields -->
</form>
```

**Configuration:**
- Free tier: 50 submissions/month
- Paid plans for more volume
- Email notifications included
- Spam protection built-in

#### 3. Custom PHP Script
If hosting supports PHP:

```php
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = sanitize($_POST['name']);
    $email = sanitize($_POST['email']);
    $message = sanitize($_POST['message']);
    
    // Send email
    $to = "your-email@example.com";
    $subject = "Pando Contact Form Submission";
    $body = "Name: $name\nEmail: $email\n\nMessage:\n$message";
    
    mail($to, $subject, $body);
    
    // Redirect to thank you page
    header("Location: thank-you.html");
}
?>
```

#### 4. Serverless Function (Vercel/Netlify)
Create API endpoint for form processing with serverless functions.

---

## Deployment Steps

### Quick Deploy with Netlify

1. **Prepare Repository**
```bash
cd pandoWebsite
git init
git add .
git commit -m "Initial commit"
```

2. **Create Netlify Account**
- Go to netlify.com
- Sign up with GitHub/GitLab/Email

3. **Deploy**
- Click "Add new site" → "Import an existing project"
- Connect to git provider
- Select pandoWebsite repository
- Configure build settings (none needed for static site)
- Click "Deploy site"

4. **Configure Domain (Optional)**
- Go to Site settings → Domain management
- Add custom domain
- Follow DNS configuration instructions
- Wait for DNS propagation

5. **Set Up Forms**
- Forms automatically detected if using data-netlify attribute
- Configure notifications in Site settings → Forms
- Set up spam filtering

### Quick Deploy with GitHub Pages

1. **Create GitHub Repository**
```bash
cd pandoWebsite
git init
git add .
git commit -m "Initial Pando website"
gh repo create pando-website --public --source=. --push
```

2. **Enable GitHub Pages**
- Go to repository on GitHub
- Settings → Pages
- Source: Deploy from branch
- Branch: main (or master)
- Folder: / (root)
- Save

3. **Access Site**
- Site will be at: username.github.io/pando-website
- May take a few minutes to deploy

4. **Custom Domain (Optional)**
- Add CNAME file with domain name
- Configure DNS settings
- Add custom domain in GitHub Pages settings

---

## Custom Domain Configuration

### Unstoppable Domains Setup

**Your domain is registered with Unstoppable Domains (blockchain-based domain).**

#### Hosting with IPFS (Decentralized)
1. Build static site and upload to IPFS
2. Get IPFS hash (e.g., `QmXxx...`)
3. In Unstoppable Domains dashboard:
   - Go to your domain settings
   - Add IPFS hash to "IPFS Hash" field
   - Save changes
4. Domain will resolve to your IPFS-hosted site

**Benefits:**
- Censorship resistant
- Decentralized hosting
- Aligns with Web3 values

**Note:** IPFS hosting may have slower load times than traditional hosting

#### Hosting with Traditional Provider + Unstoppable Domains

1. Deploy site to Netlify/Vercel/GitHub Pages as normal
2. Get the hosting provider's URL
3. In Unstoppable Domains dashboard:
   - Add DNS record pointing to hosting provider
   - Or use redirect to traditional URL
4. Configure hosting provider to accept your Unstoppable Domain

**Options:**
- Use Unstoppable's redirect feature to point to traditional host
- Set up custom DNS records (if supported by your plan)
- Use their browser extension for resolution

#### Browser Support
- Native support in Brave, Opera
- Extension required for Chrome, Firefox
- May not work universally - consider providing traditional domain alternative

### Traditional Domain Configuration (If Using Additional Domain)

For `example.com` pointing to static host:

**For Netlify:**
```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: your-site.netlify.app
```

**For GitHub Pages:**
```
Type: A  
Name: @
Value: 185.199.108.153

Type: CNAME
Name: www
Value: your-username.github.io
```

**Verify:**
- DNS propagation can take 24-48 hours
- Use dnschecker.org to verify propagation
- Test both www and non-www versions

---

## SSL/HTTPS

### Automatic SSL (Recommended Hosts)
- Netlify: Automatic via Let's Encrypt
- Vercel: Automatic
- GitHub Pages: Automatic with custom domain

### Manual SSL (Traditional Hosting)
- Purchase SSL certificate or use Let's Encrypt
- Install on server
- Configure redirects from HTTP to HTTPS
- Update all internal links to HTTPS

---

## Performance Optimization

### Before Deployment

1. **Optimize Images**
```bash
# Install imagemin if needed
npm install -g imagemin-cli

# Optimize all images
imagemin images/*.png --out-dir=images
imagemin images/*.jpg --out-dir=images
```

2. **Minify CSS**
```bash
# Install clean-css if needed
npm install -g clean-css-cli

# Minify CSS
cleancss -o css/styles.min.css css/styles.css
```

3. **Minify JavaScript**
```bash
# Install uglify-js if needed
npm install -g uglify-js

# Minify JS
uglifyjs js/main.js -o js/main.min.js
```

4. **Update HTML References**
- Point to minified versions in production
- Or use build process to handle automatically

### Post-Deployment

- Test with Google PageSpeed Insights
- Check load times with Lighthouse
- Verify mobile performance
- Monitor Core Web Vitals

---

## Environment-Specific Settings

### Development
- Use unminified files for easier debugging
- Detailed error messages
- Local testing before deployment

### Production
- Use minified CSS/JS
- Enable compression (GZIP)
- Generic error messages
- Analytics enabled
- Security headers set

---

## Monitoring and Analytics

### Google Analytics (Optional)

If implementing analytics:

1. Create Google Analytics account
2. Get tracking ID
3. Add tracking code to all pages (before `</head>`):

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

### Form Submission Monitoring
- Check contact form submissions regularly
- Set up email notifications for new contacts
- Log submissions for security
- Monitor for spam

---

## Security Considerations

### Headers (If Possible to Configure)
```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: no-referrer-when-downgrade
```

### Form Security
- Implement CAPTCHA if spam becomes an issue
- Validate all inputs server-side
- Sanitize data before storing/emailing
- Rate limit submissions

### Content Security
- Don't expose sensitive data in client-side code
- Keep API keys/secrets out of repository
- Use environment variables for sensitive config

---

## Troubleshooting

### Common Issues

**Form Not Working:**
- Check form action/method
- Verify backend is configured
- Check for JavaScript errors in console
- Test with browser dev tools

**Styles Not Loading:**
- Verify file paths are relative
- Check for CSS syntax errors
- Clear browser cache
- Check file permissions

**Images Not Displaying:**
- Verify image file paths
- Check image file formats
- Ensure images are in images/ directory
- Check file naming (case-sensitive on some servers)

**Mobile Layout Issues:**
- Test on actual devices, not just browser resize
- Check media query breakpoints
- Verify viewport meta tag present
- Test on multiple device sizes

---

## Maintenance

### Regular Tasks

**Weekly:**
- Check for new contact form submissions
- Monitor analytics (if implemented)

**Monthly:**
- Review and update content as needed
- Check for broken links
- Monitor site performance
- Review security

**Quarterly:**
- Update dependencies (if any)
- Refresh content
- Review and update messaging
- Check competitor sites for inspiration

**Annually:**
- Renew domain (if applicable)
- Review and renew SSL certificate (if manual)
- Major content refresh
- Design review and updates

---

## Backup and Version Control

### Git Repository
Maintain website in git repository:

```bash
# Initialize repo
git init

# Add all files
git add .

# Initial commit
git commit -m "Initial Pando website"

# Add remote (GitHub/GitLab/etc)
git remote add origin YOUR_REPO_URL

# Push to remote
git push -u origin main
```

### Regular Commits
- Commit changes with descriptive messages
- Push to remote regularly
- Tag releases (v1.0, v1.1, etc.)

### Backup
- Repository serves as primary backup
- Consider additional backup of current live site
- Document any custom configurations
- Keep local copy of all assets

---

## Scaling and Growth

### When to Upgrade

Consider upgrading hosting/features when:
- Traffic exceeds free tier limits
- Need advanced form features
- Want custom backend functionality
- Require better analytics
- Need staging environment
- Want automated testing/deployment

### Potential Upgrades
- Move to paid hosting tier
- Implement automated deployment pipeline
- Add CMS for easier content updates
- Implement blog/news section
- Add user authentication (if needed)
- Integrate with CRM for leads

---

## Launch Checklist

### Final Pre-Launch
1. [ ] All content finalized and approved
2. [ ] Design matches specifications
3. [ ] All functionality tested
4. [ ] Forms working and tested
5. [ ] Analytics configured (if using)
6. [ ] Custom domain configured (if using)
7. [ ] SSL certificate active
8. [ ] Mobile responsiveness verified
9. [ ] Cross-browser compatibility confirmed
10. [ ] Accessibility audit passed
11. [ ] Performance optimized
12. [ ] Backup created
13. [ ] Launch plan documented
14. [ ] Stakeholder sign-off

### Launch Day
1. [ ] Deploy to production
2. [ ] Verify live site works correctly
3. [ ] Test all links and forms on live site
4. [ ] Update DNS if changing domains
5. [ ] Monitor for issues
6. [ ] Prepare to handle inquiries

### Post-Launch
1. [ ] Monitor analytics (first 24-48 hours closely)
2. [ ] Check form submissions
3. [ ] Address any discovered issues quickly
4. [ ] Share site with initial audience
5. [ ] Gather feedback
6. [ ] Plan iteration based on data

---

## Quick Reference Commands

### Local Testing
```bash
# Simple local server (Python)
python -m http.server 8000

# Or with Node.js
npx http-server

# Then visit http://localhost:8000
```

### Deploy to Netlify (CLI)
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
cd pandoWebsite
netlify deploy --prod
```

### Deploy to GitHub Pages
```bash
# Commit and push
git add .
git commit -m "Deploy website"
git push origin main

# Enable in repo settings if not already done
```

---

## Support and Resources

### Documentation
- Netlify Docs: docs.netlify.com
- Vercel Docs: vercel.com/docs
- GitHub Pages Docs: docs.github.com/pages

### Tools
- HTML Validator: validator.w3.org
- CSS Validator: jigsaw.w3.org/css-validator
- PageSpeed Insights: pagespeed.web.dev
- Accessibility Checker: wave.webaim.org

### Questions/Issues
Document any deployment issues and resolutions for future reference.

---

## Conclusion

The Pando website is designed for simple deployment on modern static hosting platforms. Choose the option that best fits your needs, follow the deployment steps, and monitor for any issues. The site should be live and functional within minutes to hours depending on the chosen platform.

For questions or issues during deployment, refer to the platform-specific documentation linked above.
