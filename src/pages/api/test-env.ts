import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Get all environment variables
  const env = process.env;
  
  // Create a safe version of the environment to display
  const safeEnv = {
    // Show if variables exist and their first few characters
    GMAIL_CLIENT_ID: env.GMAIL_CLIENT_ID ? `Present (${env.GMAIL_CLIENT_ID.substring(0, 8)}...)` : 'Missing',
    GMAIL_CLIENT_SECRET: env.GMAIL_CLIENT_SECRET ? `Present (${env.GMAIL_CLIENT_SECRET.substring(0, 8)}...)` : 'Missing',
    GMAIL_ACCESS_TOKEN: env.GMAIL_ACCESS_TOKEN ? 'Present' : 'Missing',
    GMAIL_REFRESH_TOKEN: env.GMAIL_REFRESH_TOKEN ? 'Present' : 'Missing',
    NODE_ENV: env.NODE_ENV,
    VERCEL_ENV: env.VERCEL_ENV,
    VERCEL_URL: env.VERCEL_URL,
    // Request information
    REQUEST_INFO: {
      host: req.headers.host,
      protocol: req.headers['x-forwarded-proto'] || 'http',
      vercelUrl: req.headers['x-vercel-deployment-url']
    }
  };

  res.status(200).json(safeEnv);
} 