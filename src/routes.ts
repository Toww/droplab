import { createBrowserRouter } from "react-router";
import Layout from "./Layout";
import About from "./components/About";
import Work from "./components/Work/Work";
import ProjectDetails from "./components/ProjectDetails/ProjectDetails";

export default createBrowserRouter([
  {
    Component: Layout,
    children: [
      {
        path: "/",
        Component: Work
      },
      {
        path: "/projects",
        children: [
          {
            path: ":pid",
            Component: ProjectDetails
          }
        ]
      },
      {
        path: "/about",
        Component: About
      }
    ]
  }
]);
