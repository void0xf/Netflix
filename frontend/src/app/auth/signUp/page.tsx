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
import { grey, orange, red } from "@mui/material/colors";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, collection, addDoc, writeBatch } from "firebase/firestore";

const SignUp = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setErrorMessage("Błąd rejestracji: hasła nie są takie same");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );

            const user = userCredential.user;

            const defaultAccounts = [
                { nazwaKonta: "Profil 1", ograniczenieDorosli: false },
                { nazwaKonta: "Profil 2", ograniczenieDorosli: false },
                { nazwaKonta: "Profil 3", ograniczenieDorosli: false },
                { nazwaKonta: "Profil dziecięcy", ograniczenieDorosli: true },
            ];

            const userRef = doc(db, "users", user.uid);
            const batch = writeBatch(db);


            batch.set(userRef, {
                uid: user.uid,
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                createdAt: new Date(),
            });

            defaultAccounts.forEach((account) => {
                const accountRef = doc(collection(db, "users", user.uid, "accounts"));
                batch.set(accountRef, {
                    nazwaKonta: account.nazwaKonta,
                    ograniczenieDorosli: account.ograniczenieDorosli,
                });
            });

            await batch.commit();

            alert("Rejestracja zakończona sukcesem!");

        } catch (error: any) {
            
            
            setErrorMessage("Błąd rejestracji: "+ error);
               

            if (auth.currentUser) {
                await auth.currentUser.delete();
            }

            
        }
    };




  const inputStyles = {
        "& .MuiFilledInput-root": {
            backgroundColor: "#242424",
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
        <Box component="form" onSubmit={handleSubmit} method="POST">
            {errorMessage && (
                <Box sx={{ color: red[600], mb: 2, textAlign: "center" }}>
                    {errorMessage}
                </Box>
            )}
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
                    bgcolor: orange[900],
                    color: "common.white",
                    "&:hover": {
                        bgcolor: red[600],
                    },
                    borderRadius: 6,
                    fontSize: "1rem",
                    fontWeight: 600,
                }}
            >
                Zarejestruj się
            </Button>
        </Box>
    );
};

export default SignUp;