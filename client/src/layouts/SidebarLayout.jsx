import React, { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Divider,
  Collapse,
  Tooltip,
  Avatar,
  Badge,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  ExpandLess,
  ExpandMore,
  AccountCircle,
  Menu as MenuIcon,
  Logout,
  Notifications,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";

// import { getUser } from "../features/auth/authSlice";
const drawerWidth = 240;

const SidebarLayout = ({ onToggleDrawer, mobileOpen }) => {
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleUserClick = () => setOpenUserMenu(!openUserMenu);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };


  const user = useSelector((state) => state.auth.user);
  // console.log("user", user);

  // const user = getUser();
  //   console.log("user->", user.name);

  // const { name } = user;
  // console.log("name", name);

  // const { name } = user;
  let name = "";
  if (user) {
    ({ name } = user);
  }

  const firstLetter = name ? name.charAt(0).toUpperCase() : "";
  // console.log("firstLetter", firstLetter);


  const isActive = (path) => location.pathname === path;

  const drawer = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>

      <Box
        sx={{
          p: 2,
          textAlign: "center",
          // background: "linear-gradient(135deg, #1976d2, #42a5f5)",
          background: "linear-gradient(135deg, #1976d2, #1976d2)",
          color: "white",
          borderBottom: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        <Avatar
          sx={{
            mx: "auto",
            bgcolor: "rgba(255,255,255,0.2)",
            width: 60,
            height: 60,
            mb: 1,
            fontSize: "1.8rem",
            // textTransform: 'uppercase'
          }}

        >
          {firstLetter}
        </Avatar>
        <Typography sx={{ textTransform: 'uppercase' }} fontWeight={600}>
          Welcome  {user ? user?.name : "Guest"}
        </Typography>
        {/* <Typography variant="caption" sx={{ opacity: 0.9 }}>
          v1.0.0
        </Typography> */}
      </Box>

      {/* 🔹 Sidebar Menu */}
      <List sx={{ flexGrow: 1, pt: 2 }}>
        <Tooltip title="Dashboard" placement="right">
          <ListItemButton
            selected={isActive("/dashboard")}
            onClick={() => navigate("/dashboard")}
            sx={{
              mx: 1,
              borderRadius: 2,
              "&.Mui-selected": {
                backgroundColor: "rgba(25,118,210,0.1)",
                color: "#1976d2",
                fontWeight: 600,
              },
            }}
          >
            <ListItemIcon>
              <DashboardIcon color={isActive("/dashboard") ? "primary" : "inherit"} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </Tooltip>

        {/* 👤 User Section */}
        <ListItemButton onClick={handleUserClick} sx={{ mx: 1, borderRadius: 2 }}>
          <ListItemIcon>
            <PersonIcon color={openUserMenu ? "primary" : "inherit"} />
          </ListItemIcon>
          <ListItemText primary="User" />
          {openUserMenu ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openUserMenu} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{
                pl: 6,
                mx: 1,
                borderRadius: 2,
                "&.Mui-selected": {
                  backgroundColor: "rgba(25,118,210,0.1)",
                  color: "#1976d2",
                  fontWeight: 600,
                },
              }}
              selected={isActive("/profile")}
              onClick={() => navigate("/profile")}
            >
              <ListItemIcon>
                <AccountCircle color={isActive("/profile") ? "primary" : "inherit"} />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </List>
        </Collapse>

        {/* Notifications */}
        <ListItemButton sx={{ mx: 1, borderRadius: 2 }}>
          <ListItemIcon>
            <Badge color="error" variant="dot">
              <Notifications color="action" />
            </Badge>
          </ListItemIcon>
          <ListItemText primary="Notifications" />
        </ListItemButton>
      </List>

      {/* 🔻 Footer Section */}
      <Divider />
      <ListItemButton
        onClick={handleLogout}
        sx={{
          mx: 1,
          mb: 1,
          borderRadius: 2,
          "&:hover": { backgroundColor: "rgba(255,0,0,0.08)" },
        }}

      >
        <ListItemIcon >
          <Logout color="error" />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>

      <Typography
        variant="caption"
        textAlign="center"
        sx={{ mb: 2, color: "text.secondary" }}
      >
        © 2025 MyApp Inc.
      </Typography>
    </Box>
  );

  return (
    <>
      {/* 🔵 AppBar (Top Header) */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background: "linear-gradient(135deg, #1976d2, #1976d2)",
          boxShadow: "0px 3px 8px rgba(0,0,0,0.2)",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={onToggleDrawer}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap fontWeight={600}>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* 📱 Drawer Section */}
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={onToggleDrawer}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { width: drawerWidth, boxShadow: 3 },
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
              borderRight: 0,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};

export default SidebarLayout;
