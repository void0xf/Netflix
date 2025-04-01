"use client";
import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Grid,
  Link,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { grey, blue } from "@mui/material/colors";
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Tutaj możesz dodać logikę do wysłania danych do API
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Grid container spacing={3}>
        <TextField
          fullWidth
          label="Imię"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          variant="filled"
          InputProps={{
            disableUnderline: true,
          }}
          sx={{
            "& .MuiFilledInput-root": {
              backgroundColor: grey[700],
              borderRadius: 1,
              "&:hover": {
                backgroundColor: grey[600],
              },
              "&.Mui-focused": {
                backgroundColor: grey[600],
              },
            },
            "& .MuiInputLabel-root": {
              color: grey[400],
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: grey[300],
            },
          }}
        />
        <TextField
          fullWidth
          label="Nazwisko"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
          variant="filled"
          InputProps={{
            disableUnderline: true,
          }}
          sx={{
            "& .MuiFilledInput-root": {
              backgroundColor: grey[700],
              borderRadius: 1,
              "&:hover": {
                backgroundColor: grey[600],
              },
              "&.Mui-focused": {
                backgroundColor: grey[600],
              },
            },
            "& .MuiInputLabel-root": {
              color: grey[400],
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: grey[300],
            },
          }}
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
          InputProps={{
            disableUnderline: true,
          }}
          sx={{
            "& .MuiFilledInput-root": {
              backgroundColor: grey[700],
              borderRadius: 1,
              "&:hover": {
                backgroundColor: grey[600],
              },
              "&.Mui-focused": {
                backgroundColor: grey[600],
              },
            },
            "& .MuiInputLabel-root": {
              color: grey[400],
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: grey[300],
            },
          }}
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
          sx={{
            "& .MuiFilledInput-root": {
              backgroundColor: grey[700],
              borderRadius: 1,
              "&:hover": {
                backgroundColor: grey[600],
              },
              "&.Mui-focused": {
                backgroundColor: grey[600],
              },
            },
            "& .MuiInputLabel-root": {
              color: grey[400],
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: grey[300],
            },
          }}
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
          sx={{
            "& .MuiFilledInput-root": {
              backgroundColor: grey[700],
              borderRadius: 1,
              "&:hover": {
                backgroundColor: grey[600],
              },
              "&.Mui-focused": {
                backgroundColor: grey[600],
              },
            },
            "& .MuiInputLabel-root": {
              color: grey[400],
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: grey[300],
            },
          }}
        />
      </Grid>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          mt: 4,
          py: 1.5,
          color: "common.white",
          "&:hover": {
            bgcolor: blue[500],
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
