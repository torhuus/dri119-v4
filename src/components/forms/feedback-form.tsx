"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { sendResendFeedback } from "@/actions/feedback";

const FeedbackForm = () => {
  const [feedbackType, setFeedbackType] = useState("BUG");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [sending, setSending] = useState(false);

  const handleSend = async (e: any) => {
    e.preventDefault();
    setSending(true);
    const res = await sendResendFeedback(feedbackMessage, feedbackType);

    if (res.error) {
      setSending(false);
      alert(res.error);
    } else {
      setSending(false);
      res.message;
      setFeedbackType("BUG");
      setFeedbackMessage("");
    }
  };

  return (
    <Card className="">
      <CardHeader className="p-4">
        <CardTitle>Tilbakemelding</CardTitle>
        <CardDescription>
          Gi tilbakemelding på feil eller mangler.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
        <form>
          <div className="mt-4 flex flex-col gap-4 text-left">
            <div className="flex flex-col gap-2">
              <Label htmlFor="feedback">Tilbakemelding</Label>
              <Textarea
                id="feedback"
                placeholder="Gi en beskrivelse på hva du gjorde når feilen eller den uønskede funksjonen/handlingen skjedde."
                required
                rows={6}
                onChange={(e) => setFeedbackMessage(e.target.value)}
                value={feedbackMessage}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="type">Type</Label>
              <Select
                name="type"
                onValueChange={(value) => setFeedbackType(value)}
                value={feedbackType}
              >
                <SelectTrigger id="type" name="type">
                  <SelectValue
                    placeholder="Velg type tilbakemelding"
                    defaultValue="BUG"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BUG">Feil</SelectItem>
                  <SelectItem value="FEATURE">Ønske</SelectItem>
                  <SelectItem value="DESIGN">Design</SelectItem>
                  <SelectItem value="OTHER">Annet</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:items flex flex-col justify-end gap-2 md:flex-row">
              <Button disabled={sending} onClick={(e) => handleSend(e)}>
                {sending ? "Sender..." : "Send"}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default FeedbackForm;
