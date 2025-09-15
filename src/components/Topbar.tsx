import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Box, Avatar, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handleMenu = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const onLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Toolbar sx={{ minHeight: 64, px: { xs: 1, md: 4 } }}>
        <Typography variant="h6" sx={{ flex: 1, fontWeight: "700" }}>
          Panel de Finanzas
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="body2" color="textSecondary">{user?.name}</Typography>
          <IconButton onClick={handleMenu} size="small">
            <Avatar sx={{ width: 36, height: 36 }}>{user?.name?.[0] ?? "U"}</Avatar>
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={() => { handleClose(); navigate("/profile"); }}>Perfil</MenuItem>
            <MenuItem onClick={() => { handleClose(); onLogout(); }}>Cerrar sesión</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
