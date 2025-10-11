import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "./routeTree"
import React from "react";
const HomePage = React.lazy(() => import("../pages/Home.jsx"));

export const homePageRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: HomePage,
  })