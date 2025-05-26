import "./style.css";
import { Meta, Links, NavLink, Scripts, Outlet } from "react-router";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Drop</title>

        <Meta />
        <Links />

        {/* -- Preloading Fonts -- */}
        {/* Getai */}
        <link
          rel="preload"
          href="/fonts/GetaiGrotesk.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Bricolage grotesque */}
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="preload"
          href="https://fonts.gstatic.com/s/bricolagegrotesque/v8/3y9K6as8bTXq_nANBjzKo3IeZx8z6up5BeSl9D4dj_x9PpZBMlGIInHWUSNIpvI.woff2"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  return (
    <div className="-mt-4 flex h-screen w-full flex-col items-center justify-center gap-8 text-center">
      <h2 className="font-getai text-5xl leading-none font-normal text-amber-500">
        Oopsie !
      </h2>
      <img src="/images/other/notfound.gif" alt="Not found gif" />
      <p className="text-stone-700">
        Something went wrong or this page doesn't exist.
      </p>
      <NavLink to="/" className="text-stone-700 underline">
        Go back to homepage
      </NavLink>
    </div>
  );
}
