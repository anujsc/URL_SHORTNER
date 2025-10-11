import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "./routeTree"
import React from "react";
const DashboardPage = React.lazy(() => import("../pages/DashboardPage"));
import { checkAuth } from "../utils/helper"

export const dasboardRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/dashboard',
    component: DashboardPage,
    beforeLoad: checkAuth
})