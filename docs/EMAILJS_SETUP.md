# EmailJS Contact Form Setup

## Overview
The contact form uses EmailJS to send email submissions without requiring a backend server. EmailJS handles the email delivery through Gmail, sending submissions to your ProtonMail address.

## Current Configuration

### EmailJS Credentials
- **Public Key**: QOE9Vl1cBq8l2TlPN
- **Service ID**: service_1q1byab (Gmail)
- **Template ID**: template_1zf3ykh

### How It Works
1. User fills out the contact form on the website
2. JavaScript validates the form fields
3. EmailJS sends the submission via Gmail
4. Email is received at your ProtonMail address
5. Form displays success message and resets

## EmailJS Dashboard
Access your EmailJS account: https://dashboard.emailjs.com

### Free Tier Limits
- 200 emails per month
- Basic spam filtering included
- Email delivery status tracking

## Form Fields
The form sends the following parameters to your email template:
- `from_name` - Sender's name
- `from_email` - Sender's email address
- `organization` - Sender's company/organization (optional)
- `subject` - Email subject line
- `message` - Message content

## Template Configuration
Your EmailJS template should include these variables:
```
From: {{from_name}} <{{from_email}}>
Organization: {{organization}}
Subject: {{subject}}

Message:
{{message}}
```

## Updating Credentials
If you need to update the EmailJS credentials:

1. Open `js/main.js`
2. Find the `EMAILJS_CONFIG` object at the top of the file
3. Update the values:
```javascript
const EMAILJS_CONFIG = {
    publicKey: 'YOUR_PUBLIC_KEY',
    serviceId: 'YOUR_SERVICE_ID',
    templateId: 'YOUR_TEMPLATE_ID'
};
```

## Testing
To test the contact form:
1. Open `contact.html` in a browser
2. Fill out all required fields
3. Click "Send Message"
4. Check your ProtonMail inbox for the test submission
5. Verify console logs for any errors

## Troubleshooting

### Emails Not Sending
- Check browser console for errors
- Verify credentials in `js/main.js` match EmailJS dashboard
- Ensure Gmail service is still connected in EmailJS dashboard
- Check EmailJS usage limits (200/month on free tier)

### Gmail Authentication Issues
If Gmail disconnects:
1. Go to EmailJS dashboard → Email Services
2. Remove and reconnect Gmail service
3. Authorize all requested permissions
4. Or use App Password method (see Gmail 2FA settings)

### Template Errors
- Ensure template variables match the `templateParams` in the code
- Template variables are case-sensitive
- Check "To Email" is set to your ProtonMail address

## Security Notes
- Public Key is safe to expose in client-side code
- Service ID and Template ID are also public identifiers
- Never expose Gmail passwords (EmailJS handles authentication)
- EmailJS provides basic spam protection

## Switching Email Services
To change from Gmail to another provider:
1. Add new service in EmailJS dashboard
2. Update `serviceId` in `EMAILJS_CONFIG`
3. Test the form to ensure delivery works

## Support
- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Support: https://www.emailjs.com/support/
