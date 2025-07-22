import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Future Ballers Association",
  description: "Premier destination for youth basketball in Illinois",
  icons: {
    icon: '/future-ballers-logo-2.png',
    shortcut: '/future-ballers-logo-2.png',
    apple: '/future-ballers-logo-2.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-inter antialiased bg-fba-gray`}>
        <Navbar />
        <main className="min-h-screen pt-[73px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
