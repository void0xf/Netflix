"use client";

import { useState } from "react";
import { Box, Typography, Container, Tabs, Tab } from "@mui/material";
import { teal, grey, deepPurple, pink } from "@mui/material/colors"; // Add pink for tab colors
import { Visibility, VisibilityOff } from "@mui/icons-material";
import SignUp from "../signUp/page";
import Login from "../login/page";

// Custom TabPanel component for Material UI Tabs
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

const AuthWindow = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [value, setValue] = useState(0); // Current active tab

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login submitted:", loginData);
    // Add logic to send data to API
  };

  // Handle registration form submission
  const handleRegisterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Registration submitted:", registerData);
    // Add logic to send data to API
  };

  // Toggle password visibility
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Box
        sx={{
          mt: 4,
          p: 4,
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.5)",
          borderRadius: 2,
          bgcolor: "background.paper",
          background: `linear-gradient(145deg, ${grey[900]}, ${grey[800]})`,
          border: `1px solid ${grey[700]}`,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          align="center"
          gutterBottom
          sx={{
            color: "common.white",
            fontWeight: 700,
            letterSpacing: 1,
            mb: 3,
          }}
        >
          Netflix better
        </Typography>

        <Tabs
          value={value}
          onChange={(event, newValue) => setValue(newValue)}
          aria-label="Auth tabs"
          sx={{
            "--Tab-indicatorThickness": "3px",
            "--Tab-indicatorRadius": "4px",
          }}
        >
          <Tab
            sx={{
              width: "50%",
              color: grey[400],
            }}
            label="Logowanie"
          />
          <Tab
            sx={{
              width: "50%",
              color: grey[400],
            }}
            label="Rejestracja"
          />
        </Tabs>

        <TabPanel value={value} index={0}>
          <Login />
        </TabPanel>

        <TabPanel value={value} index={1}>
          <Box component="form" onSubmit={handleRegisterSubmit} noValidate>
            <SignUp />
          </Box>
        </TabPanel>
      </Box>
    </Container>
  );
};

export default AuthWindow;
