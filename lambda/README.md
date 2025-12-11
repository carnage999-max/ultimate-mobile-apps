# Lambda Function Deployment

This directory contains the Lambda function for sending emails via Resend.

## Files

- `send-email/index.js` - Main Lambda function code
- `send-email/package.json` - Package metadata (not required, Lambda uses built-in Node.js)

## Deployment Methods

### Method 1: AWS Console (Easiest)

1. Go to AWS Lambda Console
2. Create new function
3. Copy and paste the code from `index.js`
4. Configure environment variables
5. Deploy

### Method 2: AWS CLI

```bash
# Zip the function (if needed)
cd lambda/send-email
zip function.zip index.js

# Create function
aws lambda create-function \
  --function-name ultimate-apps-send-email \
  --runtime nodejs20.x \
  --role arn:aws:iam::YOUR_ACCOUNT:role/lambda-execution-role \
  --handler index.handler \
  --zip-file fileb://function.zip

# Update function code
aws lambda update-function-code \
  --function-name ultimate-apps-send-email \
  --zip-file fileb://function.zip
```

### Method 3: Infrastructure as Code (Terraform/CloudFormation)

See AWS documentation for Terraform or CloudFormation templates.

## Environment Variables

Set these in Lambda function configuration:

- `RESEND_API_KEY` - Your Resend API key (required)
- `RECIPIENT_EMAIL` - Email to receive support requests (optional, defaults to support@ultimateapps.com)

## Testing

Test the function locally or in AWS Lambda console:

```json
{
  "httpMethod": "POST",
  "body": "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"category\":\"Bug report\",\"message\":\"Test message\"}"
}
```

## Monitoring

- Check CloudWatch Logs for function execution logs
- Set up CloudWatch Alarms for errors
- Monitor Lambda metrics (invocations, duration, errors)

