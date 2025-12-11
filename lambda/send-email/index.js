// Lambda function to send emails via AWS SES
const AWS = require('aws-sdk');

const ses = new AWS.SES({ region: process.env.AWS_REGION || 'us-east-1' });

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

    // Get recipient email from environment variable
    const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || 'support@ultimateapps.com';
    const SENDER_EMAIL = process.env.SENDER_EMAIL || 'noreply@ultimateapps.com';

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

    const emailText = `
New Support Request

Name: ${name}
Email: ${email}
Category: ${category || 'General Inquiry'}
${fileName ? `File: ${fileName}` : ''}

Message:
${message}
    `;

    // Send email via SES
    const params = {
      Source: SENDER_EMAIL,
      Destination: {
        ToAddresses: [RECIPIENT_EMAIL],
      },
      ReplyToAddresses: [email],
      Message: {
        Subject: {
          Data: emailSubject,
          Charset: 'UTF-8',
        },
        Body: {
          Html: {
            Data: emailHtml,
            Charset: 'UTF-8',
          },
          Text: {
            Data: emailText,
            Charset: 'UTF-8',
          },
        },
      },
    };

    const result = await ses.sendEmail(params).promise();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Email sent successfully',
        messageId: result.MessageId,
      }),
    };
  } catch (error) {
    console.error('Lambda error:', error);
    
    // Handle SES-specific errors
    if (error.code === 'MessageRejected') {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Email rejected. Please verify sender and recipient emails in SES.' 
        }),
      };
    }

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};

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
