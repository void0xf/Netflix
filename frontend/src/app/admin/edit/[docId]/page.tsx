'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/app/auth/firebase';
import { useAuth } from '@/hooks/useAuth';
import { Movie } from '@/types/movie';
import { grey } from '@mui/material/colors';

const inputStyles = {
  '& .MuiFilledInput-root': {
    backgroundColor: '#333',
    borderRadius: 1,
    color: 'white',
    '&:hover': {
      backgroundColor: '#444',
    },
    '&.Mui-focused': {
      backgroundColor: '#444',
    },
  },
  '& .MuiInputLabel-root': {
    color: grey[400],
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: 'white',
  },
  '& .MuiFilledInput-underline:before': {
    borderBottom: '2px solid #555',
  },
  '& .MuiFilledInput-underline:after': {
    borderBottom: '2px solid #E50914',
  },
};

const EditMoviePage = () => {
  const { userData, loading: authLoading } = useAuth();
  const router = useRouter();
  const { docId } = useParams();
  const [formData, setFormData] = useState<Partial<Movie> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (docId) {
      const fetchMovie = async () => {
        const movieDocRef = doc(db, 'movies', docId as string);
        const movieDocSnap = await getDoc(movieDocRef);
        if (movieDocSnap.exists()) {
          setFormData(movieDocSnap.data() as Movie);
        } else {
          alert('Movie not found!');
          router.push('/admin');
        }
        setIsLoading(false);
      };
      fetchMovie();
    }
  }, [docId, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) =>
      prev ? { ...prev, [name]: type === 'checkbox' ? checked : value } : null
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData) return;
    setIsSubmitting(true);
    try {
      const movieDocRef = doc(db, 'movies', docId as string);
      await updateDoc(movieDocRef, formData);
      alert('Movie updated successfully!');
      router.push('/admin');
    } catch (error) {
      console.error('Error updating movie: ', error);
      alert('Failed to update movie.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading || isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: '#141414',
        }}
      >
        <CircularProgress color='error' />
      </Box>
    );
  }

  if (!userData?.admin) {
    // This is a basic check. You might want a more robust solution.
    router.push('/');
    return null;
  }

  if (!formData) {
    // This will be shown briefly before redirecting if the movie is not found.
    return <Typography>Loading form...</Typography>;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#141414',
        py: 4,
        px: 2,
        color: 'white',
      }}
    >
      <Box sx={{ width: '100%', maxWidth: '600px', mb: 2 }}>
        <Button
          variant='outlined'
          onClick={() => router.push('/admin')}
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': {
              borderColor: '#E50914',
              color: '#E50914',
            },
          }}
        >
          Back to Admin Panel
        </Button>
      </Box>
      <Typography
        variant='h4'
        component='h1'
        sx={{ mb: 4, fontWeight: 'bold' }}
      >
        Edit Movie
      </Typography>
      <Box
        component='form'
        onSubmit={handleSubmit}
        sx={{
          p: 4,
          borderRadius: 2,
          backgroundColor: 'rgba(0,0,0,0.7)',
          width: '100%',
          maxWidth: '600px',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <TextField
          fullWidth
          label='Title'
          name='title'
          value={formData.title || ''}
          onChange={handleChange}
          required
          variant='filled'
          sx={inputStyles}
        />
        <TextField
          fullWidth
          label='Category'
          name='category'
          value={formData.category || ''}
          onChange={handleChange}
          required
          variant='filled'
          sx={inputStyles}
        />
        <TextField
          fullWidth
          label='Thumbnail URL'
          name='thumbnail'
          value={formData.thumbnail || ''}
          onChange={handleChange}
          required
          variant='filled'
          sx={inputStyles}
        />
        <TextField
          fullWidth
          label='ID'
          name='id'
          value={formData.id || ''}
          onChange={handleChange}
          required
          variant='filled'
          sx={inputStyles}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.isNew || false}
              onChange={handleChange}
              name='isNew'
              sx={{ color: grey[500], '&.Mui-checked': { color: '#E50914' } }}
            />
          }
          label='Is New?'
        />
        <Button
          type='submit'
          fullWidth
          variant='contained'
          disabled={isSubmitting}
          sx={{
            mt: 3,
            py: 1.5,
            bgcolor: '#E50914',
            '&:hover': { bgcolor: '#f6121d' },
            fontSize: '1.1rem',
            fontWeight: 'bold',
          }}
        >
          {isSubmitting ? (
            <CircularProgress size={24} color='inherit' />
          ) : (
            'Update Movie'
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default EditMoviePage;
