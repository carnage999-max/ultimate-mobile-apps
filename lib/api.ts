// API configuration for Lambda endpoint
const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT || '';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  category: string;
  fileName?: string;
}

export async function sendContactEmail(data: ContactFormData): Promise<{ success: boolean; error?: string }> {
  if (!API_ENDPOINT) {
    console.error('API endpoint not configured');
    return { success: false, error: 'API endpoint not configured' };
  }

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return { success: false, error: result.error || 'Failed to send email' };
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: 'Network error. Please try again later.' };
  }
}

