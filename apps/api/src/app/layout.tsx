import type { Metadata } from "next";

import "@primer/css/dist/primer.css";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Gov Portal",
    template: "%s · Gov Portal",
  },
  description:
    "Public technology, built in public — one project, its open issues, and the approved member directory.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-color-mode="light" data-light-theme="light">
      <body>{children}</body>
    </html>
  );
}
