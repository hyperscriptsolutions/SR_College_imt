import { NextRequest, NextResponse } from "next/server";
import { checkAdminAuth } from "@/lib/auth";
import { getCourseContent, updateCourseContent, CourseContent } from "@/lib/dataStore";

export async function GET(request: NextRequest) {
  const auth = await checkAdminAuth(request);
  if (!auth.authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const content = getCourseContent();
  return NextResponse.json({ success: true, content });
}

export async function PUT(request: NextRequest) {
  const auth = await checkAdminAuth(request);
  if (!auth.authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body: Partial<CourseContent> = await request.json();

    if (!body.courseTitle?.trim()) {
      return NextResponse.json({ success: false, error: "Course title is required." }, { status: 400 });
    }
    if (!body.heroHeadline?.trim()) {
      return NextResponse.json({ success: false, error: "Hero headline is required." }, { status: 400 });
    }
    if (!body.duration?.trim()) {
      return NextResponse.json({ success: false, error: "Duration is required." }, { status: 400 });
    }
    if (!body.eligibility?.trim()) {
      return NextResponse.json({ success: false, error: "Eligibility is required." }, { status: 400 });
    }

    const updated = updateCourseContent(body);
    return NextResponse.json({
      success: true,
      message: "DHLS course content updated successfully.",
      content: updated,
    });
  } catch (error) {
    console.error("Content update error:", error);
    return NextResponse.json({ success: false, error: "Failed to update content." }, { status: 500 });
  }
}
