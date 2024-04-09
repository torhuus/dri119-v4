"use client";
import { Token, changeArea } from "@/actions/auth";
import { Field, Label } from "@/components/catalyst/fieldset";
import { Select } from "@/components/catalyst/select";
import { Area } from "@prisma/client";
import { usePathname } from "next/navigation";
import { useState } from "react";

export const RoleSwitcher = ({ token }: { token: Token }) => {
  const pathname = usePathname();
  const [local, setLocal] = useState<Area>(token.activeArea as Area);
  return (
    <Field className="w-full">
      <Label>Praksis</Label>
      <Select
        name="status"
        className="w-full"
        onChange={(e) => changeArea(e.target.value as Area, pathname)}
        value={token.activeArea}
      >
        {Object.keys(Area).map((area) => (
          <option key={area} value={area} className="capitalize">
            {area.replaceAll("_", " ").toLocaleLowerCase()}
          </option>
        ))}
      </Select>
    </Field>
  );
};
