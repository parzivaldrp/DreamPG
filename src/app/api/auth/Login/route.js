import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../../config/mongoose';
import User from '../../../models/User';
import CryptoJS from 'crypto-js';
import jwt from "jsonwebtoken";

// Encryption key (replace 'your_actual_secret_key' with your actual secret key)
const SECRET_KEY = 'DrP.(07)';

export async function POST(req = NextRequest) {
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

    // Create token data (include role)
    const tokenData = {
      id: existingUser._id,
      email: existingUser.email,
    };
    console.log(tokenData);

    // Sign JWT token
    const token = jwt.sign(tokenData, SECRET_KEY, { expiresIn: "1m" });

    // Return response with token
    const response = NextResponse.json({
      message: 'Login successful',
      success: true,
      token: token
    });

    // Set token as a cookie (for future server-side requests)
    response.cookies.set('token', token, { httpOnly: true }); 

    return response; // Note: No redirection here, the client handles redirection based on role

  } catch (error) {
    console.error('Error at user login:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}