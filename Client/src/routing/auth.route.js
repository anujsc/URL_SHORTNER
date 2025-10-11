import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "./routeTree"
import React from "react";
const AuthPage = React.lazy(() => import("../pages/AuthPage"));

export const authRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/auth',
    component: AuthPage,
  })