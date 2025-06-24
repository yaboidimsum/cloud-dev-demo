import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { projectViews, blogViews } from "@/db/schema/views";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const slug = searchParams.get("slug");
  const type = searchParams.get("type"); // "project" or "blog"

  if (!slug || !type) {
    return NextResponse.json({ error: "Missing slug or type parameter" }, { status: 400 });
  }

  try {
    const table = type === "project" ? projectViews : blogViews;
    const result = await db.select().from(table).where(eq(table.slug, slug));
    
    if (result.length === 0) {
      return NextResponse.json({ views: 0 });
    }
    
    return NextResponse.json({ views: result[0].views });
  } catch (error) {
    console.error("Error fetching views:", error);
    return NextResponse.json({ views: 0 }); // Return 0 instead of error for better UX
  }
}

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const slug = searchParams.get("slug");
  const type = searchParams.get("type"); // "project" or "blog"

  if (!slug || !type) {
    return NextResponse.json({ error: "Missing slug or type parameter" }, { status: 400 });
  }

  try {
    const table = type === "project" ? projectViews : blogViews;
    const existingRecord = await db.select().from(table).where(eq(table.slug, slug));
    
    if (existingRecord.length === 0) {
      // Create new record
      await db.insert(table).values({
        slug,
        views: 1,
      });
      return NextResponse.json({ views: 1 });
    } else {
      // Update existing record
      const newViews = existingRecord[0].views + 1;
      await db
        .update(table)
        .set({ 
          views: newViews,
          lastUpdated: new Date()
        })
        .where(eq(table.slug, slug));
      
      return NextResponse.json({ views: newViews });
    }
  } catch (error) {
    console.error("Error updating views:", error);
    return NextResponse.json({ views: 0 }); // Return 0 instead of error for better UX
  }
}