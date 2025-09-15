import React from "react";
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Divider, Box } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PieChartIcon from "@mui/icons-material/PieChart";
import SettingsIcon from "@mui/icons-material/Settings";
import { NavLink } from "react-router-dom";

const drawerWidth = 240;

const navItems = [
  { label: "Dashboard", path: "/", icon: <DashboardIcon /> },
  { label: "Transacciones", path: "/transactions", icon: <ListAltIcon /> },
  { label: "Reportes", path: "/reports", icon: <PieChartIcon /> },
  { label: "Configuración", path: "/profile", icon: <SettingsIcon /> },
];

export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box", bgcolor: "white" },
        display: { xs: "none", md: "block" },
      }}
    >
      <Toolbar sx={{ px: 2, py: 3 }}>
        <Box>
          <img src="/logo192.png" alt="logo" style={{ height: 40 }} />
        </Box>
      </Toolbar>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItemButton
            component={NavLink}
            to={item.path}
            key={item.path}
            sx={{
              "&.active": { backgroundColor: "rgba(99,102,241,0.08)" },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}
