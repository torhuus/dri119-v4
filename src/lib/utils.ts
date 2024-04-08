import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTimeAgo(createdAt: Date): string {
  const now = moment();
  const exerciseCreatedAt = moment(createdAt);
  const minutesAgo = now.diff(exerciseCreatedAt, "minutes");
  const hoursAgo = now.diff(exerciseCreatedAt, "hours");
  const daysAgo = now.diff(exerciseCreatedAt, "days");

  if (minutesAgo < 60) {
    return `${minutesAgo} minutter siden`;
  } else if (hoursAgo < 24) {
    return `${hoursAgo} timer siden`;
  } else {
    return `${daysAgo} dager siden`;
  }
}

export function createPriorityBadge(priority: string) {
  let label = "";
  let badgeColor = "";
  if (priority === "LOW") {
    label = "Lav";
    badgeColor = "bg-blue-400";
  } else if (priority === "MEDIUM") {
    label = "Medium";
    badgeColor = "bg-yellow-400";
  } else {
    label = "Høy";
    badgeColor = "bg-red-400";
  }

  return { label, badgeColor };
}

export function translateStatus(status: string) {
  switch (status) {
    case "NEW":
      return "Ny";
    case "IN_PROGRESS":
      return "Pågående";
    case "CLOSED":
      return "Lukket";
    default:
      return status;
  }
}
