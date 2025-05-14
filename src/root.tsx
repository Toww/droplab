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
