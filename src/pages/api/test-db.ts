import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Test database connection
    await dbConnect();
    
    res.status(200).json({ 
      success: true, 
      message: 'Database connection successful',
      environment: process.env.NODE_ENV,
      hasMongoUri: !!process.env.MONGODB_URI
    });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Database connection failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      environment: process.env.NODE_ENV,
      hasMongoUri: !!process.env.MONGODB_URI
    });
  }
} 