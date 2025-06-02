import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Nav from "@components/Nav";
import Debug from "@components/Debug";
import CustomOutlet from "@components/CustomOutlet";
import LoadingScreen from "@components/LoadingScreen";

function Layout() {
  // GSAP Plugins
  gsap.registerPlugin(useGSAP);

  return (
    <>
      <Debug />
      <Nav />
      <LoadingScreen />

      {/* React-router's Outlet with page transitions */}
      <CustomOutlet />
    </>
  );
}

export default Layout;
