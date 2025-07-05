'use client';
import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Grid,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { grey, red, orange } from '@mui/material/colors';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) {
      setErrorMessage(null);
    }
  };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      console.log('Zalogowano użytkownika: ', user.email);
      router.push('/account/acchoose');
    } catch (error: any) {
      setErrorMessage('Błąd logowania: Sprawdź dane logowania.');
      console.error(error.message);
    }
  };

  const inputStyles = {
    '& .MuiFilledInput-root': {
      backgroundColor: '#242424',
      borderRadius: 1,
      border: '2px solid transparent',
      color: 'white',
      transition: 'border 0.2s ease-in-out',

      '&.Mui-focused': {
        backgroundColor: 'black',
        border: '2px solid red',
      },
    },
    '& .MuiInputLabel-root': {
      color: grey[400],
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: 'red',
    },
  };

  return (
    <Box component='form' onSubmit={handleSubmit}>
      {errorMessage && (
        <Box sx={{ color: red[600], mb: 2, textAlign: 'center' }}>
          {errorMessage}
        </Box>
      )}
      <Grid container spacing={3}>
        <TextField
          fullWidth
          label='Email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          required
          variant='filled'
          InputProps={{ disableUnderline: true }}
          sx={inputStyles}
        />
        <TextField
          fullWidth
          label='Hasło'
          name='password'
          type={showPassword ? 'text' : 'password'}
          value={formData.password}
          onChange={handleChange}
          required
          variant='filled'
          InputProps={{
            disableUnderline: true,
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={toggleShowPassword}
                  edge='end'
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
        type='submit'
        fullWidth
        variant='contained'
        sx={{
          mt: 4,
          py: 1.5,
          bgcolor: orange[900],
          color: 'common.white',
          '&:hover': {
            bgcolor: red[600],
          },
          borderRadius: 6,
          fontSize: '1rem',
          fontWeight: 600,
        }}
      >
        Zaloguj się
      </Button>
    </Box>
  );
};

export default Login;
