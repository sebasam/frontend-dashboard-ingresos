import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
  Box
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PieChartIcon from "@mui/icons-material/PieChart";
import { NavLink } from "react-router-dom";

const drawerWidth = 240;

const navItems = [
  { label: "Dashboard", path: "/", icon: <DashboardIcon /> },
  { label: "Transacciones", path: "/transactions", icon: <ListAltIcon /> },
  { label: "Reportes", path: "/reports", icon: <PieChartIcon /> }
];

export default function Sidebar({ open, onClose }: any) {
  const drawerContent = (
    <>
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
            onClick={onClose}
            sx={{
              "&.active": {
                backgroundColor: "rgba(99,102,241,0.08)"
              }
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </>
  );

  return (
    <>
      {/* MOBILE */}
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        sx={{
          display: { xs: "block", md: "none" },
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth
          }
        }}
      >
        {drawerContent}
      </Drawer>

      {/* DESKTOP */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box"
          }
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </>
  );
}