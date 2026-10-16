import { NextRequest, NextResponse } from "next/server";
import { checkAdminAuth } from "@/lib/auth";
import { getDashboardStats, getEnquiries } from "@/lib/dataStore";

export async function GET(request: NextRequest) {
  const auth = await checkAdminAuth(request);
  if (!auth.authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const stats = getDashboardStats();
  const allEnquiries = getEnquiries();
  // Sort descending by submission date
  const sorted = [...allEnquiries].sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  );
  const recent = sorted.slice(0, 5);

  return NextResponse.json({
    success: true,
    stats,
    recentEnquiries: recent,
  });
}
