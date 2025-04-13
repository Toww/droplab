import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Nav from "./components/Nav";
import Debug from "./components/Debug";
import Loader from "./components/Loader";
import CustomOutlet from "./components/CustomOutlet";

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

        {/* React-router's Outlet with page transitions */}
        <CustomOutlet />
      </main>
    </>
  );
}

export default Layout;
