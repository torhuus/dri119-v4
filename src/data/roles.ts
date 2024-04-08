import { changeArea, changeRole } from "@/actions/auth";

export const groups = [
  {
    label: "Bruker-rolle",
    role: "USER",
    teams: [
      {
        label: "Bruker",
        value: "USER",
        action: changeArea,
      },
    ],
  },
  {
    label: "Praksis-rolle",
    role: "SUPPORT",
    teams: [
      {
        label: "Servicesenter",
        value: "SERVICESENTER",
      },
      {
        label: "Hendelsesstyring",
        value: "HENDELSESSTYRING",
      },
      {
        label: "Problemstyring",
        value: "PROBLEMSTYRING",
      },
      {
        label: "Endringskontroll",
        value: "ENDRINGSKONTROLL",
      },
    ],
  },
];

export const roles = [
  { label: "Bruker", value: "USER", action: changeRole },
  { label: "Servicesenter", value: "SERVICESENTER", action: changeArea },
  { label: "Hendelsesstyring", value: "HENDELSESSTYRING", action: changeArea },
  { label: "Problemstyring", value: "PROBLEMSTYRING", action: changeArea },
  { label: "Endringskontroll", value: "ENDRINGSKONTROLL", action: changeArea },
];
