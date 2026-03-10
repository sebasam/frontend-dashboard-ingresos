import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { useState } from "react";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerOpen = () => {
    setMobileOpen(true);
  };

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      
      <Sidebar open={mobileOpen} onClose={handleDrawerClose} />

      <Box component="main" sx={{ flex: 1 }}>
        <Topbar onMenuClick={handleDrawerOpen} />

        <Box sx={{ p: { xs: 2, md: 4 } }}>
          <Outlet />
        </Box>
      </Box>

    </Box>
  );
}