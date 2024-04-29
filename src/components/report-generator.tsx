"use client";
import { Area, Priority, Status, Ticket } from "@prisma/client";
import { useEffect, useState } from "react";
import { Field, Label } from "@/components/catalyst/fieldset";
import { Input } from "@/components/catalyst/input";
import { Token } from "@/actions/auth";
import { Button } from "@/components/catalyst/button";
import { Download } from "lucide-react";
import { Select } from "@/components/catalyst/select";

type FilterType = {
  priority: string;
  area: string;
  status: string;
  fromDate: string;
  toDate: string;
  format: string;
  allConent: boolean;
};

function createApiRequest(filters: any) {
  // Base URL of the API
  const baseUrl = "/api/tickets";

  // Filter out empty keys
  const filteredEntries = Object.entries(filters).filter(
    ([_, value]) => value !== ""
  );

  // Create query parameters from non-empty values
  const queryParams = new URLSearchParams(filteredEntries).toString();

  // Build the complete URL
  return queryParams ? `${baseUrl}?${queryParams}` : baseUrl;
}

const ReportGenerator = () => {
  const [filters, setFilters] = useState<FilterType>({
    priority: "",
    status: "",
    area: "",
    fromDate: "",
    toDate: "",
    format: "csv",
    allConent: true,
  });

  const handleGenerateReport = async () => {
    console.log("hello");
    let url = createApiRequest(filters);
    console.log(url);
  };

  return (
    <div className="min-w-0 max-w-screen-lg w-full mx-auto my-4">
      <div className="flex gap-4 grow">
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
            onChange={(e) => setFilters({ ...filters, toDate: e.target.value })}
          />
        </Field>
      </div>
      <div className="grid lg:grid-cols-3 gap-4 mt-4">
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
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
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
            onChange={(e) => setFilters({ ...filters, area: e.target.value })}
          >
            <option value="">Alle</option>
            {Object.keys(Area).map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </Select>
        </Field>
      </div>
      <div className="mt-4">
        <Button
          className="flex items-center"
          onClick={() => handleGenerateReport()}
        >
          <Download className="h-4 w-4" /> Last ned CSV rapport
        </Button>
      </div>
    </div>
  );
};

export default ReportGenerator;
