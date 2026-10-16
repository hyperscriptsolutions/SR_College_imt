import { NextRequest, NextResponse } from "next/server";
import { checkAdminAuth } from "@/lib/auth";
import { getAdminAccount } from "@/lib/dataStore";

export async function GET(request: NextRequest) {
  const auth = await checkAdminAuth(request);
  if (!auth.authorized) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const admin = await getAdminAccount();
  return NextResponse.json({
    authenticated: true,
    user: {
      username: admin.username,
      email: admin.email,
      lastLogin: admin.lastLogin,
    },
  });
}
