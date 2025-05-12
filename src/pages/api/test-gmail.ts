import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Get the host and protocol
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const host = req.headers.host || 'localhost:3000';
  
  // Handle domain normalization
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
      VERCEL_URL: process.env.VERCEL_URL,
      credentials: {
        hasClientId: !!process.env.GMAIL_CLIENT_ID,
        hasClientSecret: !!process.env.GMAIL_CLIENT_SECRET,
        hasAccessToken: !!process.env.GMAIL_ACCESS_TOKEN,
        hasRefreshToken: !!process.env.GMAIL_REFRESH_TOKEN,
        clientIdPrefix: process.env.GMAIL_CLIENT_ID ? process.env.GMAIL_CLIENT_ID.substring(0, 8) : null,
        accessTokenPrefix: process.env.GMAIL_ACCESS_TOKEN ? process.env.GMAIL_ACCESS_TOKEN.substring(0, 8) : null
      }
    },
    request: {
      originalHost: host,
      normalizedHost,
      protocol,
      redirectUri,
      headers: {
        'x-forwarded-proto': req.headers['x-forwarded-proto'],
        'x-vercel-deployment-url': req.headers['x-vercel-deployment-url'],
        referer: req.headers.referer
      }
    }
  };

  console.log('Gmail Test Debug Info:', JSON.stringify(debugInfo, null, 2));

  try {
    const oAuth2Client = new OAuth2Client(
      process.env.GMAIL_CLIENT_ID,
      process.env.GMAIL_CLIENT_SECRET,
      redirectUri
    );

    // Set credentials
    oAuth2Client.setCredentials({
      refresh_token: process.env.GMAIL_REFRESH_TOKEN,
      access_token: process.env.GMAIL_ACCESS_TOKEN,
    });

    // Get Gmail service
    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

    // Test Gmail API connection
    const profile = await gmail.users.getProfile({
      userId: 'me'
    });

    res.status(200).json({
      success: true,
      message: 'Gmail API connection successful',
      email: profile.data.emailAddress,
      debug: debugInfo
    });
  } catch (error) {
    console.error('Gmail API test error:', error);
    
    // Determine error type and provide specific message
    let errorType = 'Unknown Error';
    let errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    if (errorMessage.includes('invalid_grant')) {
      errorType = 'Invalid Grant';
      errorMessage = 'The refresh token is invalid or has been revoked. Please re-authenticate.';
    } else if (errorMessage.includes('invalid_client')) {
      errorType = 'Invalid Client';
      errorMessage = 'The client ID or client secret is invalid. Please check your credentials.';
    } else if (errorMessage.includes('invalid_request')) {
      errorType = 'Invalid Request';
      errorMessage = 'The request is malformed. Please check the redirect URI and other parameters.';
    }

    res.status(500).json({
      success: false,
      error: errorType,
      message: errorMessage,
      debug: debugInfo
    });
  }
} 