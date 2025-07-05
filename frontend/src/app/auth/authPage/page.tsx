"use client";

import { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import { grey } from "@mui/material/colors"; // Add pink for tab colors
import SignUp from "../signUp/page";
import Login from "../login/page";
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
  const [value, setValue] = useState(0);

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#101010",
        py: 4,
      }}
    >
      <Box
        sx={{
          p: 4,
          borderRadius: 2,
          backgroundColor: "rgba(0,0,0,0.5)",
          width: "40rem",
        }}
      >
        <Box mb={4} display="flex" justifyContent="center">
          <img
            src="/logo-no-background.png"
            alt="Logo"
            style={{ height: 50 }}
          />
        </Box>

        <Tabs
          value={value}
          onChange={(event, newValue) => setValue(newValue)}
          textColor="inherit"
          indicatorColor="primary"
          aria-label="Auth tabs"
          sx={{
            "--Tab-indicatorThickness": "3px",
            "--Tab-indicatorRadius": "4px",
            "& .MuiTabs-indicator": { backgroundColor: "red" },
            "& .MuiTab-root": { color: "grey" },
            "& .Mui-selected": { color: "red" },
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
          <SignUp />
        </TabPanel>
      </Box>
    </Box>
  );
};

export default AuthWindow;
