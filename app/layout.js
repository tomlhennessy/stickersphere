
import "./globals.css";
import "./fanta.css"



export const metadata = {
  title: "StickerSphere",
  description: "A super cool store for programmers and productivity fiends!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
