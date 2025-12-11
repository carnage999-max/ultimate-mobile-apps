# Deployment Guide: S3 + Lambda + Resend

This guide walks you through deploying the Ultimate Mobile Apps website to AWS S3 with Lambda functions for email support.

## Prerequisites

- AWS Account
- AWS CLI installed and configured
- Resend account and API key
- Node.js and npm/pnpm installed

## Step 1: Set Up Resend

1. Sign up at [resend.com](https://resend.com)
2. Get your API key from the dashboard
3. Verify your domain (or use the default `onboarding@resend.dev` for testing)
4. Note your API key - you'll need it for Lambda environment variables

## Step 2: Deploy Lambda Function

### 2.1 Create Lambda Function

1. Go to AWS Lambda Console
2. Click "Create function"
3. Choose "Author from scratch"
4. Function name: `ultimate-apps-send-email`
5. Runtime: Node.js 20.x (or latest)
6. Architecture: x86_64
7. Click "Create function"

### 2.2 Upload Function Code

1. In the Lambda function, go to "Code" tab
2. Delete the default code
3. Copy the contents of `lambda/send-email/index.js`
4. Paste into the Lambda editor
5. Click "Deploy"

### 2.3 Configure Environment Variables

1. Go to "Configuration" → "Environment variables"
2. Add the following:
   - `RESEND_API_KEY`: Your Resend API key
   - `RECIPIENT_EMAIL`: Email address to receive support requests (e.g., `support@ultimateapps.com`)

### 2.4 Set Execution Role

1. Go to "Configuration" → "Permissions"
2. Ensure the execution role has basic Lambda permissions
3. The function doesn't need additional AWS permissions (it only calls Resend API)

## Step 3: Create API Gateway

### 3.1 Create HTTP API

1. Go to API Gateway Console
2. Click "Create API"
3. Choose "HTTP API"
4. Click "Build"

### 3.2 Configure Routes

1. Click "Add integration"
2. Integration type: Lambda
3. Lambda function: `ultimate-apps-send-email`
4. Method: POST
5. Path: `/send-email` (or `/`)
6. Click "Create"

### 3.3 Configure CORS

1. Go to "CORS" in the API settings
2. Add your domain to "Access-Control-Allow-Origin" (or use `*` for testing)
3. Allow methods: POST, OPTIONS
4. Allow headers: Content-Type
5. Save

### 3.4 Get API Endpoint URL

1. Note your API Gateway endpoint URL (e.g., `https://abc123.execute-api.us-east-1.amazonaws.com`)
2. Full endpoint: `https://abc123.execute-api.us-east-1.amazonaws.com/send-email`

## Step 4: Configure Next.js Environment Variable

1. Create `.env.local` file in the project root:
```env
NEXT_PUBLIC_API_ENDPOINT=https://your-api-gateway-url.execute-api.region.amazonaws.com/send-email
```

2. Replace with your actual API Gateway endpoint URL

## Step 5: Build Static Site

```bash
# Install dependencies
pnpm install

# Build static site
pnpm build

# The static files will be in the 'out' directory
```

## Step 6: Deploy to S3

### 6.1 Create S3 Bucket

1. Go to S3 Console
2. Click "Create bucket"
3. Bucket name: `ultimate-mobile-apps` (or your preferred name)
4. Region: Choose closest to your users
5. Uncheck "Block all public access" (we need public read access)
6. Acknowledge and create bucket

### 6.2 Configure Bucket for Static Hosting

1. Go to bucket → "Properties"
2. Scroll to "Static website hosting"
3. Enable static website hosting
4. Index document: `index.html`
5. Error document: `index.html` (for client-side routing)
6. Save

### 6.3 Set Bucket Policy

1. Go to bucket → "Permissions" → "Bucket policy"
2. Add this policy (replace `BUCKET_NAME`):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::BUCKET_NAME/*"
    }
  ]
}
```

### 6.4 Upload Files

```bash
# Using AWS CLI
aws s3 sync out/ s3://your-bucket-name --delete

# Or use the S3 Console to upload the contents of the 'out' directory
```

## Step 7: Set Up CloudFront (Optional but Recommended)

### 7.1 Create Distribution

1. Go to CloudFront Console
2. Click "Create distribution"
3. Origin domain: Select your S3 bucket
4. Viewer protocol policy: Redirect HTTP to HTTPS
5. Default root object: `index.html`
6. Create distribution

### 7.2 Configure Custom Domain (Optional)

1. Add your domain in CloudFront settings
2. Request SSL certificate in AWS Certificate Manager
3. Update DNS records

## Step 8: Test Email Functionality

1. Visit your deployed site
2. Go to the Support page
3. Fill out the contact form
4. Submit and verify email is received

## Troubleshooting

### Lambda Function Issues

- Check CloudWatch Logs for errors
- Verify environment variables are set correctly
- Ensure Resend API key is valid

### API Gateway Issues

- Verify CORS is configured correctly
- Check Lambda integration is set up
- Test the endpoint with curl or Postman

### S3 Issues

- Verify bucket policy allows public read
- Check static website hosting is enabled
- Ensure files are uploaded correctly

## Cost Estimation

**Low traffic (~1,000 visitors/month):**
- S3: ~$0.10/month
- Lambda: FREE (within free tier)
- API Gateway: FREE (first 1M requests free for 12 months)
- **Total: ~$0-1/month**

**Medium traffic (~10,000 visitors/month):**
- S3: ~$1/month
- Lambda: ~$0.20/month
- API Gateway: ~$0.01/month
- **Total: ~$1-2/month**

## Security Notes

1. **CORS**: Update CORS settings to your actual domain in production
2. **API Key**: Never expose your Resend API key in client-side code
3. **Rate Limiting**: Consider adding rate limiting to Lambda function
4. **Input Validation**: Lambda function validates input, but you can add more checks

## Next Steps

- Set up custom domain
- Configure CloudFront for better performance
- Add monitoring with CloudWatch
- Set up CI/CD pipeline for automatic deployments

