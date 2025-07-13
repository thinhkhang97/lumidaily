# SendGrid Feedback System Setup

## Environment Variables Required

Create a `.env.local` file in your project root with the following variables:

```env
# SendGrid Configuration
# Get your API key from: https://app.sendgrid.com/settings/api_keys
SENDGRID_API_KEY=your_sendgrid_api_key_here

# Email Configuration
# The email address that will receive feedback
FEEDBACK_TO_EMAIL=your-email@example.com

# Optional: The email address that will appear as the sender
# If not provided, FEEDBACK_TO_EMAIL will be used as the sender
SENDGRID_FROM_EMAIL=noreply@yourdomain.com
```

## SendGrid Setup Steps

### 1. Create SendGrid Account

- Go to [SendGrid](https://sendgrid.com/) and sign up for a free account
- Free tier includes 100 emails/day forever

### 2. Create API Key

- Navigate to Settings → API Keys
- Click "Create API Key"
- Choose "Restricted Access"
- Give it a name like "LumiDaily Feedback"
- Grant "Mail Send" permissions
- Copy the generated API key

### 3. Verify Sender Identity

- Go to Settings → Sender Authentication
- Verify a single sender email address OR set up domain authentication
- This is required for sending emails

### 4. Configure Environment Variables

- Copy the API key to `SENDGRID_API_KEY`
- Set `FEEDBACK_TO_EMAIL` to your email address
- Optionally set `SENDGRID_FROM_EMAIL` to a professional sender address

## Testing

1. Start your development server: `npm run dev`
2. Go to the homepage and scroll to the footer
3. Click "Contact & Feedback"
4. Fill out the form and submit
5. Check your email for the feedback message

## Features

- **Form validation** with Zod and react-hook-form
- **Professional email template** with user details
- **Reply-to functionality** if user provides email
- **Error handling** for SendGrid issues
- **Loading states** during submission
- **Success/error notifications** with Sonner

## Email Template

The system sends a beautifully formatted HTML email with:

- Feedback type and timestamp
- User's name and email (if provided)
- Formatted message content
- Professional styling

## Security

- Input validation on both client and server
- Environment variables for sensitive data
- Proper error handling without exposing internals
- Rate limiting can be added if needed

## Troubleshooting

### Common Issues

1. **"Email service is not configured"**

   - Check that `SENDGRID_API_KEY` is set in `.env.local`

2. **"Feedback recipient is not configured"**

   - Check that `FEEDBACK_TO_EMAIL` is set in `.env.local`

3. **SendGrid errors**
   - Verify your API key has "Mail Send" permissions
   - Ensure sender email is verified in SendGrid
   - Check SendGrid logs in your dashboard

### Debug Mode

Check the server console for detailed error messages when testing locally.
