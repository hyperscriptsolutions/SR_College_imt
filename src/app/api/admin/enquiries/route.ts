import { NextRequest, NextResponse } from "next/server";
import { checkAdminAuth } from "@/lib/auth";
import { getEnquiries, updateEnquiryStatus, saveEnquiries } from "@/lib/dataStore";

export async function GET(request: NextRequest) {
  const auth = await checkAdminAuth(request);
  if (!auth.authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const search = (searchParams.get("search") || "").toLowerCase().trim();
  const statusFilter = searchParams.get("status") || "ALL";
  const exportCsv = searchParams.get("export") === "csv";

  let enquiries = getEnquiries();

  // Search filter (name or mobile)
  if (search) {
    enquiries = enquiries.filter(
      (e) =>
        e.fullName.toLowerCase().includes(search) ||
        e.mobile.includes(search) ||
        (e.email && e.email.toLowerCase().includes(search)) ||
        e.enquiryId.toLowerCase().includes(search)
    );
  }

  // Status filter
  if (statusFilter !== "ALL") {
    enquiries = enquiries.filter((e) => e.status === statusFilter);
  }

  // Sort descending by submission date
  enquiries.sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  );

  // CSV Export handler
  if (exportCsv) {
    const csvHeader = "Enquiry ID,Full Name,Mobile,Email,Qualification,Status,Submitted At,Message\n";
    const csvRows = enquiries.map((e) => {
      const cleanMsg = (e.message || "").replace(/"/g, '""');
      return `"${e.enquiryId}","${e.fullName}","${e.mobile}","${e.email || ""}","${e.qualification}","${e.status}","${e.submittedAt}","${cleanMsg}"`;
    });
    const csvContent = csvHeader + csvRows.join("\n");

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="SR_College_DHLS_Enquiries_${Date.now()}.csv"`,
      },
    });
  }

  return NextResponse.json({
    success: true,
    total: enquiries.length,
    enquiries,
  });
}

export async function PATCH(request: NextRequest) {
  const auth = await checkAdminAuth(request);
  if (!auth.authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { enquiryId, status, notes } = body;

    if (!enquiryId || !["New", "Contacted", "Resolved"].includes(status)) {
      return NextResponse.json(
        { success: false, error: "Invalid enquiry ID or status." },
        { status: 400 }
      );
    }

    const updated = updateEnquiryStatus(enquiryId, status, notes);
    if (!updated) {
      return NextResponse.json({ success: false, error: "Enquiry not found." }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: `Enquiry status updated to ${status}.`,
      enquiry: updated,
    });
  } catch (error) {
    console.error("Update enquiry error:", error);
    return NextResponse.json({ success: false, error: "Failed to update enquiry." }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const auth = await checkAdminAuth(request);
  if (!auth.authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const enquiryId = searchParams.get("enquiryId");
    if (!enquiryId) {
      return NextResponse.json({ success: false, error: "Missing enquiry ID." }, { status: 400 });
    }

    const enquiries = getEnquiries();
    const filtered = enquiries.filter((e) => e.enquiryId !== enquiryId);
    saveEnquiries(filtered);

    return NextResponse.json({
      success: true,
      message: "Enquiry deleted successfully.",
    });
  } catch (error) {
    console.error("Delete enquiry error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete enquiry." }, { status: 500 });
  }
}
