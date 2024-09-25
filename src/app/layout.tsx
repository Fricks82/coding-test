import { Header } from "@/components/ui/Header/Header";
import "./globals.css";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja">
      <body>
        <div className="wrapper">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
