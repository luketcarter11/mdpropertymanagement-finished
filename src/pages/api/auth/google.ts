import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Get the host and protocol
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const host = req.headers.host || 'localhost:3000';
  
  // Handle domain normalization
  let normalizedHost = host;
  if (process.env.NODE_ENV === 'production') {
    // Remove port if present
    normalizedHost = host.split(':')[0];
    
    // Ensure www subdomain in production
    if (!normalizedHost.startsWith('www.')) {
      normalizedHost = `www.${normalizedHost}`;
    }
    
    // Remove any duplicate www
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

  console.log('Auth Debug Info:', JSON.stringify(debugInfo, null, 2));

  // Check for missing environment variables
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

    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: [
        'https://www.googleapis.com/auth/gmail.send',
        'https://www.googleapis.com/auth/gmail.compose',
        'https://www.googleapis.com/auth/gmail.modify'
      ],
      prompt: 'consent'
    });

    console.log('Generated Auth URL:', authUrl);
    
    // Return both the auth URL and debug info
    res.status(200).json({
      authUrl,
      debug: debugInfo
    });
  } catch (error) {
    console.error('Error generating auth URL:', error);
    res.status(500).json({
      error: 'Failed to generate auth URL',
      message: error instanceof Error ? error.message : 'Unknown error',
      debug: debugInfo
    });
  }
} 