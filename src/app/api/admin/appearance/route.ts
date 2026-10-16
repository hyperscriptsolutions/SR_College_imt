import { NextRequest, NextResponse } from "next/server";
import { checkAdminAuth } from "@/lib/auth";
import { getAppearanceSettings, updateAppearanceSettings, AppearanceSettings } from "@/lib/dataStore";

export async function GET(request: NextRequest) {
  const auth = await checkAdminAuth(request);
  if (!auth.authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const appearance = getAppearanceSettings();
  return NextResponse.json({ success: true, appearance });
}

export async function PUT(request: NextRequest) {
  const auth = await checkAdminAuth(request);
  if (!auth.authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body: Partial<AppearanceSettings> = await request.json();
    const updated = updateAppearanceSettings(body);

    return NextResponse.json({
      success: true,
      message: "Appearance settings updated successfully.",
      appearance: updated,
    });
  } catch (error) {
    console.error("Update appearance error:", error);
    return NextResponse.json({ success: false, error: "Failed to update appearance." }, { status: 500 });
  }
}
