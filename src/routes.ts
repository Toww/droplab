import { createBrowserRouter } from "react-router";
import About from "@components/About";
import Work from "@components/Work/Work";
import ProjectDetails from "@components/ProjectDetails";
import Layout from "src/Layout";

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
