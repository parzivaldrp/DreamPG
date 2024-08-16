import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/config/mongoose';
import FormData from '../../../../models/Multi';

export async function DELETE(req ,{ params }) {
  try {
    await connectDB();

    // Extract the PG ID from the request URL search parameters
    const { id } = params;    
    console.log('Deleting PG with ID:', id); // Add this line for debugging

    // Check if id is available
    if (!id) {
      return NextResponse.json({ error: 'PG ID is required' }, { status: 400 });
    }

    // Find the PG by ID and delete it
    const deletedPG = await FormData.findByIdAndDelete(id);

    if (!deletedPG) {
      // If PG is not found, return 404 Not Found response
      return NextResponse.json({ error: 'PG not found' }, { status: 404 });
    }

    // Return a success response if PG is deleted successfully
    return NextResponse.json({ message: 'PG deleted successfully' });
  } catch (error) {
    // Handle errors and return 500 Internal Server Error response
    console.error('Error deleting PG:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
