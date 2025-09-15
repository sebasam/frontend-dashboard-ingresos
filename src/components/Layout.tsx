import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";

export default function Layout() {
    return (
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar />
            <Box component="main" sx={{ flex: 1 }}>
                <Topbar />
                <Box sx={{ p: { xs: 2, md: 4 } }}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
}
