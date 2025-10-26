import React from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  Avatar,
  Divider,
} from "@mui/material";
import {
  BarChart3,
  Users,
  ShoppingBag,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { name: "Jan", revenue: 4000 },
  { name: "Feb", revenue: 7000 },
  { name: "Mar", revenue: 6500 },
  { name: "Apr", revenue: 9000 },
  { name: "May", revenue: 8500 },
  { name: "Jun", revenue: 11000 },
];

const Dashboard = () => {
  const stats = [
    {
      title: "Total Users",
      value: "1,245",
      icon: <Users size={28} color="#1976d2" />,
      color: "linear-gradient(135deg, #42a5f5, #478ed1)",
    },
    {
      title: "Orders",
      value: "320",
      icon: <ShoppingBag size={28} color="#43a047" />,
      color: "linear-gradient(135deg, #66bb6a, #388e3c)",
    },
    {
      title: "Revenue",
      value: "$24,580",
      icon: <DollarSign size={28} color="#ff9800" />,
      color: "linear-gradient(135deg, #ffb74d, #f57c00)",
    },
    {
      title: "Reports",
      value: "12",
      icon: <BarChart3 size={28} color="#e91e63" />,
      color: "linear-gradient(135deg, #f06292, #c2185b)",
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box textAlign="center" mb={5}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Get insights and trends from your latest business data.
        </Typography>
      </Box>

      {/* Stat Cards */}
      <Grid container spacing={3}>
        {stats.map((item, i) => (
          <Grid item xs={12} sm={6} md={7} key={i}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 4,
                background: item.color,
                color: "#fff",
                
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: 8,
                  
                },
                
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "rgba(255,255,255,0.2)",
                      width: 48,
                      height: 48,
                    }}
                  >
                    {item.icon}
                  </Avatar>
                  <TrendingUp size={24} />
                </Box>
                <Typography variant="h6" sx={{ opacity: 0.9 }}>
                  {item.title}
                </Typography>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{ mt: 1, letterSpacing: 1 }}
                >
                  {item.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Chart Section */}
      <Card
        sx={{
          mt: 6,
          p: 3,
          borderRadius: 3,
          boxShadow: 4,
        }}
      >
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Revenue Trend
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <ResponsiveContainer width="100%" height={300} >
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#1976d2"
              strokeWidth={3}
              dot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Footer CTA */}
      <Box textAlign="center" mt={5}>
        <Typography variant="h6" gutterBottom>
          Ready to explore detailed analytics?
        </Typography>
        <Button variant="contained" color="primary" size="large">
          View Reports
        </Button>
      </Box>
    </Box>
  );
};

export default Dashboard;
