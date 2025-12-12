import { NextRequest, NextResponse } from 'next/server';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

// Initialize SES client
const sesClient = new SESClient({
  region: process.env.SES_REGION || 'us-east-1',
  credentials: process.env.SES_ACCESS_KEY_ID && process.env.SES_SECRET_ACCESS_KEY ? {
    accessKeyId: process.env.SES_ACCESS_KEY_ID.trim(),
    secretAccessKey: process.env.SES_SECRET_ACCESS_KEY.trim(),
  } : undefined,
});

// Helper function to escape HTML
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

export async function POST(request: NextRequest) {
  try {
    // Check if credentials are configured
    if (!process.env.SES_ACCESS_KEY_ID || !process.env.SES_SECRET_ACCESS_KEY) {
      console.error('SES credentials not configured');
      return NextResponse.json(
        { error: 'Email service not configured. Please contact support.' },
        { status: 500 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { name, email, message, category } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, message' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Get email addresses from environment variables
    const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || 'support@ultimateapps.com';
    const SENDER_EMAIL = process.env.SENDER_EMAIL || 'noreply@ultimateapps.com';
    // Use absolute URL for email images - update this with your actual domain after deployment
    const APP_URL = process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL || 'https://ultimateapps.com';
    const ICON_URL = `${APP_URL}/icons/icon.jpeg`;

    // Prepare admin notification email (beautiful HTML template)
    const adminEmailSubject = `Contact Form: ${category || 'General Inquiry'}`;
    const adminEmailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px; text-align: center;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header with Logo -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px 8px 0 0;">
              <img src="${ICON_URL}" alt="Ultimate Mobile Apps" style="width: 64px; height: 64px; border-radius: 12px; margin-bottom: 16px;" />
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">New Contact Form Submission</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <div style="margin-bottom: 24px;">
                <p style="margin: 0 0 8px; color: #6b7280; font-size: 14px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">From</p>
                <p style="margin: 0; color: #111827; font-size: 16px; font-weight: 600;">${escapeHtml(name)}</p>
                <p style="margin: 4px 0 0; color: #6b7280; font-size: 14px;">${escapeHtml(email)}</p>
              </div>
              
              <div style="margin-bottom: 24px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
                <p style="margin: 0 0 8px; color: #6b7280; font-size: 14px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">Subject</p>
                <p style="margin: 0; color: #111827; font-size: 16px; font-weight: 500;">${escapeHtml(category || 'General Inquiry')}</p>
              </div>
              
              <div style="margin-bottom: 24px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
                <p style="margin: 0 0 12px; color: #6b7280; font-size: 14px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">Message</p>
                <div style="background-color: #f9fafb; padding: 16px; border-radius: 6px; border-left: 4px solid #667eea;">
                  <p style="margin: 0; color: #374151; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(message).replace(/\n/g, '<br>')}</p>
                </div>
              </div>
              
              <!-- Reply Button -->
              <div style="margin-top: 32px; text-align: center;">
                <a href="mailto:${escapeHtml(email)}?subject=Re: ${escapeHtml(category || 'General Inquiry')}" style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 500; font-size: 14px;">Reply to ${escapeHtml(name)}</a>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #f9fafb; border-radius: 0 0 8px 8px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">Ultimate Mobile Apps - Premium Apps. Unified Vision.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    const adminEmailText = `
New Contact Form Submission

From: ${name} (${email})
Subject: ${category || 'General Inquiry'}

Message:
${message}

---
Reply to: ${email}
    `;

    // Prepare confirmation email for user (beautiful HTML template)
    const confirmationEmailSubject = `Thank you for contacting Ultimate Mobile Apps`;
    const confirmationEmailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px; text-align: center;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header with Logo -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px 8px 0 0;">
              <img src="${ICON_URL}" alt="Ultimate Mobile Apps" style="width: 64px; height: 64px; border-radius: 12px; margin-bottom: 16px;" />
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">Thank You for Contacting Us!</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 16px; color: #111827; font-size: 16px; line-height: 1.6;">Hi ${escapeHtml(name)},</p>
              
              <p style="margin: 0 0 16px; color: #374151; font-size: 15px; line-height: 1.6;">
                Thank you for reaching out to Ultimate Mobile Apps. We've successfully received your message regarding <strong>${escapeHtml(category || 'General Inquiry')}</strong>.
              </p>
              
              <div style="background-color: #f0f9ff; padding: 20px; border-radius: 6px; border-left: 4px solid #3b82f6; margin: 24px 0;">
                <p style="margin: 0; color: #1e40af; font-size: 14px; font-weight: 500; margin-bottom: 8px;">📧 What's Next?</p>
                <p style="margin: 0; color: #1e3a8a; font-size: 14px; line-height: 1.6;">
                  Our team will review your message and get back to you within 24-48 hours. We appreciate your patience!
                </p>
              </div>
              
              <p style="margin: 24px 0 0; color: #374151; font-size: 15px; line-height: 1.6;">
                If you have any urgent questions, please don't hesitate to reach out directly.
              </p>
              
              <div style="margin-top: 32px; text-align: center;">
                <a href="${APP_URL}" style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 500; font-size: 14px;">Visit Our Website</a>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #f9fafb; border-radius: 0 0 8px 8px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 8px; color: #6b7280; font-size: 12px; font-weight: 500;">Ultimate Mobile Apps</p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">Premium Apps. Unified Vision.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    const confirmationEmailText = `
Thank You for Contacting Ultimate Mobile Apps!

Hi ${name},

Thank you for reaching out to Ultimate Mobile Apps. We've successfully received your message regarding ${category || 'General Inquiry'}.

What's Next?
Our team will review your message and get back to you within 24-48 hours. We appreciate your patience!

If you have any urgent questions, please don't hesitate to reach out directly.

Visit our website: ${APP_URL}

---
Ultimate Mobile Apps
Premium Apps. Unified Vision.
    `;

    // Send admin notification email
    const adminCommand = new SendEmailCommand({
      Source: SENDER_EMAIL,
      Destination: {
        ToAddresses: [RECIPIENT_EMAIL],
      },
      ReplyToAddresses: [email],
      Message: {
        Subject: {
          Data: adminEmailSubject,
          Charset: 'UTF-8',
        },
        Body: {
          Html: {
            Data: adminEmailHtml,
            Charset: 'UTF-8',
          },
          Text: {
            Data: adminEmailText,
            Charset: 'UTF-8',
          },
        },
      },
    });

    // Send confirmation email to user
    const confirmationCommand = new SendEmailCommand({
      Source: SENDER_EMAIL,
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Subject: {
          Data: confirmationEmailSubject,
          Charset: 'UTF-8',
        },
        Body: {
          Html: {
            Data: confirmationEmailHtml,
            Charset: 'UTF-8',
          },
          Text: {
            Data: confirmationEmailText,
            Charset: 'UTF-8',
          },
        },
      },
    });

    // Send both emails
    const [adminResult, confirmationResult] = await Promise.all([
      sesClient.send(adminCommand),
      sesClient.send(confirmationCommand),
    ]);

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
      messageId: adminResult.MessageId,
    });
  } catch (error: any) {
    console.error('API route error:', error);

    // Handle SES-specific errors
    if (error.name === 'MessageRejected' || error.code === 'MessageRejected') {
      return NextResponse.json(
        { error: 'Email rejected. Please verify sender and recipient emails in SES.' },
        { status: 400 }
      );
    }

    if (error.name === 'AccessDenied' || error.code === 'AccessDenied') {
      return NextResponse.json(
        { error: 'Access denied. Please check AWS credentials and permissions.' },
        { status: 403 }
      );
    }

    if (error.name === 'SignatureDoesNotMatch' || error.code === 'SignatureDoesNotMatch') {
      return NextResponse.json(
        { error: 'Invalid AWS credentials. Please check your Access Key ID and Secret Access Key match and are correct.' },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

