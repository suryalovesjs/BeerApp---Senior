import { Box } from "@mui/material";
import React from "react";
import TopBar from "../TopBar";

const drawerWidth = 240;

interface Props {
  children: React.ReactNode;
}

export default function ResponsiveDrawer(props: Props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <TopBar
          drawerWidth={drawerWidth}
          handleDrawerToggle={handleDrawerToggle}
        />
      </Box>
      <Box
        component="main"
        sx={{
          width: { xs: "100%" },
          background: "#f7f7f7",
        }}
      >
        {props.children}
      </Box>
    </>
  );
}
