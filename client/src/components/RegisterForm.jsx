import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, clearError } from "../features/auth/authSlice";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, user } = useSelector((state) => state.auth);

    const [form, setForm] = useState({ name: "", email: "", password: "" });

    // Clear old errors when component mounts
    useEffect(() => {
        dispatch(clearError());
    }, [dispatch]);

    // Redirect if user is already logged in
    useEffect(() => {

        if (user) navigate("/dashboard");
        dispatch(clearError());
    }, [user, navigate, dispatch]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(register(form));
    };

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
                    p: 4,
                    width: "100%",
                    maxWidth: 400,
                    borderRadius: 3,
                    backgroundColor: "white",
                }}
            >
                <Typography
                    variant="h5"
                    mb={2}
                    align="center"
                    sx={{ fontWeight: 600 }}
                >
                    Register
                </Typography>

                {error && (
                    <Typography
                        color="error"
                        variant="body2"
                        align="center"
                        sx={{ mb: 2 }}
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
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                    />

                    <Button
                        variant="contained"
                        type="submit"
                        fullWidth
                        disabled={loading}
                        sx={{
                            mt: 3,
                            py: 1.2,
                            textTransform: "none",
                            fontSize: "1rem",
                        }}
                    >
                        {loading ? "Registering..." : "Register"}
                    </Button>
                </form>

                <Typography
                    variant="body2"
                    align="center"
                    sx={{ mt: 2, color: "text.secondary" }}
                >
                    Already have an account?{" "}
                    <span
                        style={{ color: "#1976d2", cursor: "pointer" }}
                        onClick={() => navigate("/login")}
                    >
                        Login here
                    </span>
                </Typography>
            </Paper>
        </Box>
    );
};

export default RegisterForm;
