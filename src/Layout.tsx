import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Nav from "@components/Nav";
import Debug from "@components/Debug";
import CustomOutlet from "@components/CustomOutlet";
import LoadingScreen from "@components/LoadingScreen";

function Layout() {
  // GSAP Plugins
  gsap.registerPlugin(useGSAP);

  return (
    <main id="main-container">
      {/* TODO - Refacto Loader and include real loading data */}
      <Debug />
      <Nav />

      {/* Loading Components */}
      <LoadingScreen />

      {/* React-router's Outlet with page transitions */}
      <CustomOutlet />
    </main>
  );
}

export default Layout;
