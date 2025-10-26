import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, clearError } from "../features/auth/authSlice";
//import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button, Paper, InputAdornment, IconButton } from "@mui/material";
// import { clearError } from "../features/auth/authSlice";
import { Visibility, VisibilityOff } from "@mui/icons-material";


const LoginForm = () => {
  
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(form));
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
      dispatch(clearError());
    }

  }, [user, navigate, dispatch]);


  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        p: 2,
        zIndex: 9999,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 420,
          p: { xs: 3, sm: 4 },
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h5"
          align="center"
          fontWeight={600}
          mb={3}
          color="primary"
        >
          Login
        </Typography>

        {error && (
          <Typography
            color="error"
            textAlign="center"
            sx={{ mb: 2, fontSize: "0.9rem" }}
          >
            {error.message || error}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            size="medium"
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            // type="password"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            size="medium"


            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            variant="contained"
            type="submit"
            fullWidth
            disabled={loading}
            sx={{
              mt: 3,
              py: 1.2,
              fontSize: "1rem",
              textTransform: "none",
              borderRadius: 2,
            }}
          >
            {loading ? "Signing In..." : "Login"}
          </Button>
        </form>

        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 3 }}
        >
          Don’t have an account?{" "}
          <span style={{ color: "#1976d2", cursor: "pointer" }} onClick={() => navigate("/register")}>
            Register here
          </span>
        </Typography>
      </Paper>
    </Box>
  );
};



export default LoginForm;
