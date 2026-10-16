import { NextRequest, NextResponse } from "next/server";
import { checkAdminAuth } from "@/lib/auth";
import { getFAQs, saveFAQs, FAQItem } from "@/lib/dataStore";

export async function GET(request: NextRequest) {
  const auth = await checkAdminAuth(request);
  if (!auth.authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const faqs = getFAQs();
  return NextResponse.json({ success: true, faqs });
}

export async function POST(request: NextRequest) {
  const auth = await checkAdminAuth(request);
  if (!auth.authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { question, answer } = body;

    if (!question?.trim() || !answer?.trim()) {
      return NextResponse.json(
        { success: false, error: "Question and answer are required." },
        { status: 400 }
      );
    }

    const faqs = getFAQs();
    const newFaq: FAQItem = {
      id: `faq-${Date.now().toString().slice(-4)}`,
      question: question.trim(),
      answer: answer.trim(),
      isPublished: true,
      sortOrder: faqs.length + 1,
    };

    faqs.push(newFaq);
    saveFAQs(faqs);

    return NextResponse.json({
      success: true,
      message: "FAQ added successfully.",
      faq: newFaq,
      faqs,
    });
  } catch (error) {
    console.error("Add FAQ error:", error);
    return NextResponse.json({ success: false, error: "Failed to add FAQ." }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const auth = await checkAdminAuth(request);
  if (!auth.authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, question, answer, isPublished, moveDirection } = body;

    const faqs = getFAQs();
    const index = faqs.findIndex((f) => f.id === id);
    if (index === -1) {
      return NextResponse.json({ success: false, error: "FAQ not found." }, { status: 404 });
    }

    if (moveDirection === "up" && index > 0) {
      const temp = faqs[index];
      faqs[index] = faqs[index - 1];
      faqs[index - 1] = temp;
    } else if (moveDirection === "down" && index < faqs.length - 1) {
      const temp = faqs[index];
      faqs[index] = faqs[index + 1];
      faqs[index + 1] = temp;
    } else {
      if (question !== undefined) faqs[index].question = question.trim();
      if (answer !== undefined) faqs[index].answer = answer.trim();
      if (isPublished !== undefined) faqs[index].isPublished = Boolean(isPublished);
    }

    faqs.forEach((f, idx) => {
      f.sortOrder = idx + 1;
    });

    saveFAQs(faqs);
    return NextResponse.json({
      success: true,
      message: "FAQs updated successfully.",
      faqs,
    });
  } catch (error) {
    console.error("Update FAQ error:", error);
    return NextResponse.json({ success: false, error: "Failed to update FAQ." }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const auth = await checkAdminAuth(request);
  if (!auth.authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing FAQ ID." }, { status: 400 });
    }

    const faqs = getFAQs();
    const filtered = faqs.filter((f) => f.id !== id);
    filtered.forEach((f, idx) => {
      f.sortOrder = idx + 1;
    });

    saveFAQs(filtered);
    return NextResponse.json({
      success: true,
      message: "FAQ deleted successfully.",
      faqs: filtered,
    });
  } catch (error) {
    console.error("Delete FAQ error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete FAQ." }, { status: 500 });
  }
}
