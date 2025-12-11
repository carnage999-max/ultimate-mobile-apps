// Lambda function to send emails via Resend
// Deploy this to AWS Lambda

const https = require('https');

exports.handler = async (event) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*', // Change to your domain in production
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'CORS preflight' }),
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Parse request body
    const body = JSON.parse(event.body || '{}');
    const { name, email, category, message, fileName } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields: name, email, message' }),
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid email format' }),
      };
    }

    // Get Resend API key from environment variable
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY environment variable not set');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Server configuration error' }),
      };
    }

    // Get recipient email from environment variable (default to support@ultimateapps.com)
    const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || 'support@ultimateapps.com';

    // Prepare email content
    const emailSubject = `Support Request: ${category || 'General Inquiry'}`;
    const emailHtml = `
      <h2>New Support Request</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Category:</strong> ${escapeHtml(category || 'General Inquiry')}</p>
      ${fileName ? `<p><strong>File:</strong> ${escapeHtml(fileName)}</p>` : ''}
      <hr>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
    `;

    // Send email via Resend API
    const resendResponse = await sendResendEmail({
      apiKey: RESEND_API_KEY,
      from: 'Ultimate Mobile Apps <noreply@ultimateapps.com>', // Update with your verified domain
      to: RECIPIENT_EMAIL,
      replyTo: email,
      subject: emailSubject,
      html: emailHtml,
    });

    if (resendResponse.error) {
      console.error('Resend API error:', resendResponse.error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Failed to send email' }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Email sent successfully',
        id: resendResponse.id,
      }),
    };
  } catch (error) {
    console.error('Lambda error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};

// Helper function to send email via Resend API
function sendResendEmail({ apiKey, from, to, replyTo, subject, html }) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      from,
      to: [to],
      reply_to: replyTo,
      subject,
      html,
    });

    const options = {
      hostname: 'api.resend.com',
      port: 443,
      path: '/emails',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'Content-Length': Buffer.byteLength(postData),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(parsed);
          } else {
            resolve({ error: parsed });
          }
        } catch (e) {
          resolve({ error: { message: 'Invalid response from Resend API' } });
        }
      });
    });

    req.on('error', (error) => {
      resolve({ error: { message: error.message } });
    });

    req.write(postData);
    req.end();
  });
}

// Helper function to escape HTML
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

