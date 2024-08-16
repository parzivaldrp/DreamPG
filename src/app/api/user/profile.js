// api/user/profile.js
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/config/mongoose';
import User from '../../model/User'

export async function GET(req = NextRequest) {
  await connectDB();

  const { email } = req.query;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req = NextRequest) {
  await connectDB();

  const { email } = req.query;
  const updatedData = await req.json();

  try {
    const user = await User.findOneAndUpdate({ email }, updatedData, { new: true });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error updating user profile:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
