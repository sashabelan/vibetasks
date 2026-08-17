import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VibeTasks",
  description: "A simple, focused task list.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
