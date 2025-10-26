import React from "react";
import { Outlet, useNavigation } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";
import SidebarLayout from "./SidebarLayout";
import LoaderBar from "../components/Loader";

const MainLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f9fafc" }}>
      <SidebarLayout />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          overflowY: "auto",
          width: "100%",
          position: "relative",
        }}
      >
        <Toolbar />
        {isLoading && <LoaderBar />}
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
