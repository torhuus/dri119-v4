import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  if (
    request.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  try {
    const overdueApplications = await prisma.exercise.deleteMany({
      where: {
        createdAt: {
          lte: new Date(
            new Date().setDate(
              new Date().getDate() - Number(process.env.RETENTION_TIME)
            )
          ),
        },
      },
    });
    console.log(overdueApplications);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
  return NextResponse.json({ ok: true });
}
