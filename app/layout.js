import HeaderBackground from "@/components/main-header/header-background";
import "./globals.css";
import MainHeader from "@/components/main-header/main-header";

export const metadata = {
  title: "NextLevel Food",
  description: "Delicious meals, shared by a food-loving community.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <HeaderBackground />
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
