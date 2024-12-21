import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { subject, semester, section, branch, language, inchargeName } = body;

    const exam = await prisma.exam.create({
      data: {
        subject,
        semester: parseInt(semester),
        section,
        branch,
        language,
        inchargeName,
      },
    });

    return NextResponse.json(exam);
  } catch (error) {
    console.error("Error creating exam:", error);
    return NextResponse.json(
      { error: "Failed to create exam" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const exams = await prisma.exam.findMany({
      include: {
        questions: true,
        submissions: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(exams);
  } catch (error) {
    console.error("Error fetching exams:", error);
    return NextResponse.json(
      { error: "Failed to fetch exams" },
      { status: 500 }
    );
  }
}
