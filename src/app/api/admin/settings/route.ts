import { NextRequest, NextResponse } from "next/server";
import { checkAdminAuth, hashPassword, verifyPassword } from "@/lib/auth";
import { getAdminAccount, updateAdminAccount } from "@/lib/dataStore";

export async function GET(request: NextRequest) {
  const auth = await checkAdminAuth(request);
  if (!auth.authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = await getAdminAccount();
  return NextResponse.json({
    success: true,
    user: {
      username: admin.username,
      email: admin.email,
      lastLogin: admin.lastLogin,
    },
  });
}

export async function PUT(request: NextRequest) {
  const auth = await checkAdminAuth(request);
  if (!auth.authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { currentPassword, newPassword, email } = body;

    const admin = await getAdminAccount();

    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json(
          { success: false, error: "Current password is required to set a new password." },
          { status: 400 }
        );
      }

      const isCurrentValid = await verifyPassword(currentPassword, admin.passwordHash, admin.passwordSalt);
      if (!isCurrentValid) {
        return NextResponse.json(
          { success: false, error: "Current password is incorrect." },
          { status: 400 }
        );
      }

      if (newPassword.length < 8) {
        return NextResponse.json(
          { success: false, error: "New password must be at least 8 characters long." },
          { status: 400 }
        );
      }

      const { hash, salt } = await hashPassword(newPassword);
      await updateAdminAccount({
        passwordHash: hash,
        passwordSalt: salt,
        email: email?.trim() || admin.email,
      });

      return NextResponse.json({
        success: true,
        message: "Admin password updated successfully.",
      });
    }

    if (email?.trim()) {
      await updateAdminAccount({ email: email.trim() });
      return NextResponse.json({
        success: true,
        message: "Admin email updated successfully.",
      });
    }

    return NextResponse.json({ success: false, error: "No changes provided." }, { status: 400 });
  } catch (error) {
    console.error("Settings update error:", error);
    return NextResponse.json({ success: false, error: "Failed to update settings." }, { status: 500 });
  }
}
