import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Nav from "@components/Nav";
import Debug from "@components/Debug";
import LoadingBar from "@components/LoadingBar";
import CustomOutlet from "@components/CustomOutlet";

function Layout() {
  // GSAP Plugins
  gsap.registerPlugin(useGSAP);

  return (
    <main id="main-container">
      {/* TODO - Refacto Loader and include real loading data */}
      <Debug />
      <Nav />

      {/* Loading Components */}
      <LoadingBar />

      {/* React-router's Outlet with page transitions */}
      <CustomOutlet />
    </main>
  );
}

export default Layout;
