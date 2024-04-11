"use server";

import prisma from "@/lib/db";
import { Token, getToken, signout } from "./auth";
import { Area, Priority, Status, Ticket } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createNewTicket = async (values: any) => {
  const token = (await getToken()) as Token;

  try {
    const ticket = await prisma.ticket.create({
      data: {
        title: values.title,
        content: values.content,
        priority: values.priority,
        internalNote: values.internalNote,
        area: values.area,
        status: values.status,
        exerciseId: token.exerciseId,
      },
    });
    console.log(ticket);
    return { data: ticket };
  } catch (e) {
    return { error: e };
  }

  return;
};

export const getTickets = async () => {
  const token = (await getToken()) as Token;

  if (!token) {
    signout();
  }

  const tickets = await prisma.ticket.findMany({
    where: {
      exerciseId: token.exerciseId,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
  return { data: tickets };
};

export const updateStatus = async (values: any) => {
  const token = (await getToken()) as Token;

  try {
    const ticket = await prisma.ticket.update({
      where: {
        id: values.id,
        exerciseId: token.exerciseId,
      },
      data: {
        status: values.status,
        closedAt: values.status === "CLOSED" ? new Date() : undefined,
      },
    });
    return { data: ticket };
  } catch (e) {
    return { error: e };
  }
};

export const updatePriority = async (values: any) => {
  const token = (await getToken()) as Token;

  try {
    const ticket = await prisma.ticket.update({
      where: {
        id: values.id,
        exerciseId: token.exerciseId,
      },
      data: {
        priority: values.priority,
      },
    });
    return { data: ticket };
  } catch (e) {
    return { error: e };
  }
};

export const updateTitle = async (values: any) => {
  const token = (await getToken()) as Token;

  try {
    const ticket = await prisma.ticket.update({
      where: {
        id: values.id,
        exerciseId: token.exerciseId,
      },
      data: {
        title: values.title,
      },
    });
    return { data: ticket };
  } catch (e) {
    return { error: e };
  }
};

export const updateContent = async (values: any) => {
  const token = (await getToken()) as Token;

  try {
    const ticket = await prisma.ticket.update({
      where: {
        id: values.id,
        exerciseId: token.exerciseId,
      },
      data: {
        content: values.content,
      },
    });
    return { data: ticket };
  } catch (e) {
    return { error: e };
  }
};

export const updateInternalNote = async (values: any) => {
  const token = (await getToken()) as Token;

  try {
    const ticket = await prisma.ticket.update({
      where: {
        id: values.id,
        exerciseId: token.exerciseId,
      },
      data: {
        internalNote: values.internalNote,
      },
    });
    return { data: ticket };
  } catch (e) {
    return { error: e };
  }
};

export const updateArea = async (values: any) => {
  const token = (await getToken()) as Token;

  try {
    const ticket = await prisma.ticket.update({
      where: {
        id: values.id,
        exerciseId: token.exerciseId,
      },
      data: {
        area: values.area,
      },
    });
    return { data: ticket };
  } catch (e) {
    return { error: e };
  }
};

export const updateTicket = async (
  values: any,
  ticketId: number,
  previousTicket: Ticket
) => {
  const token = (await getToken()) as Token;

  try {
    const ticket = await prisma.ticket.update({
      where: {
        id: ticketId,
        exerciseId: token.exerciseId,
      },
      data: {
        title: values.title,
        content: values.content,
        priority: values.priority,
        internalNote: values.internalNote,
        area: values.area,
        status: values.status,
        closedAt: values.status === "CLOSED" ? new Date() : undefined,
        startedAt: previousTicket.startedAt
          ? previousTicket.startedAt
          : previousTicket.status === "NEW" && values.status === "IN_PROGRESS"
          ? new Date()
          : undefined,
      },
    });

    revalidatePath("/app/tickets");
    return { data: ticket };
  } catch (e) {
    return { error: e };
  }
};

export const deleteTicket = async (values: any) => {
  const token = (await getToken()) as Token;

  try {
    const ticket = await prisma.ticket.delete({
      where: {
        id: values.id,
        exerciseId: token.exerciseId,
      },
    });

    return { data: ticket };
  } catch (e) {
    return { error: e };
  }
};

export const getTicketById = async (ticketId: string) => {
  const token = (await getToken()) as Token;

  try {
    const ticket = await prisma.ticket.findUnique({
      where: {
        id: parseInt(ticketId),
        exerciseId: token.exerciseId,
      },
    });

    return { data: ticket };
  } catch (e) {
    return { error: e };
  }
};

export const deleteTicketById = async (ticketId: number) => {
  const token = (await getToken()) as Token;

  try {
    await prisma.ticket.delete({
      where: {
        id: ticketId,
        exerciseId: token.exerciseId,
      },
    });

    revalidatePath("/app/tickets");
    return { status: 200 };
  } catch (e) {
    return { error: e };
  }
};

export const createNewAnonymousTicket = async (
  name: string,
  email: string,
  priority: Priority,
  content: string,
  exerciseId: string
) => {
  const newTicket = await prisma.ticket.create({
    data: {
      title: name,
      content,
      email,
      priority,
      exerciseId,
    },
  });
};

export const createNewAuthenticatedTicket = async (
  name: string,
  email: string,
  priority: Priority,
  content: string,
  area: Area,
  status: Status,
  internalNote: string,
  createdAt: string,
  exerciseId: string
) => {
  const token = (await getToken()) as Token;
  const newTicket = await prisma.ticket.create({
    data: {
      title: name,
      content,
      priority,
      status,
      area,
      internalNote,
      createdAt: createdAt,
      exerciseId,
      email: email === "" ? token.username : email,
    },
  });
};
