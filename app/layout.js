import { Toaster } from "sonner";
import "./globals.css";
import Navbar from "@/components/common/NavBar";

export const metadata = {
  title: "Expense Tracker",
  description:
    "A simple expense tracker app built with Next.js 13, React, and Tailwind CSS.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
        <Navbar />

        {children}

        <Toaster
          position="top-right"
          richColors
          expand
          duration={2000}
          visibleToasts={3}
          toastOptions={{
            style: {
              maxWidth: "90vw",
            },
          }}
        />
      </body>
    </html>
  );
}
