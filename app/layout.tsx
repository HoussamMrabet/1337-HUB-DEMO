import type { Metadata } from "next";
import "./globals.css";
import Provider from "@/lib/Providers";

export const metadata: Metadata = {
  title: "1337 HUB",
  description: "1337 HUB - The Ultimate Platform for 1337 Students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
          <div className="min-h-screen bg-gray-900">
            <Provider>
              {children}
            </Provider>
          </div>
      </body>
    </html>
  );
}
