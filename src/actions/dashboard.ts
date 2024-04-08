"use server";

import prisma from "@/lib/db";
import { Token, getToken } from "./auth";

export const getDashboardStats = async () => {
  const token = (await getToken()) as Token;

  const statusCounts = await prisma.ticket.groupBy({
    where: { exerciseId: token.exerciseId },
    by: ["status"],
    _count: true,
  });

  const areaCounts = await prisma.ticket.groupBy({
    where: { exerciseId: token.exerciseId },
    by: ["area"],
    _count: true,
  });

  const priorityCounts = await prisma.ticket.groupBy({
    where: { exerciseId: token.exerciseId },
    by: ["priority"],
    _count: true,
  });

  const totalTickets = await prisma.ticket.count({
    where: { exerciseId: token.exerciseId },
  });

  return { totalTickets, statusCounts, areaCounts, priorityCounts };
};
