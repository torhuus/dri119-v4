"use server";

import prisma from "@/lib/db";
import { Token, getToken } from "./auth";
import { Area, Priority, Status } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createNewTicket = async (values: any) => {
  const token = (await getToken()) as Token;

  if (token.role === "USER") {
    try {
      const ticket = await prisma.ticket.create({
        data: {
          title: values.title,
          content: values.content,
          priority: values.priority,
          userId: token.userId,
          exerciseId: token.exerciseId,
        },
      });
      return { data: ticket };
    } catch (e) {
      return { error: e };
    }
  } else if (token.role === "SUPPORT") {
    try {
      const ticket = await prisma.ticket.create({
        data: {
          title: values.title,
          content: values.content,
          priority: values.priority,
          internalNote: values.internalNote,
          area: values.area,
          status: values.status,
          userId: token.userId,
          exerciseId: token.exerciseId,
        },
      });
      console.log(ticket);
      return { data: ticket };
    } catch (e) {
      return { error: e };
    }
  }

  return;
};

export const getTickets = async (searchParams: any) => {
  const token = (await getToken()) as Token;

  if (searchParams.priority) {
    const tickets = await prisma.ticket.findMany({
      where: {
        exerciseId: token.exerciseId,
        priority: searchParams.priority,
      },
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        User: true,
      },
    });
    return { data: tickets };
  } else if (searchParams.status) {
    const tickets = await prisma.ticket.findMany({
      where: {
        exerciseId: token.exerciseId,
        status: searchParams.status === "" ? undefined : searchParams.status,
      },
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        User: true,
      },
    });
    return { data: tickets };
  } else if (searchParams.older_than) {
    const tickets = await prisma.ticket.findMany({
      where: {
        exerciseId: token.exerciseId,
        createdAt: {
          lt: new Date(searchParams.older_than),
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        User: true,
      },
    });
    return { data: tickets };
  } else if (searchParams.new_today) {
    const tickets = await prisma.ticket.findMany({
      where: {
        exerciseId: token.exerciseId,
        createdAt: {
          gte: new Date(new Date().setHours(0)),
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        User: true,
      },
    });
    return { data: tickets };
  } else {
    const tickets = await prisma.ticket.findMany({
      where: {
        exerciseId: token.exerciseId,
      },
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        User: true,
      },
    });

    return { data: tickets };
  }

  return { data: [] };
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

export const updateTicket = async (values: any, ticketId: string) => {
  const token = (await getToken()) as Token;

  try {
    const ticket = await prisma.ticket.update({
      where: {
        id: parseInt(ticketId),
        exerciseId: token.exerciseId,
      },
      data: {
        title: values.title,
        content: values.content,
        priority: values.priority,
        internalNote: values.internalNote,
        area: values.area,
        status: values.status,
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
      include: {
        User: true,
      },
    });

    return { data: ticket };
  } catch (e) {
    return { error: e };
  }
};

export const deleteTicketById = async (formData: FormData) => {
  const token = (await getToken()) as Token;

  try {
    await prisma.ticket.delete({
      where: {
        id: parseInt(formData.get("id") as string),
        exerciseId: token.exerciseId,
      },
    });

    revalidatePath("/app/tickets");
    return { status: 200 };
  } catch (e) {
    return { error: e };
  }
};
