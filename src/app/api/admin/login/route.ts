import { NextRequest, NextResponse } from "next/server";
import { getAdminAccount, updateAdminAccount } from "@/lib/dataStore";
import { verifyPassword, createSessionToken, setSessionCookie } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const username = (body.username || "").trim();
    const password = (body.password || "").trim();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: "Please enter both username and password." },
        { status: 400 }
      );
    }

    const admin = await getAdminAccount();

    if (username !== admin.username) {
      // Time-constant dummy comparison
      await verifyPassword(password, admin.passwordHash, admin.passwordSalt);
      return NextResponse.json(
        { success: false, error: "Invalid admin credentials." },
        { status: 401 }
      );
    }

    const isValid = await verifyPassword(password, admin.passwordHash, admin.passwordSalt);
    if (!isValid) {
      return NextResponse.json(
        { success: false, error: "Invalid admin credentials." },
        { status: 401 }
      );
    }

    // Record login timestamp
    await updateAdminAccount({ lastLogin: new Date().toISOString() });

    // Generate signed session token & set HTTP-only cookie
    const token = await createSessionToken(username);
    const response = NextResponse.json({
      success: true,
      message: "Authentication successful.",
      user: {
        username: admin.username,
        email: admin.email,
      },
    });

    setSessionCookie(response, token);
    return response;
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { success: false, error: "Authentication system error." },
      { status: 500 }
    );
  }
}
