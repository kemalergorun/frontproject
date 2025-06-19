import { Roboto } from "next/font/google";
import localFont from "next/font/local";
import "@/styles/styles.scss";

export { metadata } from "@/constants/metadata";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["italic", "normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

const modulus = localFont({
  src: [
    {
      path: "../public/assets/fonts/Modulus.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/assets/fonts/Modulus_Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/assets/fonts/Modulus-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-modulus",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${modulus.variable}`}>
        {children}
      </body>
    </html>
  );
}
