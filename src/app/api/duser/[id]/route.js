// deleteUser.js
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/config/mongoose';
import User from '../../../../models/User';

export async function DELETE(req = NextRequest, { params}) {
  try {
    await connectDB();

    const { id } = params;    

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
