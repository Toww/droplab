import { createBrowserRouter } from "react-router";
import About from "@components/About";
import Work from "@components/Work";
import ProjectDetails from "@components/ProjectDetails";
import Layout from "src/Layout";
import RouteErrorBoundary from "./RouteErrorBoundary";

export default createBrowserRouter([
  {
    path:"/",
    Component: Layout,
    ErrorBoundary: RouteErrorBoundary,
    children: [
      {
        index: true,
        Component: Work,
      },
      {
        path: "projects",
        children: [
          {
            index: true,
            Component: Work,
          },
          {
            path: ":pid",
            Component: ProjectDetails,
            ErrorBoundary: RouteErrorBoundary,
          }
        ]
      },
      {
        path: "about",
        Component: About
      }
    ]
  }
]);
