import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/header";
import CreateEventDrawer from "@/components/create-event";
import { checkUser } from "@/lib/checkUser";
import { auth } from "@clerk/nextjs/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Schedulrr",
  description: " ",
};

export default async function RootLayout({ children }) {
  // Call checkUser when user is authenticated
  const { userId } = auth();
  if (userId) {
    await checkUser();
  }

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            {children}
          </main>
          <footer className="bg-blue-100 py-12">
            <div className="container mx-auto px-4 text-center text-gray-600">
              <p>Made by Shashikanth</p>
            </div>
          </footer>
          <CreateEventDrawer />
        </body>
      </html>
    </ClerkProvider>
  );
}