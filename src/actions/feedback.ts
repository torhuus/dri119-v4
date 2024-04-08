"use server";

import { Resend } from "resend";
import { Token, getToken } from "./auth";

export const sendResendFeedback = async (message: string, type: string) => {
  const token = (await getToken()) as Token;

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: "ITIL Feedback <feedback@varsel.huus.me>",
    to: ["tor@huus.me"],
    subject: "Feedback fra ITIL applikasjon",
    html: `
    <div style="padding: 16px;">
    <div style="font-weight: bold; margin-bottom: 4px;">Message</div>
    <div style="margin-bottom: 16px;">${message}</div>

    <div style="font-weight: bold; margin-bottom: 4px;">Type</div>
    <div style="margin-bottom: 16px;">${type}</div>

    <div style="font-weight: bold; margin-bottom: 4px;">Date/Time</div>
    <div style="margin-bottom: 16px;">${new Date().toLocaleString()}</div>

    <div style="font-weight: bold; margin-bottom: 4px;">ExerciseId</div>
    <div style="margin-bottom: 16px;">${token.exerciseId}</div>

    <div style="font-weight: bold; margin-bottom: 4px;">UserId</div>
    <div style="margin-bottom: 16px;">${token.userId}</div>

    <div style="font-weight: bold; margin-bottom: 4px;">Active area</div>
    <div>${token.activeArea}</div>
</div>

    `,
  });

  if (error) {
    console.error("Error sending feedback", error);
    return { error: "Error sending feedback" };
  }

  return { message: "Feedback sent successfully" };
};
