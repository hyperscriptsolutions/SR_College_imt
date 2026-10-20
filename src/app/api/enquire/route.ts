import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export interface EnquiryPayload {
  fullName: string;
  mobile: string;
  email?: string;
  qualification: string;
  message?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: EnquiryPayload = await request.json();

    const fullName = (body.fullName || "").trim();
    const mobile = (body.mobile || "").trim();
    const email = (body.email || "").trim();
    const qualification = (body.qualification || "").trim();
    const message = (body.message || "").trim();

    // Field Validations
    if (!fullName || fullName.length < 2) {
      return NextResponse.json(
        { success: false, error: "Please enter your full name (minimum 2 characters)." },
        { status: 400 }
      );
    }

    // Indian 10-digit mobile number starting with 6, 7, 8, or 9
    const phoneRegex = /^[6-9]\d{9}$/;
    const sanitizedMobile = mobile.replace(/[\s\-+]/g, "").slice(-10);

    if (!phoneRegex.test(sanitizedMobile)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid 10-digit Indian mobile number." },
        { status: 400 }
      );
    }

    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { success: false, error: "Please provide a valid email address or leave it blank." },
          { status: 400 }
        );
      }
    }

    if (!qualification) {
      return NextResponse.json(
        { success: false, error: "Please select your highest educational qualification." },
        { status: 400 }
      );
    }

    // Generate unique inquiry reference code
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const enquiryId = `SR-DHLS-${randomSuffix}`;
    const timestamp = new Date().toISOString();

    const newEnquiry = {
      enquiryId,
      fullName,
      mobile: sanitizedMobile,
      email: email || null,
      qualification,
      message: message || "General DHLS Course Enquiry",
      course: "Diploma in Hearing Language and Speech (DHLS)",
      institution: "S.R College of Education, Rohtak",
      submittedAt: timestamp,
      status: "PENDING_COLLEGE_CONTACT",
    };

    // Store in a local audit file inside .enquiries storage if writable
    try {
      const storageDir = path.join(process.cwd(), ".data");
      if (!fs.existsSync(storageDir)) {
        fs.mkdirSync(storageDir, { recursive: true });
      }
      const filePath = path.join(storageDir, "dhls_enquiries.json");
      let existing: unknown[] = [];
      if (fs.existsSync(filePath)) {
        try {
          const content = fs.readFileSync(filePath, "utf-8");
          existing = JSON.parse(content);
        } catch {
          existing = [];
        }
      }
      existing.push(newEnquiry);
      fs.writeFileSync(filePath, JSON.stringify(existing, null, 2), "utf-8");
    } catch (fsErr) {
      console.warn("Local storage write skipped:", fsErr);
    }

    console.log(`[DHLS Admission Enquiry Received] ${enquiryId} - ${fullName} (${sanitizedMobile})`);

    return NextResponse.json({
      success: true,
      enquiryId,
      message:
        "Thank you! Your DHLS enquiry has been recorded with S.R College of Education. Our admissions representative will contact you via phone shortly.",
      details: {
        enquiryId,
        fullName,
        mobile: sanitizedMobile,
        submittedAt: timestamp,
      },
    });
  } catch (error) {
    console.error("Enquiry processing error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred while processing your enquiry. Please call the college directly.",
      },
      { status: 500 }
    );
  }
}
