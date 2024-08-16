import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/config/mongoose';
import Booking from '../../model/Booking';

export async function GET(req = NextRequest) {
  // Ensure the database is connected
  await connectDB();

  try {
    // Extract search parameters from the request URL
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    // Check if the email query parameter is provided
    if (!email) {
      return NextResponse.json({ error: 'Email query parameter is missing' }, { status: 400 });
    }
console.log(email);
    // Find the booking history associated with the provided email
    const History = await Booking.find({ email });

    // If no history is found, return a 404 status
    if (!History) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    // Return the found booking history as JSON
    return NextResponse.json(History);
  } catch (error) {
    // Log any errors that occur
    console.error('Error fetching Booking History:', error);

    // Return a 500 status if an internal server error occurs
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
