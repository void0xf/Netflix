'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Checkbox,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from '@/app/auth/firebase';
import { useAuth } from '@/hooks/useAuth';
import { Movie } from '@/types/movie';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
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

const AdminPage = () => {
  const { userData, loading } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    thumbnail: '',
    id: '',
    isNew: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [moviesLoading, setMoviesLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'movies'), (snapshot) => {
      const moviesData = snapshot.docs.map(
        (doc) => ({ ...doc.data(), docId: doc.id }) as Movie
      );
      setMovies(moviesData);
      setMoviesLoading(false);
      console.log(moviesData.length);
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'movies'), {
        ...formData,
        provider: 'netflix',
        type: 'movie',
        videoUrl: formData.id,
      });
      alert('Film dodany pomyślnie!');
      setFormData({
        title: '',
        category: '',
        thumbnail: '',
        id: '',
        isNew: true,
      });
    } catch (error) {
      console.error('Błąd podczas dodawania filmu: ', error);
      alert('Wystąpił błąd podczas dodawania filmu.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (docId: string) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      try {
        await deleteDoc(doc(db, 'movies', docId));
        alert('Movie deleted successfully!');
      } catch (error) {
        console.error('Error deleting movie: ', error);
        alert('Failed to delete movie.');
      }
    }
  };

  if (loading) {
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
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          textAlign: 'center',
          backgroundColor: '#141414',
          color: 'white',
        }}
      >
        <Typography variant='h4' gutterBottom>
          Access Denied
        </Typography>
        <Typography variant='body1' sx={{ mb: 2 }}>
          You do not have permission to view this page.
        </Typography>
        <Button
          variant='contained'
          sx={{ bgcolor: '#E50914', '&:hover': { bgcolor: '#f6121d' } }}
          onClick={() => router.push('/')}
        >
          Go to Homepage
        </Button>
      </Box>
    );
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
      <Typography
        variant='h4'
        component='h1'
        sx={{ mb: 4, fontWeight: 'bold' }}
      >
        Admin Panel
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
        <Typography variant='h5' sx={{ mb: 3 }}>
          Add New Movie
        </Typography>
        <TextField
          fullWidth
          label='Title'
          name='title'
          value={formData.title}
          onChange={handleChange}
          required
          variant='filled'
          sx={inputStyles}
        />
        <TextField
          fullWidth
          label='Category'
          name='category'
          value={formData.category}
          onChange={handleChange}
          required
          variant='filled'
          sx={inputStyles}
        />
        <TextField
          fullWidth
          label='Thumbnail URL'
          name='thumbnail'
          value={formData.thumbnail}
          onChange={handleChange}
          required
          variant='filled'
          sx={inputStyles}
        />
        <TextField
          fullWidth
          label='ID (e.g. from TMDB)'
          name='id'
          value={formData.id}
          onChange={handleChange}
          required
          variant='filled'
          sx={inputStyles}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.isNew}
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
            'Add Movie'
          )}
        </Button>
      </Box>

      <Typography
        variant='h4'
        component='h2'
        sx={{ mt: 6, mb: 4, fontWeight: 'bold' }}
      >
        Existing Movies
      </Typography>
      {moviesLoading ? (
        <CircularProgress color='error' />
      ) : (
        <TableContainer
          component={Paper}
          sx={{
            maxWidth: '1200px',
            width: '100%',
            backgroundColor: '#1c1c1c',
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  Title
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  Category
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  ID
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {movies.map((movie) => (
                <TableRow
                  key={movie.docId}
                  sx={{
                    '&:nth-of-type(odd)': { backgroundColor: '#2c2c2c' },
                    '&:hover': { backgroundColor: '#3c3c3c' },
                  }}
                >
                  <TableCell sx={{ color: 'white' }}>{movie.title}</TableCell>
                  <TableCell sx={{ color: 'white' }}>
                    {movie.category}
                  </TableCell>
                  <TableCell sx={{ color: 'white' }}>{movie.id}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => router.push(`/admin/edit/${movie.docId}`)}
                      sx={{ color: '#E50914' }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(movie.docId)}
                      sx={{ color: '#E50914' }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default AdminPage;
