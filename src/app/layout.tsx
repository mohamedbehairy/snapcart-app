import SessionContext from "@/components/SessionContext/SessionContext";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "SnapCart | Modern E-commerce Store",
    template: "%s | SnapCart",
  },
  description:
    "Discover the latest fashion trends and cutting-edge electronics. Shop with confidence with secure payments and fast delivery across Egypt.",
  keywords: [
    "fashion",
    "electronics",
    "online shopping",
    "Egypt",
    "SnapCart",
    "ecommerce",
  ],
  authors: [{ name: "SnapCart Team" }],
  creator: "SnapCart",
  publisher: "SnapCart",
  icons: {
    icon: "/favicon2.ico",
  },
 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <SessionContext>{children}</SessionContext>
      </body>
    </html>
  );
}
