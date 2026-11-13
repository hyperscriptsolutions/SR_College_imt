import { NextRequest, NextResponse } from "next/server";
import { getCourseOfferings, updateCourseOfferings, CourseOffering } from "@/lib/dataStore";

export async function GET() {
  try {
    const courses = getCourseOfferings();
    return NextResponse.json({ success: true, courses });
  } catch (error) {
    console.error("Failed to load courses:", error);
    return NextResponse.json({ success: false, error: "Failed to load courses" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    if (!Array.isArray(body.courses)) {
      return NextResponse.json(
        { success: false, error: "Invalid courses payload; expected array" },
        { status: 400 }
      );
    }
    const updated = updateCourseOfferings(body.courses as CourseOffering[]);
    return NextResponse.json({ success: true, courses: updated });
  } catch (error) {
    console.error("Failed to update courses:", error);
    return NextResponse.json({ success: false, error: "Failed to update courses" }, { status: 500 });
  }
}

