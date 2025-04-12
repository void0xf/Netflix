"use client";
import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Grid,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { grey, red } from "@mui/material/colors";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const sendData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  const inputStyles = {
    "& .MuiFilledInput-root": {
      backgroundColor: "transparent",
      borderRadius: 1,
      border: "2px solid transparent",
      color: "white",
      transition: "border 0.2s ease-in-out",

      "&.Mui-focused": {
        backgroundColor: "black",
        border: "2px solid red",
      },
    },
    "& .MuiInputLabel-root": {
      color: grey[400],
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "red",
    },
  };

  return (
    <Box component="form" onSubmit={sendData}>
      <Grid container spacing={3}>
        <TextField
          fullWidth
          label="Imię"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          variant="filled"
          InputProps={{ disableUnderline: true }}
          sx={inputStyles}
        />

        <TextField
          fullWidth
          label="Nazwisko"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
          variant="filled"
          InputProps={{ disableUnderline: true }}
          sx={inputStyles}
        />

        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          variant="filled"
          InputProps={{ disableUnderline: true }}
          sx={inputStyles}
        />

        <TextField
          fullWidth
          label="Hasło"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          required
          variant="filled"
          InputProps={{
            disableUnderline: true,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={toggleShowPassword}
                  edge="end"
                  sx={{ color: grey[400] }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={inputStyles}
        />
        <TextField
          fullWidth
          label="Potwierdź hasło"
          name="confirmPassword"
          type={showPassword ? "text" : "password"}
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          variant="filled"
          InputProps={{
            disableUnderline: true,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={toggleShowPassword}
                  edge="end"
                  sx={{ color: grey[400] }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={inputStyles}
        />
      </Grid>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          mt: 4,
          py: 1.5,
          bgcolor: red[400],
          color: "common.white",
          "&:hover": {
            bgcolor: red[600],
          },
          borderRadius: 1,
          fontSize: "1rem",
          fontWeight: 600,
          letterSpacing: 1,
          boxShadow: `0 4px 12px rgba(0, 180, 170, 0.2)`,
          transition: "all 0.3s ease",
        }}
      >
        Zarejestruj się
      </Button>
    </Box>
  );
};

export default SignUp;
