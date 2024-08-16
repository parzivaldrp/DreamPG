import { NextRequest, NextResponse } from 'next/server';
import FormData from '../../../../../model/Multi'
import fs from 'fs';
import path from 'path';
import connectDB from '@/config/mongoose';

export async function POST(req = NextRequest) {
  if (req.method === 'POST') {
    await connectDB();

    try {
      // Parse the request body using req.json()
      const formData = await req.json();
      console.log('Request Body:', formData);

      const { propertyImages, description, budgetRange } = formData;

      // Save the images to the public folder and get paths
      const imagePaths = [];
      for (let i = 0; i < propertyImages.length; i++) {
        const base64Data = propertyImages[i].split(',')[1]; 
        const imageName = `${Date.now()}_${i}.jpg`;
        const filePath = path.join('public', 'uploads', imageName);
        const fullPath = path.join(process.cwd(), filePath);
        fs.writeFileSync(fullPath, base64Data, 'base64');
        imagePaths.push(`/uploads/${imageName}`); 
      }

      // Store the paths of the saved images in the formData
      const formDataWithImagePaths = { ...formData, propertyImages: imagePaths ,
        description,
        budgetRange
      };

      // Create a new FormData document with the form data
      const newFormData = new FormData(formDataWithImagePaths);
      await newFormData.save();

      return NextResponse.json({ message: 'Form data submitted successfully' });
    } catch (error) {
      console.error('Error saving form data:', error.message);
      return NextResponse.json({ error: 'Failed to submit form data' }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }
}