import { NextResponse } from "next/server";
import { getCourseContent, getCurriculum, getFAQs, getAppearanceSettings } from "@/lib/dataStore";

export async function GET() {
  try {
    const content = getCourseContent();
    const curriculum = getCurriculum().map((sem) => ({
      ...sem,
      subjects: sem.subjects.filter((s) => s.isPublished),
    }));
    const faqs = getFAQs().filter((f) => f.isPublished);
    const appearance = getAppearanceSettings();

    return NextResponse.json({
      success: true,
      content,
      curriculum,
      faqs,
      appearance,
    });
  } catch (error) {
    console.error("Public content error:", error);
    return NextResponse.json({ success: false, error: "Failed to load content." }, { status: 500 });
  }
}
