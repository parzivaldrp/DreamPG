import { NextRequest, NextResponse } from 'next/server';

import FormData from '../../../app/models/Multi'
import connectDB from '../../../config/mongoose'
export async function GET(req=nextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('whoCanStay');
    console.log('category',category);
    const idealFor = searchParams.get('idealFor');
    console.log('idealFor', idealFor);
    const budget = searchParams.get('budgetRange');
console.log('budget', budget)
    let filters = {};
    if (category) filters.whoCanStay = category;
    if (idealFor) filters.idealFor = idealFor;
    if (budget) { filters.budgetRange =budget; 
    }

    console.log('Filters:', filters);
    const pgs = await FormData.find(filters);
    console.log('Fetched PGs:', pgs);
    return NextResponse.json({ pgs });
  } catch (error) {
    console.error('Error fetching PGs:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
