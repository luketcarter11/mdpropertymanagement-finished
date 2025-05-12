import { OAuth2Client } from 'google-auth-library';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Get the host and protocol
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const host = req.headers.host || 'localhost:3000';
  
  // Handle domain normalization (same as auth endpoint)
  let normalizedHost = host;
  if (process.env.NODE_ENV === 'production') {
    normalizedHost = host.split(':')[0];
    if (!normalizedHost.startsWith('www.')) {
      normalizedHost = `www.${normalizedHost}`;
    }
    normalizedHost = normalizedHost.replace(/^www\.www\./, 'www.');
  }
  
  const redirectUri = `${protocol}://${normalizedHost}/api/auth/callback/google`;

  // Debug information
  const debugInfo = {
    environment: {
      NODE_ENV: process.env.NODE_ENV,
      VERCEL_ENV: process.env.VERCEL_ENV,
      VERCEL_URL: process.env.VERCEL_URL
    },
    request: {
      originalHost: host,
      normalizedHost,
      protocol,
      redirectUri,
      query: req.query,
      headers: {
        'x-forwarded-proto': req.headers['x-forwarded-proto'],
        'x-vercel-deployment-url': req.headers['x-vercel-deployment-url'],
        referer: req.headers.referer
      }
    },
    auth: {
      clientIdPresent: !!process.env.GMAIL_CLIENT_ID,
      clientSecretPresent: !!process.env.GMAIL_CLIENT_SECRET
    }
  };

  console.log('Callback Debug Info:', JSON.stringify(debugInfo, null, 2));

  const { code, error } = req.query;

  // Handle OAuth errors
  if (error) {
    console.error('OAuth error:', error);
    return res.status(400).json({ 
      error: 'OAuth Error',
      details: error,
      debug: debugInfo
    });
  }

  if (!code || typeof code !== 'string') {
    return res.status(400).json({ 
      error: 'Invalid Request',
      message: 'No authorization code provided',
      debug: debugInfo
    });
  }

  // Check for required environment variables
  if (!process.env.GMAIL_CLIENT_ID || !process.env.GMAIL_CLIENT_SECRET) {
    return res.status(500).json({
      error: 'Configuration Error',
      message: 'Missing required environment variables',
      debug: debugInfo
    });
  }

  try {
    const oAuth2Client = new OAuth2Client(
      process.env.GMAIL_CLIENT_ID,
      process.env.GMAIL_CLIENT_SECRET,
      redirectUri
    );

    const { tokens } = await oAuth2Client.getToken(code);
    console.log('Tokens received:', {
      hasAccessToken: !!tokens.access_token,
      hasRefreshToken: !!tokens.refresh_token,
      expiryDate: tokens.expiry_date
    });

    // Return success page with tokens
    res.setHeader('Content-Type', 'text/html');
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Gmail API Authentication Success</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              max-width: 800px; 
              margin: 2rem auto; 
              padding: 0 1rem;
              line-height: 1.6;
            }
            pre { 
              background: #f5f5f5; 
              padding: 1rem; 
              overflow-x: auto;
              border-radius: 4px;
            }
            .warning { 
              color: #721c24; 
              background-color: #f8d7da; 
              padding: 1rem; 
              border-radius: 4px; 
              margin: 1rem 0;
            }
            .success {
              color: #155724;
              background-color: #d4edda;
              padding: 1rem;
              border-radius: 4px;
              margin: 1rem 0;
            }
          </style>
        </head>
        <body>
          <h1>Authentication Successful! 🎉</h1>
          
          <div class="success">
            <strong>Success!</strong> Your Gmail API authentication was completed successfully.
          </div>
          
          <div class="warning">
            <strong>Important:</strong> Copy these tokens immediately! They will only be shown once.
          </div>

          <h2>1. Add these tokens to your .env.local file:</h2>
          <pre>
GMAIL_ACCESS_TOKEN=${tokens.access_token}
GMAIL_REFRESH_TOKEN=${tokens.refresh_token}</pre>

          <h2>2. Add the same tokens to your production environment variables.</h2>
          
          <h2>3. Restart your Next.js server after adding the tokens.</h2>
          
          <p>Your Gmail API integration should now be ready to use!</p>
          
          <script>
            // Select pre content on click for easy copying
            document.querySelector('pre').addEventListener('click', function() {
              const range = document.createRange();
              range.selectNode(this);
              window.getSelection().removeAllRanges();
              window.getSelection().addRange(range);
            });
          </script>
        </body>
      </html>
    `);
  } catch (error) {
    console.error('Error getting tokens:', error);
    res.status(500).json({ 
      error: 'Token Exchange Failed',
      message: error instanceof Error ? error.message : 'Unknown error',
      debug: debugInfo
    });
  }
}