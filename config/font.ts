import { Noto_Sans_SC, Ubuntu } from "next/font/google";

export const enFont = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const zhCnFont = Noto_Sans_SC({
  variable: "--font-not-sans-sc",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});
