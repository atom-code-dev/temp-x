import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/auth-context";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FreelanceHub - Connect with Top Freelancers",
  description: "The ultimate platform where talented freelancers meet forward-thinking organizations. Build amazing projects together, delivered with excellence.",
  keywords: ["freelance", "freelancer", "platform", "jobs", "talent", "organizations", "business"],
  authors: [{ name: "FreelanceHub Team" }],
  openGraph: {
    title: "FreelanceHub - Connect with Top Freelancers",
    description: "The ultimate platform where talented freelancers meet forward-thinking organizations.",
    url: "https://freelancehub.com",
    siteName: "FreelanceHub",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FreelanceHub - Connect with Top Freelancers",
    description: "The ultimate platform where talented freelancers meet forward-thinking organizations.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
