import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/config/mongoose';
import User from '../../model/User';

// Connect to the database
connectDB();

// Get user profile by email
export async function GET(req = NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email query parameter is missing' }, { status: 400 });
    }

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

// Update user profile by email
export async function PUT(req = NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    const updatedData = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email query parameter is missing' }, { status: 400 });
    }

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
