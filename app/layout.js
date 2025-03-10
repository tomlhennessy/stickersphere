
import "./globals.css";
import "./fanta.css"
import Head from "./head";
import Link from "next/link";
import Cart from "@/components/Cart";



export const metadata = {
  title: "StickerSphere",
  description: "A super cool store for programmers and productivity fiends!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head />
      <body>
        <div id="portal" />
        <div id="app">
          <header>
            <Link href={'/'}>
              <h1>StickerSphere</h1>
            </Link>

            <h5 className='mid-text'>- Cool stuff for cool people -</h5>
            <Cart />
          </header>
          <main>
            {children}
          </main>
          <div className='hr' />
          <footer></footer>
        </div>
      </body>
    </html>
  );
}
