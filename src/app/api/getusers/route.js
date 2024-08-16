// listUsers.js
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/config/mongoose';
import User from '../../../models/User';

export async function GET(req = NextRequest) {
  try {
    await connectDB();

    const users = await User.find();
    return NextResponse.json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
