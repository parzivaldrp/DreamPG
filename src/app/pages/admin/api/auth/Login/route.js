import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../../config/mongoose';
import User from '../../../../../model/User'
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';

// Encryption key (replace 'your_actual_secret_key' with your actual secret key)
const SECRET_KEY = 'DrP.(07)';

export async function POST(req) {
  try {
    await connectDB();

    const reqBody = await req.json();
    const { email, password } = reqBody;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return NextResponse.json({ error: 'User does not exist' }, { status: 400 });
    }

    const decryptedPass = CryptoJS.AES.decrypt(existingUser.password, SECRET_KEY).toString(CryptoJS.enc.Utf8);

    if (password !== decryptedPass) {
      return NextResponse.json({ error: 'Invalid Password' }, { status: 401 });
    }

    if (existingUser.isAdmin !== 'true') {
      return NextResponse.json({ error: 'Access denied. Admins only.' }, { status: 403 });
    }

    // Create token data (include role)
    const tokenData = {
      id: existingUser._id,
      email: existingUser.email,
      isAdmin: existingUser.isAdmin, // Include the isAdmin status in the token
    };

    // Sign JWT token
    const admintoken = jwt.sign(tokenData, SECRET_KEY, { expiresIn: '1m' });

    // Return response with token
    return NextResponse.json({
      message: 'Login successful',
      success: true,
      token: admintoken,
    });
  } catch (error) {
    console.error('Error at user login:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
