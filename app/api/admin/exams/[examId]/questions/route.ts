import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: { examId: string } }
) {
  try {
    // First verify if the exam exists
    const exam = await prisma.exam.findUnique({
      where: {
        id: params.examId,
      },
      include: {
        questions: {
          select: {
            id: true,
            title: true,
            description: true,
            exam: {
              select: {
                id: true,
                subject: true,
                language: true,
              },
            },
          },
        },
      },
    });

    if (!exam) {
      return NextResponse.json(
        { error: "Exam not found" },
        { status: 404 }
      );
    }

    if (!exam.questions || exam.questions.length === 0) {
      return NextResponse.json(
        { error: "No questions found for this exam" },
        { status: 404 }
      );
    }

    return NextResponse.json(exam.questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    return NextResponse.json(
      { error: "Failed to fetch questions" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: { examId: string } }
) {
  try {
    const body = await request.json();
    const question = await prisma.question.create({
      data: {
        ...body,
        examId: params.examId,
      },
      include: {
        exam: {
          select: {
            subject: true,
            language: true,
          },
        },
      },
    });
    return NextResponse.json(question);
  } catch (error) {
    console.error("Error creating question:", error);
    return NextResponse.json(
      { error: "Failed to create question" },
      { status: 500 }
    );
  }
}
