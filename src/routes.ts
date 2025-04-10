import { createBrowserRouter } from "react-router";
import Layout from "./Layout";
import Work from "./components/Work/Work";
import About from "./components/About";
import ProjectDetail from "./components/ProjectDetail";

export default createBrowserRouter([
  {
    Component: Layout,
    children: [
      {
        path: "/",
        Component: Work
      },
      {
        path: "/project",
        children: [
          {
            path: ":pid",
            Component: ProjectDetail
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
