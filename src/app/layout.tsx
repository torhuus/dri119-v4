import "./globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nb">
      <head>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex justify-center",
          fontSans.variable
        )}
      >
        <div className="grow max-w-lg">
          {children}
          <Toaster />
        </div>
      </body>
    </html>
  );
}
