"use client";
import { Field, Label } from "@/components/catalyst/fieldset";
import { Input } from "@/components/catalyst/input";
import { useState } from "react";
import { Switch, SwitchField } from "./catalyst/switch";
import { Button } from "./catalyst/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Authentication = () => {
  const [name, setName] = useState<string>("");
  const [demoContent, setDemoContent] = useState<boolean>(false);

  return (
    <Tabs defaultValue="new" className="w-full min-w-56">
      <TabsList className="w-full flex min-w-56">
        <TabsTrigger className="grow" value="new">
          Ny
        </TabsTrigger>
        <TabsTrigger className="grow" value="existing">
          Eksisterende
        </TabsTrigger>
      </TabsList>
      <TabsContent value="new">
        <div className="flex flex-col gap-4 text-left">
          <Field>
            <Label htmlFor="name">Navn på øvelse</Label>
            <Input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e: any) => setName(e.target.value)}
            />
          </Field>
          <SwitchField>
            <Label>Importer demo-innhold?</Label>
            <Switch
              name="demoContent"
              checked={demoContent}
              onChange={(e: any) => setDemoContent(!demoContent)}
            />
          </SwitchField>

          <Button>Opprett øvelse</Button>
        </div>
      </TabsContent>
      <TabsContent value="existing"></TabsContent>
    </Tabs>
  );
};

export default Authentication;
