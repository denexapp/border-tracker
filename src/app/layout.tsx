import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import User from "@/app/_ui/user";
import Paper from "@/shared/ui/paper";
import ButtonLink from "@/shared/ui/buttonLink";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "border tracker",
  description: "an app to track border crossings",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSans.className} scheme-light-dark antialiased min-h-svh grid grid-rows-[auto_1fr] gap-2 p-2 text-content bg-bg`}>
        <Paper>
          <div className="flex gap-2 items-center justify-between p-2">
            <ButtonLink href="/">border tracker</ButtonLink>
            <User />
          </div>
        </Paper>
        <Paper>{children}</Paper>
      </body>
    </html>
  );
}
