"use client";
import { Area, Priority, Status, Ticket } from "@prisma/client";
import { useEffect, useState } from "react";
import { Field, Label } from "../catalyst/fieldset";
import { Input } from "../catalyst/input";
import { Token } from "@/actions/auth";
import { Button } from "@/components/catalyst/button";
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from "@/components/catalyst/dialog";
import { Filter } from "lucide-react";
import { Select } from "../catalyst/select";

type FilterType = {
  search: string;
  priority: string;
  area: string;
  status: string;
  fromDate: string;
  toDate: string;
};

const Filterbar = ({
  setFilteredTickets,
  tickets,
  token,
}: {
  setFilteredTickets: any;
  tickets: Ticket[];
  token: Token;
}) => {
  const [filters, setFilters] = useState<FilterType>({
    search: "",
    priority: "",
    area: token.activeArea ? token.activeArea : "",
    status: "",
    fromDate: "",
    toDate: "",
  });

  const defaultFilters: FilterType = {
    search: "",
    priority: "",
    area: token.activeArea ? token.activeArea : "",
    status: "",
    fromDate: "",
    toDate: "",
  };
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const areFiltersSameAsDefault = () => {
    return Object.keys(filters).every(
      (key) =>
        filters[key as keyof FilterType] ===
        defaultFilters[key as keyof FilterType]
    );
  };

  useEffect(() => {
    setFilteredTickets(
      tickets.filter((ticket: Ticket) => {
        // Check each filter, if it's not empty, apply it to the ticket
        return Object.keys(filters).every((filterKey: string) => {
          if (filters[filterKey as keyof FilterType] !== "") {
            // Apply filter condition based on filterKey
            if (filterKey === "search") {
              // Example: filtering by ticket title
              return ticket.title
                .toLowerCase()
                .includes(filters[filterKey as keyof FilterType].toLowerCase());
            } else if (filterKey === "priority") {
              // Example: filtering by ticket priority
              return ticket.priority === filters[filterKey as keyof FilterType];
            } else if (filterKey === "area") {
              // Example: filtering by ticket area
              return ticket.area === filters[filterKey as keyof FilterType];
            } else if (filterKey === "status") {
              // Example: filtering by ticket status
              return ticket.status === filters[filterKey as keyof FilterType];
            } else if (filterKey === "fromDate") {
              // Example: filtering by ticket fromDate
              return (
                ticket.createdAt >=
                new Date(filters[filterKey as keyof FilterType])
              );
            } else if (filterKey === "toDate") {
              // Example: filtering by ticket toDate
              return (
                ticket.createdAt <=
                new Date(filters[filterKey as keyof FilterType])
              );
            }
          }
          // If filter value is empty, skip this filter key
          return true;
        });
      })
    );
  }, [filters]);

  return (
    <div className="flex flex-col md:flex-row md:items-end gap-4 justify-between">
      <Field className="grow max-w-96">
        <Label>Søk</Label>
        <Input
          value={filters.search}
          name="search"
          placeholder="Søk etter henvendelse"
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
      </Field>
      <div className="flex items-center gap-2">
        {areFiltersSameAsDefault() ? null : (
          <Button
            type="button"
            color="light"
            className="grow"
            onClick={() => setFilters(defaultFilters)}
          >
            Nullstill filter
          </Button>
        )}
        <Button type="button" className="grow" onClick={() => setIsOpen(true)}>
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
        <Dialog open={isOpen} onClose={setIsOpen}>
          <DialogTitle>Filter</DialogTitle>
          <DialogDescription>
            Under kan du velge status, prioritet eller praksis osv. for å få
            frem de henvendelsene du ønsker å jobbe med.
          </DialogDescription>
          <DialogBody className="flex flex-col gap-6">
            <Field>
              <Label>Prioritet</Label>
              <Select
                name="prioritet"
                value={filters.priority}
                onChange={(e) =>
                  setFilters({ ...filters, priority: e.target.value })
                }
              >
                <option value="">Alle</option>
                {Object.keys(Priority).map((priority) => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                ))}
              </Select>
            </Field>
            <Field>
              <Label>Status</Label>
              <Select
                name="status"
                value={filters.status}
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
              >
                <option value="">Alle</option>
                {Object.keys(Status).map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </Select>
            </Field>
            <Field>
              <Label>Praksis</Label>
              <Select
                name="praksis"
                value={filters.area}
                onChange={(e) =>
                  setFilters({ ...filters, area: e.target.value })
                }
              >
                <option value="">Alle</option>
                {Object.keys(Area).map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </Select>
            </Field>
            <div className="flex gap-4 flex-col md:flex-row">
              <Field className="grow">
                <Label>Fra dato</Label>
                <Input
                  type="datetime-local"
                  value={filters.fromDate}
                  onChange={(e) =>
                    setFilters({ ...filters, fromDate: e.target.value })
                  }
                />
              </Field>
              <Field className="grow">
                <Label>Til dato</Label>
                <Input
                  type="datetime-local"
                  value={filters.toDate}
                  onChange={(e) =>
                    setFilters({ ...filters, toDate: e.target.value })
                  }
                />
              </Field>
            </div>
          </DialogBody>
          <DialogActions>
            <Button plain onClick={() => setIsOpen(false)}>
              Avbryt
            </Button>
            <Button onClick={() => setIsOpen(false)}>Filtrer</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Filterbar;
