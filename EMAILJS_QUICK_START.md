# EmailJS Quick Start Guide

## 🚀 Quick Setup (5 Minutes)

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (200 emails/month)

### Step 2: Get Your Credentials

**Public Key:**
- Dashboard → Account → General → Public Key
- Copy the key (starts with `user_xxxxxxxxxxxxx`)

**Service ID:**
- Dashboard → Email Services → Add New Service
- Connect Gmail/Outlook (or use Custom SMTP)
- Copy the Service ID (e.g., `service_xxxxxxxxx`)

**Template ID:**
- Dashboard → Email Templates → Create New Template
- Use the template from `EMAILJS_SETUP_GUIDE.md`
- Copy the Template ID (e.g., `template_xxxxxxxxx`)

### Step 3: Configure Environment Variables

Create a `.env` file in the project root:

```env
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
```

### Step 4: Test

1. Start your dev server: `npm start`
2. Navigate to the CTA section
3. Fill out the form
4. Submit and check your email!

## 📧 Email Template Variables

The form sends these variables to your EmailJS template:

- `{{audience_type}}` - Worker/Student, Business, or Investor
- `{{user_email}}` - User's email address
- `{{user_phone}}` - User's phone number
- `{{submission_date}}` - Date and time of submission
- `{{user_agent}}` - Browser/device information
- `{{to_email}}` - Receiving email address

## 🔧 How It Works

1. User fills out the form (email + phone)
2. Form submission triggers `handleSubmit`
3. EmailJS sends email using your configured service
4. Email is delivered to `workearn.community@gmail.com`
5. User sees success message

## ⚠️ Important Notes

- **Never commit `.env` file** to version control
- Free plan: 200 emails/month
- EmailJS uses POST requests internally (not GET)
- All credentials are loaded from environment variables
- Form validation happens before submission

## 🐛 Troubleshooting

**Form not sending?**
- Check browser console for errors
- Verify all environment variables are set
- Check EmailJS dashboard → Logs

**Email not received?**
- Check spam folder
- Verify email service is connected
- Check EmailJS dashboard for errors

**Configuration error?**
- Make sure all three variables are set in `.env`
- Restart dev server after changing `.env`
- Check that variables start with `VITE_`

## 📚 Full Documentation

See `EMAILJS_SETUP_GUIDE.md` for detailed instructions.

