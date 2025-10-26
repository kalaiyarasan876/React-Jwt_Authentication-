// LoaderBar.jsx
import { LinearProgress, Box } from "@mui/material";

const LoaderBar = () => (
  <Box
    sx={{
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "50%", // adjust width as needed
      zIndex: 1200,
    }}
  >
    <LinearProgress color="primary" />
  </Box>
);

export default LoaderBar;
