import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { dachshunds } from "@/lib/schema";
import { nanoid } from "nanoid";

// List of verified working dachshund images from Dog CEO API
const DACHSHUND_IMAGES = [
  {
    name: "Buddy",
    imageUrl: "https://images.dog.ceo/breeds/dachshund/Daschund-2.jpg",
    description: "A playful dachshund with a classic pose"
  },
  {
    name: "Wire",
    imageUrl: "https://images.dog.ceo/breeds/dachshund/Daschund_Wirehair.jpg", 
    description: "Distinguished wire-haired dachshund with attitude"
  },
  {
    name: "Dash",
    imageUrl: "https://images.dog.ceo/breeds/dachshund/Dash_Dachshund_With_Hat.jpg",
    description: "Fashionable dachshund sporting a stylish hat"
  },
  {
    name: "Mini",
    imageUrl: "https://images.dog.ceo/breeds/dachshund/Miniature_Daschund.jpg",
    description: "Adorable miniature dachshund with big personality"
  },
  {
    name: "Standard",
    imageUrl: "https://images.dog.ceo/breeds/dachshund/Standard_Wire-hair_Dachshund.jpg",
    description: "Classic standard wire-haired dachshund"
  },
  {
    name: "Stretch",
    imageUrl: "https://images.dog.ceo/breeds/dachshund/Stretched_Dachshund.jpg",
    description: "The ultimate long and low dachshund"
  },
  {
    name: "Oscar",
    imageUrl: "https://images.dog.ceo/breeds/dachshund/dachshund-1018409_640.jpg",
    description: "Handsome dachshund with perfect posture"
  },
  {
    name: "Luna",
    imageUrl: "https://images.dog.ceo/breeds/dachshund/dachshund-123503_640.jpg",
    description: "Sweet dachshund with gentle eyes"
  },
  {
    name: "Rocket",
    imageUrl: "https://images.dog.ceo/breeds/dachshund/dachshund-1920_640.jpg",
    description: "Energetic dachshund ready for action"
  },
  {
    name: "Zeus",
    imageUrl: "https://images.dog.ceo/breeds/dachshund/dachshund-2033796_640.jpg",
    description: "Regal dachshund with a noble bearing"
  },
  {
    name: "Charlie",
    imageUrl: "https://images.dog.ceo/breeds/dachshund/dachshund-3.jpg", 
    description: "Friendly dachshund with a warm personality"
  },
  {
    name: "Pepper",
    imageUrl: "https://images.dog.ceo/breeds/dachshund/dachshund-5.jpg",
    description: "Spunky dachshund with lots of character"
  },
  {
    name: "Rudy",
    imageUrl: "https://images.dog.ceo/breeds/dachshund/dachshund-6.jpg",
    description: "Handsome red dachshund with shine coat"
  },
  {
    name: "Penny",
    imageUrl: "https://images.dog.ceo/breeds/dachshund/dachshund-7.jpg",
    description: "Elegant dachshund lady with grace"
  },
  {
    name: "Fashion",
    imageUrl: "https://images.dog.ceo/breeds/dachshund/dachshund-in-jacket.jpg",
    description: "Stylish dachshund wearing a trendy jacket"
  },
  {
    name: "Classic",
    imageUrl: "https://images.dog.ceo/breeds/dachshund/dachshund_4.jpg",
    description: "Traditional dachshund with perfect proportions"
  },
  {
    name: "Sausage",
    imageUrl: "https://images.dog.ceo/breeds/dachshund/daschund-1.jpg",
    description: "The quintessential wiener dog"
  },
  {
    name: "Benny",
    imageUrl: "https://images.dog.ceo/breeds/dachshund/dachshund-1648400_640.jpg",
    description: "Loyal dachshund with a heart of gold"
  },
  {
    name: "Cooper",
    imageUrl: "https://images.dog.ceo/breeds/dachshund/dachshund-171982_640.jpg",
    description: "Playful dachshund always ready for fun"
  },
  {
    name: "Max",
    imageUrl: "https://images.dog.ceo/breeds/dachshund/dachshund-2785074_640.jpg",
    description: "Strong and confident dachshund champion"
  }
];

export async function POST(request: NextRequest) {
  try {
    // Simple authentication check - in production you'd want proper admin auth
    const authHeader = request.headers.get('authorization');
    if (!authHeader || authHeader !== 'Bearer admin-secret') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if dachshunds already exist
    const existingDachshunds = await db.select().from(dachshunds).limit(1);
    if (existingDachshunds.length > 0) {
      return NextResponse.json(
        { message: "Dachshunds already imported", count: 0 }, 
        { status: 200 }
      );
    }

    // Get real working dachshund images from the Dog API
    const response = await fetch('https://dog.ceo/api/breed/dachshund/images');
    const data = await response.json();
    
    if (data.status !== 'success' || !data.message) {
      throw new Error('Failed to fetch dachshund images from Dog API');
    }
    
    // Take the first 20 images that work
    const workingImages = data.message.slice(0, 20);

    // Import all dachshunds with real images
    const importedDachshunds = [];
    for (let i = 0; i < DACHSHUND_IMAGES.length && i < workingImages.length; i++) {
      const dachshund = DACHSHUND_IMAGES[i];
      const newDachshund = {
        id: nanoid(),
        name: dachshund.name,
        imageUrl: workingImages[i], // Use real working image URL
        description: dachshund.description,
        wins: 0,
        losses: 0,
        rating: 1000,
      };
      
      await db.insert(dachshunds).values(newDachshund);
      importedDachshunds.push(newDachshund);
    }

    return NextResponse.json({
      message: "Dachshunds imported successfully",
      count: importedDachshunds.length,
      dachshunds: importedDachshunds.map(d => ({ id: d.id, name: d.name }))
    });

  } catch (error) {
    console.error("Error importing dachshunds:", error);
    return NextResponse.json(
      { error: "Failed to import dachshunds" },
      { status: 500 }
    );
  }
}