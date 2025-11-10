# EmailJS Setup Guide for WE Community

This guide will help you set up EmailJS to send form submissions via email.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Get Your Public Key

1. Log in to EmailJS dashboard
2. Go to **Account** → **General**
3. Find **Public Key** section
4. Copy your Public Key (starts with something like `user_xxxxxxxxxxxxx`)

## Step 3: Create an Email Service

1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider:
   - **Gmail** (recommended for testing)
   - **Outlook**
   - **Custom SMTP**
4. Follow the setup instructions for your provider
5. Once connected, note your **Service ID** (e.g., `service_xxxxxxxxx`)

### For Gmail:

- You'll need to enable "Less secure app access" or use App Password
- Or use OAuth 2.0 for better security

## Step 4: Create an Email Template

1. Go to **Email Templates** in EmailJS dashboard
2. Click **Create New Template**
3. Use this template structure:

**Template Name:** `WE Community Form Submission`

**Subject:** `New {{audience_type}} Signup - WE Community`

**Content (HTML):**

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }
      .header {
        background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
        color: white;
        padding: 20px;
        border-radius: 8px 8px 0 0;
      }
      .content {
        background: #f9f9f9;
        padding: 20px;
        border: 1px solid #ddd;
      }
      .field {
        margin-bottom: 15px;
      }
      .label {
        font-weight: bold;
        color: #555;
      }
      .value {
        color: #333;
        margin-top: 5px;
      }
      .footer {
        background: #f0f0f0;
        padding: 15px;
        text-align: center;
        font-size: 12px;
        color: #666;
        border-radius: 0 0 8px 8px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h2>🚀 New Signup - WE Community</h2>
      </div>
      <div class="content">
        <div class="field">
          <div class="label">Audience Type:</div>
          <div class="value">{{audience_type}}</div>
        </div>
        <div class="field">
          <div class="label">Email:</div>
          <div class="value">{{user_email}}</div>
        </div>
        <div class="field">
          <div class="label">Phone:</div>
          <div class="value">{{user_phone}}</div>
        </div>
        <div class="field">
          <div class="label">Submitted At:</div>
          <div class="value">{{submission_date}}</div>
        </div>
        <div class="field">
          <div class="label">User Agent:</div>
          <div class="value">{{user_agent}}</div>
        </div>
      </div>
      <div class="footer">
        <p>
          This is an automated email from WE Community landing page form
          submission.
        </p>
        <p>Platform launching March 2026</p>
      </div>
    </div>
  </body>
</html>
```

**Template Variables:**

- `{{audience_type}}` - Worker/Business/Investor
- `{{user_email}}` - User's email address
- `{{user_phone}}` - User's phone number
- `{{submission_date}}` - Date and time of submission
- `{{user_agent}}` - Browser/device information

4. Click **Save**
5. Note your **Template ID** (e.g., `template_xxxxxxxxx`)

## Step 5: Configure Environment Variables

1. Create a `.env` file in the root of your project (if it doesn't exist)
2. Add the following variables:

```env
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
```

3. Replace the placeholder values with your actual credentials from EmailJS
4. **Important:** Never commit the `.env` file to version control
5. The `.env.example` file is already in the repository as a template

## Step 6: Test the Integration

1. Start your development server: `npm start`
2. Navigate to the CTA section on your landing page
3. Fill out the form with test data
4. Submit the form
5. Check your email inbox for the form submission

## Troubleshooting

### Email not received?

- Check your EmailJS dashboard → **Logs** to see if the email was sent
- Verify all environment variables are set correctly
- Check spam/junk folder
- Ensure your email service is properly connected

### Form submission fails?

- Check browser console for errors
- Verify EmailJS credentials in `.env` file
- Make sure you're using the correct Service ID and Template ID
- Check EmailJS dashboard for any service errors

### Rate Limits

- Free EmailJS account: 200 emails/month
- Upgrade to paid plan for more emails if needed

## Security Notes

- Never expose your EmailJS Private Key in frontend code
- Only use Public Key in the frontend
- Consider adding reCAPTCHA to prevent spam submissions
- Validate form inputs on both client and server side

## Support

- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Support: support@emailjs.com
