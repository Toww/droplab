import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Nav from "./components/Nav";
import Debug from "./components/Debug";
import Loader from "./components/Loader";
import { Outlet } from "react-router";
function Layout() {
  // GSAP Config
  gsap.registerPlugin(useGSAP);

  return (
    <>
      <main id="main-container">
        {/* TODO - Refacto Loader and include real loading data */}
        <Loader />
        <Debug />
        <Nav />

        {/* React-router's provided components, as configured in routes.ts*/}
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
