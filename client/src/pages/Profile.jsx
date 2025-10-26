import React from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Avatar,
  Button,
  Divider,
} from "@mui/material";
import { Mail, Phone, MapPin, UserRoundCog } from "lucide-react";

import { fetchProfiles } from "../features/auth/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Profile = () => {
  // const user = {
  //   name: "Kalaiyarasan M",
  //   email: "kalai12w333@gmail.com",
  //   role: "Software Developer",
  //   phone: "+91 98765 43210",
  //   address: "Chennai, Tamil Nadu",
  // };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfiles());
  }, []);

  const { profiles, loading, error } = useSelector((state) => state.profile);

  function getFormattedDate(date) {
    const d = new Date(date);
    let year = d.getFullYear();
    let month = (1 + d.getMonth()).toString().padStart(2, '0');
    let day = d.getDate().toString().padStart(2, '0');

    return month + '/' + day + '/' + year;
  }

  // const { images } = useSelector((state) => state.image);
  // console.log("images", images?.ID);

  //  const { GENDER } = profiles;

  //console.log("GENDER" , GENDER);
  console.log("profiles", profiles);

  if (loading) return <p>Loading...</p>
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>

  // const name = profiles?.NAME.substring(0,1);
  //console.log("name", name);




  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          minHeight: "100vh",
          bgcolor: "linear-gradient(135deg, #e3f2fd 0%, #fce4ec 100%)",
          //  p: { xs: 2, md: 6 },
        }}
      >
        <Paper
          elevation={5}
          sx={{
            width: "100%",
            ///   maxWidth: 800,
            p: { xs: 3, md: 5 },
            borderRadius: 5,
            backdropFilter: "blur(10px)",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.85), rgba(255,255,255,0.65))",
            boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
            // transition: "transform 0.3s, box-shadow 0.3s",
            // "&:hover": {
            //   transform: "translateY(-5px)",
            //   boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
            // },
          }}
        >
          {/* Header Section */}
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm={3} textAlign="center">
              <Avatar
                sx={{
                  width: 110,
                  height: 110,
                  mx: "auto",
                  bgcolor: "primary.main",
                  fontSize: "2.5rem",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                }}
              >
                {profiles?.NAME?.charAt(0)?.toUpperCase() || ""}

              </Avatar>
            </Grid>

            <Grid item xs={12} sm={9}>
              <Typography variant="h5" fontWeight={700}>
              Name: {profiles.NAME}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{ mb: 1 }}
              >
              Designation: {profiles.DESIGNATION}
              </Typography>

              <Box display="flex" alignItems="center" gap={1}>
                <Mail size={18} color="#1976d2" />
                <Typography variant="body2" color="text.secondary">
               Email: {profiles.EMAIL}
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {/* Divider */}
          <Divider sx={{ my: 3 }} />

          {/* Details Section */}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <Phone size={18} color="#2e7d32" />
                <Typography variant="subtitle2" color="text.secondary">
                  Phone
                </Typography>
              </Box>
              <Typography variant="body1" fontWeight={500}>
                {profiles.PHONE_NO}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center" gap={1} mb={1}>

                <Typography variant="subtitle2" color="text.secondary">
                  DOB
                </Typography>
              </Box>
              <Typography variant="body1" fontWeight={500}>
                {getFormattedDate(profiles.DATE_OF_BIRTH)}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <MapPin size={18} color="#d32f2f" />
                <Typography variant="subtitle2" color="text.secondary">
                  Address
                </Typography>
              </Box>
              <Typography variant="body1" fontWeight={500}>
                {profiles.LOCATION}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center" gap={1} mb={1}>

                <Typography variant="subtitle2" color="text.secondary">
                  Gender
                </Typography>
              </Box>
              <Typography variant="body1" fontWeight={500}>
                {profiles.GENDER}
              </Typography>
            </Grid>
          </Grid>

          {/* Action Section */}
          <Box textAlign="center" mt={5}>
            <Button
              variant="contained"
              size="large"
              startIcon={<UserRoundCog />}
              sx={{
                px: 4,
                py: 1.2,
                borderRadius: 3,
                fontWeight: 600,
                textTransform: "none",
                background: "linear-gradient(135deg, #1976d2, #64b5f6)",
                boxShadow: "0 4px 10px rgba(25, 118, 210, 0.3)",
                "&:hover": {
                  background: "linear-gradient(135deg, #1565c0, #42a5f5)",
                  boxShadow: "0 6px 14px rgba(25, 118, 210, 0.4)",
                },
              }}
            >
              Edit Profile
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default Profile;
