"use client";

import * as React from "react";
import { PopoverTrigger } from "@/components/ui/popover";
import { Token, changeArea, changeRole } from "@/actions/auth";
import { usePathname } from "next/navigation";
import { groups, roles } from "@/data/roles";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Area } from "@prisma/client";
import { Label } from "../ui/label";

export default function RoleSwitcher({ token }: { token: Token }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col">
      <div>
        <Label className="mb-2 inline-block">Endre rolle</Label>
      </div>
      <Select
        onValueChange={(value) =>
          value === "USER"
            ? changeRole(value, pathname)
            : changeArea(value as Area, pathname)
        }
        defaultValue={token.role === "USER" ? "USER" : token.activeArea}
      >
        <SelectTrigger>
          <SelectValue placeholder="Velg din rolle..." />
        </SelectTrigger>
        <SelectContent>
          {roles.map((role) => {
            return (
              <SelectItem key={role.value} value={role.value}>
                {role.label}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
