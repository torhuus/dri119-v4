export type NavigationItem = {
  title: string;
  href: string;
  protected: boolean;
};

export type Navigation = NavigationItem[];

export const navigation: Navigation = [
  { title: "Hjem", href: "/app", protected: false },
];

// A user will only have access to the /app page which shows the "createNewTicket" form for a user.

export const status: Navigation = [
  { title: "Alle", href: "/app/tickets", protected: true },
  {
    title: "Nye",
    href: "/app/tickets?status=NEW",
    protected: true,
  },
  {
    title: "Pågående",
    href: "/app/tickets?status=IN_PROGRESS",
    protected: true,
  },
  {
    title: "Lukket",
    href: "/app/tickets?status=CLOSED",
    protected: true,
  },
];

export const priority: Navigation = [
  {
    title: "Lav",
    href: "/app/tickets?priority=LOW",
    protected: true,
  },
  {
    title: "Medium",
    href: "/app/tickets?priority=MEDIUM",
    protected: true,
  },
  {
    title: "Høy",
    href: "/app/tickets?priority=HIGH",
    protected: true,
  },
];
