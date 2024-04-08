"use client";

import { useEffect, useState } from "react";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { Token } from "@/actions/auth";
import { useSearchParams } from "next/navigation";
import { Ticket } from "@prisma/client";

const ScrollableFilterBar = ({
  token,
  setTickets,
  tickets,
}: {
  token: Token;
  setTickets: any;
  tickets: Ticket[];
}) => {
  const [priority, setPriority] = useState<any>("");
  const [status, setStatus] = useState<any>("");
  const [search, setSearch] = useState<any>("");
  const [area, setArea] = useState<any>(token.activeArea);

  useEffect(() => {
    // Create a function that checks for a match in the ticket object
    // Check if the ticket matches the selected priority, status, and search criteria
    // Check if the ticket's area matches the active area
    const filteredTickets = tickets.filter((ticket) => {
      // Check if the ticket's area matches the active area
      if (area !== "" && area !== ticket.area) {
        return false;
      }

      // Check if the ticket matches the selected priority and status criteria
      if (
        (priority !== "" && ticket.priority !== priority) ||
        (status !== "" && ticket.status !== status)
      ) {
        return false;
      }

      // Check if the ticket matches the search criteria
      if (
        search !== "" &&
        !ticket.title.toLowerCase().includes(search.toLowerCase())
      ) {
        return false;
      }

      return true;
    });

    setTickets(filteredTickets);
  }, [priority, status, search, area]);

  return (
    <div className="flex flex-col gap-4 my-4">
      <div>
        <ScrollArea className="whitespace-nowrap">
          <div>
            <h3 className="text-lg font-medium mb-2">Prioritet</h3>
            <div className="flex w-max space-x-2">
              <Button
                variant={priority === "" ? "default" : "outline"}
                size="sm"
                onClick={() => setPriority("")}
              >
                Alle
              </Button>
              <Button
                variant={priority === "LOW" ? "default" : "outline"}
                size="sm"
                onClick={() => setPriority("LOW")}
              >
                Lav
              </Button>
              <Button
                variant={priority === "MEDIUM" ? "default" : "outline"}
                size="sm"
                onClick={() => setPriority("MEDIUM")}
              >
                Medium
              </Button>
              <Button
                variant={priority === "HIGH" ? "default" : "outline"}
                size="sm"
                onClick={() => setPriority("HIGH")}
              >
                Høy
              </Button>
            </div>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <div className="mt-2"></div>
        <ScrollArea className="whitespace-nowrap pb-2">
          <div>
            <h3 className="text-lg font-medium mb-2">Praksis</h3>
            <div className="flex w-max space-x-2">
              <Button
                variant={area === "" ? "default" : "outline"}
                size="sm"
                onClick={() => setArea("")}
              >
                Alle
              </Button>
              <Button
                variant={area === "SERVICESENTER" ? "default" : "outline"}
                size="sm"
                onClick={() => setArea("SERVICESENTER")}
              >
                Servicesenter
              </Button>
              <Button
                variant={area === "HENDELSESSTYRING" ? "default" : "outline"}
                size="sm"
                onClick={() => setArea("HENDELSESSTYRING")}
              >
                Hendelsesstyring
              </Button>
              <Button
                variant={area === "PROBLEMSTYRING" ? "default" : "outline"}
                size="sm"
                onClick={() => setArea("PROBLEMSTYRING")}
              >
                Problemstyring
              </Button>
              <Button
                variant={area === "ENDRINGSKONTROLL" ? "default" : "outline"}
                size="sm"
                onClick={() => setArea("ENDRINGSKONTROLL")}
              >
                Endringskontroll
              </Button>
            </div>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <div className="mt-2"></div>
        <ScrollArea className="whitespace-nowrap pb-2">
          <div>
            <h3 className="text-lg font-medium mb-2">Status</h3>
            <div className="flex w-max space-x-2">
              <Button
                variant={status === "" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatus("")}
              >
                Alle
              </Button>
              <Button
                variant={status === "NEW" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatus("NEW")}
              >
                Ny
              </Button>
              <Button
                variant={status === "IN_PROGRESS" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatus("IN_PROGRESS")}
              >
                Pågår
              </Button>
              <Button
                variant={status === "CLOSED" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatus("CLOSED")}
              >
                Lukket
              </Button>
            </div>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};

export default ScrollableFilterBar;
