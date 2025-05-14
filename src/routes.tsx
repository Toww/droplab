import {
  type RouteConfig,
  route,
  layout,
  prefix
} from "@react-router/dev/routes";

export default [
  layout("./Layout.tsx", [
    route("projects?/", "./routes/Work.tsx"),

    route("about", "./routes/About.tsx"),

    ...prefix("projects", [route(":pid", "./routes/ProjectDetails.tsx")])
  ])
] satisfies RouteConfig;
