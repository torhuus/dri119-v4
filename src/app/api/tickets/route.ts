import { type NextRequest } from "next/server";
import prisma from "@/lib/db";
import { Area, Priority, Status, Ticket } from "@prisma/client";
import { Token, getToken } from "@/actions/auth";
import * as XLSX from "xlsx";

export async function GET(request: NextRequest) {
  const token = (await getToken()) as Token;
  const searchParams = request.nextUrl.searchParams;
  const fromDate = searchParams.get("fromDate");
  const toDate = searchParams.get("toDate");
  const status = searchParams.get("status");
  const priority = searchParams.get("priority");
  const area = searchParams.get("area");
  const allContent = searchParams.get("allContent");
  const format = searchParams.get("format");

  if (!token) {
    return new Response("Forbidden", {
      status: 401,
    });
  }

  try {
    const tickets = await prisma.ticket.findMany({
      where: {
        exerciseId: token.exerciseId,
        AND: [
          fromDate ? { createdAt: { gte: new Date(fromDate) } } : {},
          toDate ? { createdAt: { lte: new Date(toDate) } } : {},
          status ? { status: status as Status } : {},
          priority ? { priority: priority as Priority } : {},
          area ? { area: area as Area } : {},
        ],
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        updatedAt: true,
        startedAt: true,
        closedAt: true,
        status: true,
        priority: true,
        area: true,
        email: true,
        internalNote: allContent === "true" ? true : false,
        content: allContent === "true" ? true : false,
      },
    });

    if (tickets.length < 1) {
      return new Response(
        JSON.stringify({ message: "Ingen henvendelser funnet" }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          status: 201,
        }
      );
    }

    const formattedTickets = tickets.map((ticket) => ({
      ...ticket,
      createdAt: new Date(ticket.createdAt).toISOString(),
      updatedAt: new Date(ticket.updatedAt).toISOString(),
      startedAt: ticket.startedAt
        ? new Date(ticket.startedAt).toISOString()
        : undefined,
      closedAt: ticket.closedAt
        ? new Date(ticket.closedAt).toISOString()
        : undefined,
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedTickets);

    if (format === "csv") {
      const csv = XLSX.utils.sheet_to_csv(worksheet, {
        forceQuotes: true,
        dateNF: 'yyyy-mm-dd"T"HH:MM:SS.', // ISO format
      });

      return new Response(csv, {
        status: 200,
        headers: {
          "Content-Disposition": `attachment; filename="${token.exerciseName}-csv-export.csv`,
          "Content-Type": "text/csv",
        },
      });
    } else if (format === "xlsx") {
      const xlsxWorkbook = XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(xlsxWorkbook, worksheet, "Henvendelser");

      const buf = XLSX.write(xlsxWorkbook, {
        type: "buffer",
        bookType: "xlsx",
      });

      return new Response(buf, {
        status: 200,
        headers: {
          "Content-Disposition": `attachment; filename="${token.exerciseName}-csv-export.csv`,
          "Content-Type": "application/vnd.ms-excel",
        },
      });
    } else {
      return new Response(JSON.stringify({ message: "Format ikke valgt" }), {
        headers: {
          "Content-Type": "application/json",
        },
        status: 201,
      });
    }
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "En feil skjedde" }), {
      status: 500,
    });
  }
}

// /api/tickets?format=xlsx&fromDate=2022-01-01&toDate=2022-01-31&status=OPEN&priority=HIGH&area=HENDELSESSTYRING
// API Route with datetime
// /api/tickets?format=xlsx&fromDate=2022-01-01T00:00:00&toDate=2022-01-31T23:59:59&status=OPEN&priority=HIGH&area=HENDELSESSTYRING
