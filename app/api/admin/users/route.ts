import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    // Get unique submissions grouped by USN with counts and latest submission
    const submissions = await prisma.submission.groupBy({
      by: ['usn'],
      _count: {
        _all: true // This will give us the problems solved count
      },
      orderBy: {
        usn: 'asc'
      }
    });

    // Get additional details for each USN
    const usersWithDetails = await Promise.all(
      submissions.map(async (submission) => {
        const latestSubmission = await prisma.submission.findFirst({
          where: { usn: submission.usn },
          orderBy: { createdAt: 'desc' }
        });

        return {
          id: submission.usn, // Using USN as ID
          usn: submission.usn,
          problemsSolved: submission._count._all,
          status: "Active", // Default status
          joinedDate: latestSubmission?.createdAt.toISOString().split('T')[0],
          lastSubmission: latestSubmission?.createdAt
        };
      })
    );

    return NextResponse.json(usersWithDetails);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
