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
        internalNote: true,
        content: true,
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

    const calculatedTickets = calculateTicketTimes(formattedTickets);

    return new Response(JSON.stringify(calculatedTickets), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "En feil skjedde" }), {
      status: 500,
    });
  }
}

function calculateTicketTimes(tickets: any) {
  tickets.forEach((ticket: any) => {
    const createdAt = new Date(ticket.createdAt);

    ticket.timeToStart = "";
    ticket.timeToComplete = "";
    ticket.timeSpent = "";

    if (ticket.startedAt) {
      const startedAt = new Date(ticket.startedAt).getTime();
      const createdAtTime = new Date(ticket.createdAt).getTime();
      const diffToStart = startedAt - createdAtTime;
      ticket.timeToStart = Math.round(diffToStart / 60000);
    }

    if (ticket.closedAt) {
      const closedAt = new Date(ticket.closedAt).getTime();
      const createdAtTime = new Date(ticket.createdAt).getTime();
      const diffToComplete = closedAt - createdAtTime;
      ticket.timeToComplete = Math.round(diffToComplete / 60000);

      if (ticket.startedAt) {
        const startedAt = new Date(ticket.startedAt).getTime();
        const diffSpent = closedAt - startedAt;
        ticket.timeSpent = Math.round(diffSpent / 60000);
      }
    }
  });

  return tickets;
}
