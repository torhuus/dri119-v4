"use client";
import { Area, Priority, Status } from "@prisma/client";
import { useState, useEffect } from "react";
import { Field, Label } from "@/components/catalyst/fieldset";
import { Input } from "@/components/catalyst/input";
import { Button } from "@/components/catalyst/button";
import { Download } from "lucide-react";
import { Select } from "@/components/catalyst/select";
import { Token } from "@/actions/auth";

type FilterType = {
  priority: string;
  area: string;
  status: string;
  fromDate: string;
  toDate: string;
  format: string;
};

function createApiRequest(filters: any) {
  // Base URL of the API
  const baseUrl = "/api/tickets";

  // Filter out empty keys and ensure values are strings
  const filteredEntries = Object.entries(filters)
    .filter(([_, value]) => value !== "")
    .map(([key, value]) => [key, String(value)]);

  // Create query parameters from non-empty values
  const queryParams = new URLSearchParams(
    filteredEntries as string[][]
  ).toString();
  // Build the complete URL
  return queryParams ? `${baseUrl}?${queryParams}` : baseUrl;
}

const ReportGenerator = ({ token }: { token: Token }) => {
  const [filters, setFilters] = useState<FilterType>({
    priority: "",
    status: "",
    area: "",
    fromDate: "",
    toDate: "",
    format: "csv",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
  }, [filters]);

  const handleGenerateReport = async () => {
    setLoading(true);
    setError(null);
    let fetchUrl = createApiRequest(filters);
    let res = await fetch(fetchUrl);
    if (res.status !== 200) {
      setError(
        "Fant ingen henvendelser med disse kriteriene, prøv igjen med andre valg/tidsrom."
      );
      setLoading(false);
      return;
    }
    let data = await res.json();

    handle(data);

    setFilters({
      priority: "",
      status: "",
      area: "",
      fromDate: "",
      toDate: "",
      format: "csv",
    });
    setLoading(false);
  };

  return (
    <div className="min-w-0 max-w-screen-lg w-full mx-auto my-4">
      <div className="flex gap-4 grow flex-col md:flex-row">
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
      <div className="mt-4 flex flex-col gap-4">
        <div>
          <Button
            className="flex items-center"
            disabled={loading || (error !== null && true)}
            onClick={() => handleGenerateReport()}
          >
            {loading ? "Laster..." : <>Hent CSV rapport</>}
          </Button>
          <div className="mt-2">
            <span className="text-red-600 text-sm">{error}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportGenerator;

const handle = (inputData: any) => {
  const headers = Object.keys(inputData[0]).join(";");

  const completeData = inputData.map((item: any) => {
    const completeItem: Record<string, any> = {};

    Object.keys(inputData[0]).forEach((key: any) => {
      completeItem[key] = item.hasOwnProperty(key) ? item[key] : "";
    });

    return Object.values(completeItem).join(";");
  });

  const csv = [headers, ...completeData].join("\n");
  startCsvDownload(csv);
};

const startCsvDownload = (csv: string) => {
  const blob = new Blob([csv], { type: "application/csv" });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.download = "report.csv";
  a.href = url;
  a.style.display = "none";
  document.body.appendChild(a);

  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};
