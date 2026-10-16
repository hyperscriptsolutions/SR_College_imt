import { NextRequest, NextResponse } from "next/server";
import { checkAdminAuth } from "@/lib/auth";
import { getCurriculum, saveCurriculum, SubjectItem } from "@/lib/dataStore";

export async function GET(request: NextRequest) {
  const auth = await checkAdminAuth(request);
  if (!auth.authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const curriculum = getCurriculum();
  return NextResponse.json({ success: true, curriculum });
}

export async function POST(request: NextRequest) {
  const auth = await checkAdminAuth(request);
  if (!auth.authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { semesterId, code, title, category, description } = body;

    if (!semesterId || !title?.trim() || !category?.trim() || !description?.trim()) {
      return NextResponse.json(
        { success: false, error: "Semester, title, category, and description are required." },
        { status: 400 }
      );
    }

    const curriculum = getCurriculum();
    const semIndex = curriculum.findIndex((s) => s.id === Number(semesterId));
    if (semIndex === -1) {
      return NextResponse.json({ success: false, error: "Invalid semester specified." }, { status: 400 });
    }

    const newId = `s${semesterId}-${Date.now().toString().slice(-4)}`;
    const newSubject: SubjectItem = {
      id: newId,
      code: code?.trim() || `DHLS-${semesterId}0${curriculum[semIndex].subjects.length + 1}`,
      title: title.trim(),
      category: category.trim(),
      description: description.trim(),
      isPublished: true,
      sortOrder: curriculum[semIndex].subjects.length + 1,
    };

    curriculum[semIndex].subjects.push(newSubject);
    saveCurriculum(curriculum);

    return NextResponse.json({
      success: true,
      message: "Subject added successfully.",
      subject: newSubject,
      curriculum,
    });
  } catch (error) {
    console.error("Add subject error:", error);
    return NextResponse.json({ success: false, error: "Failed to add subject." }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const auth = await checkAdminAuth(request);
  if (!auth.authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { semesterId, subjectId, code, title, category, description, isPublished, sortOrder, moveDirection } = body;

    const curriculum = getCurriculum();
    const semIndex = curriculum.findIndex((s) => s.id === Number(semesterId));
    if (semIndex === -1) {
      return NextResponse.json({ success: false, error: "Semester not found." }, { status: 400 });
    }

    const subjects = curriculum[semIndex].subjects;
    const subIndex = subjects.findIndex((sub) => sub.id === subjectId);
    if (subIndex === -1) {
      return NextResponse.json({ success: false, error: "Subject not found." }, { status: 404 });
    }

    // Handle reordering up/down
    if (moveDirection === "up" && subIndex > 0) {
      const temp = subjects[subIndex];
      subjects[subIndex] = subjects[subIndex - 1];
      subjects[subIndex - 1] = temp;
    } else if (moveDirection === "down" && subIndex < subjects.length - 1) {
      const temp = subjects[subIndex];
      subjects[subIndex] = subjects[subIndex + 1];
      subjects[subIndex + 1] = temp;
    } else {
      // Normal update
      if (title !== undefined) subjects[subIndex].title = title.trim();
      if (code !== undefined) subjects[subIndex].code = code.trim();
      if (category !== undefined) subjects[subIndex].category = category.trim();
      if (description !== undefined) subjects[subIndex].description = description.trim();
      if (isPublished !== undefined) subjects[subIndex].isPublished = Boolean(isPublished);
      if (sortOrder !== undefined) subjects[subIndex].sortOrder = Number(sortOrder);
    }

    // Re-index sortOrder
    subjects.forEach((s, idx) => {
      s.sortOrder = idx + 1;
    });

    saveCurriculum(curriculum);
    return NextResponse.json({
      success: true,
      message: "Curriculum updated successfully.",
      curriculum,
    });
  } catch (error) {
    console.error("Update subject error:", error);
    return NextResponse.json({ success: false, error: "Failed to update curriculum." }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const auth = await checkAdminAuth(request);
  if (!auth.authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const semesterId = Number(searchParams.get("semesterId"));
    const subjectId = searchParams.get("subjectId");

    if (!semesterId || !subjectId) {
      return NextResponse.json({ success: false, error: "Missing parameters." }, { status: 400 });
    }

    const curriculum = getCurriculum();
    const semIndex = curriculum.findIndex((s) => s.id === semesterId);
    if (semIndex === -1) {
      return NextResponse.json({ success: false, error: "Semester not found." }, { status: 404 });
    }

    curriculum[semIndex].subjects = curriculum[semIndex].subjects.filter((s) => s.id !== subjectId);
    curriculum[semIndex].subjects.forEach((s, idx) => {
      s.sortOrder = idx + 1;
    });

    saveCurriculum(curriculum);
    return NextResponse.json({
      success: true,
      message: "Subject removed successfully.",
      curriculum,
    });
  } catch (error) {
    console.error("Delete subject error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete subject." }, { status: 500 });
  }
}
