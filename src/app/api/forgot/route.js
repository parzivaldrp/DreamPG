import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/config/mongoose';
import User from '@/app/models/User';
import CryptoJS from 'crypto-js';

export async function POST(req = NextRequest) {
  try {
    await connectDB();
    
    if (req.method === 'POST') {
      const { email, password } = await req.json();
      
      // Decrypt the encrypted password
      
      // Find and update the user's password
      const updatedUser = await User.findOneAndUpdate(
        { email },
        {password},
        { new: true } // Return the updated document
      );
      
      if (!updatedUser) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
      }
      
      return NextResponse.json({ message: 'Password reset successful' });
    } else {
      return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
    }
  } catch (error) {
    console.error('Error resetting password:', error.message);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
