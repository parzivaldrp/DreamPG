import connectDB from '../../../config/mongoose';
import User from '../../model/User';
import CryptoJS from 'crypto-js';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req = NextRequest) {
  if (req.method === 'POST') {
    try {
      await connectDB();
      const reqBody = await req.json();
      const { name, email, mobile, gender, password, age ,isAdmin } = reqBody;
      console.log('Request body:', reqBody);


      // Check for existing user *before* creating the new user object
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return NextResponse.json({ message: 'Email already exists' }, { status: 409 }); // Use 409 Conflict status code
      }

      // Encrypt the password using CryptoJS
      const encryptedPass = CryptoJS.AES.encrypt(password, 'DrP.(07)').toString();
      const newUser = new User({
        name,
        email,
        mobile,
        gender,
        password: encryptedPass, // Storing encrypted password
        age,
        isAdmin,
      });

      const user = await newUser.save();

      return NextResponse.json({
        message: "User created successfully",
        success: true,
        user
      });
    } catch (err) {
      console.error('Error in the signup:', err.message);
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }
}