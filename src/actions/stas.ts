import prisma from "@/lib/db";

const getAverageTicketDuration = async (exerciseId: string) => {
  const tickets = await prisma.ticket.findMany({
    where: {
      startedAt: { not: null },
      closedAt: { not: null },
      exerciseId,
    },
    select: {
      startedAt: true,
      closedAt: true,
    },
  });

  if (tickets.length === 0) return;

  // Calculate the total duration in milliseconds
  let totalDuration = 0;
  for (const ticket of tickets) {
    const duration = ticket.closedAt!.getTime() - ticket.startedAt!.getTime();
    totalDuration += duration;
  }

  // Calculate the average duration in milliseconds
  const averageDuration = totalDuration / tickets.length;

  // Convert milliseconds to minutes for readability
  const averageDurationMinutes = averageDuration / (1000 * 60);

  return {
    label: "Gj. tid fra startet til lukket",
    value: averageDurationMinutes,
  };
};

export const getDashboardData = async (exerciseId: string) => {
  const averageTicketDuration = await getAverageTicketDuration(exerciseId);
  const averageStartTimeDelay = await getAverageStartTimeDelay(exerciseId);
  const averageTicketCreateToCloseDuration =
    await getAverageTicketCreateToCloseDuration(exerciseId);

  return {
    data: [
      averageTicketDuration,
      averageStartTimeDelay,
      averageTicketCreateToCloseDuration,
    ],
  };
};

export const secondsToHumanized = (seconds: number) => {
  const valueInSeconds = seconds;
  if (valueInSeconds < 3600) {
    // Less than an hour, show in minutes
    const minutes = Math.round(valueInSeconds / 60);
    return `${minutes} min`;
  } else {
    // Equal to or more than an hour, show in hours and minutes
    const hours = Math.floor(valueInSeconds / 3600);
    const minutes = Math.round((valueInSeconds % 3600) / 60);
    return `${hours}t ${minutes}min`;
  }
};

const getAverageStartTimeDelay = async (exerciseId: string) => {
  const tickets = await prisma.ticket.findMany({
    where: {
      startedAt: { not: null },
      exerciseId,
    },
    select: {
      createdAt: true,
      startedAt: true,
    },
  });
  if (tickets.length === 0) return;

  // Calculate the total delay in milliseconds
  let totalDelay = 0;
  for (const ticket of tickets) {
    const delay = ticket.startedAt!.getTime() - ticket.createdAt.getTime();
    totalDelay += delay;
  }

  // Calculate the average delay in milliseconds
  const averageDelay = totalDelay / tickets.length;

  // Convert milliseconds to seconds for consistency
  const averageDelaySeconds = averageDelay / 1000;

  return { label: "Gj. tid til pågår", value: averageDelaySeconds };
};

const getAverageTicketCreateToCloseDuration = async (exerciseId: string) => {
  const tickets = await prisma.ticket.findMany({
    where: {
      closedAt: { not: null },
      exerciseId,
    },
    select: {
      createdAt: true,
      closedAt: true,
    },
  });
  if (tickets.length === 0) return;

  // Calculate the total duration in milliseconds
  let totalDuration = 0;
  for (const ticket of tickets) {
    const duration = ticket.closedAt!.getTime() - ticket.createdAt.getTime();
    totalDuration += duration;
  }

  // Calculate the average duration in milliseconds
  const averageDuration = totalDuration / tickets.length;

  // Convert milliseconds to minutes for readability
  const averageDurationMinutes = averageDuration / (1000 * 60);

  return {
    label: "Gj. tid fra innsendt til lukket",
    value: averageDurationMinutes,
  };
};

const getStatusCounts = async (exerciseId: string) => {
  const statuses = await prisma.ticket.groupBy({
    by: ["status"],
    where: {
      exerciseId,
    },
    _count: {
      status: true,
    },
  });

  return statuses.map(({ status, _count }) => ({
    label: `Antall ${status}`,
    value: _count.status,
  }));
};

const getAreaCounts = async (exerciseId: string) => {
  const areas = await prisma.ticket.groupBy({
    by: ["area"],
    where: {
      exerciseId,
    },
    _count: {
      area: true,
    },
  });

  return areas.map(({ area, _count }) => ({
    label: `Antall ${area}`,
    value: _count.area,
  }));
};

const getPriorityCounts = async (exerciseId: string) => {
  const priorities = await prisma.ticket.groupBy({
    by: ["priority"],
    where: {
      exerciseId,
    },
    _count: {
      priority: true,
    },
  });

  return priorities.map(({ priority, _count }) => ({
    label: `Antall ${priority}`,
    value: _count.priority,
  }));
};

export const getTicketCounts = async (exerciseId: string) => {
  const statusCounts = await getStatusCounts(exerciseId);
  const areaCounts = await getAreaCounts(exerciseId);
  const priorityCounts = await getPriorityCounts(exerciseId);

  return {
    data: [...statusCounts, ...areaCounts, ...priorityCounts],
  };
};
