'use client';
import { useEffect, useState } from 'react';
import { Box, Typography, Button, Grid, CircularProgress } from '@mui/material';
import { auth, db } from '../../auth/firebase';
import { useRouter } from 'next/navigation';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { UserProfile } from '@/types/userProfile';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

const AccountChoose = () => {
  const router = useRouter();
  // const [userProfile, setUserProfile] = useState<any>(null);
  const [accounts, setAccounts] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [isManaging, setIsManaging] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          const accSnap = await getDocs(
            collection(db, 'users', currentUser.uid, 'accounts')
          );
          const accList = accSnap.docs
            .map((doc) => ({
              id: doc.id,
              ...doc.data(),
              nazwaKonta: doc.data().nazwaKonta ?? 'Brak nazwy',
              ograniczenieDorosli: doc.data().ograniczenieDorosli ?? false,
              img_id: doc.data().img_id ?? '0',
            }))
            .reverse();
          setAccounts(accList);
        }
        setLoading(false);
      } else {
        router.push('/auth/authPage');
      }
    };
    fetchData();
  }, [router]);

  if (loading) {
    return (
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'black',
        }}
      >
        <CircularProgress color='inherit' />
      </Box>
    );
  }

  // if (!user || !userProfile) return null;

  const handleAccountClick = (account: UserProfile) => {
    localStorage.setItem('selectedProfile', JSON.stringify(account));
    router.push('/browse');
  };

  const handleManageClick = (accountId: string) => {
    router.push(`/account/accsetingss?id=${accountId}`);
  };

  const handleAddProfileClick = () => {
    router.push('/account/accsetingss');
  };

  return (
    <Box
      sx={{
        height: '100vh',
        background: '#111',
        p: 4,
        textAlign: 'center',
        color: 'white',
        pt: '10vw',
      }}
    >
      <Typography variant='h2' sx={{ mb: 4 }}>
        {isManaging ? 'Zarządzaj profilami:' : 'Kto Ogląda:'}
      </Typography>

      <Grid container spacing={3} justifyContent='center' alignItems='center'>
        {accounts.map((account) => (
          <Grid key={account.id}>
            <Box sx={{ textAlign: 'center', m: 2 }}>
              <Button
                onClick={() =>
                  isManaging
                    ? handleManageClick(account.id)
                    : handleAccountClick(account)
                }
                sx={{
                  backgroundImage: `url('/profiles/${account.img_id}.png')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  width: '120px',
                  height: '120px',
                  borderRadius: '12px',
                  mb: 1,
                  p: 0,
                  position: 'relative',
                  '&:hover': {
                    border: '2px solid white',
                  },
                }}
              >
                {isManaging && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '12px',
                    }}
                  >
                    <EditIcon sx={{ color: 'white', fontSize: 40 }} />
                  </Box>
                )}
              </Button>
              <Typography sx={{ mt: 1 }}>{account.nazwaKonta}</Typography>
            </Box>
          </Grid>
        ))}
        {isManaging && (
          <Grid key='add-profile'>
            <Box sx={{ textAlign: 'center', m: 2 }}>
              <Button
                onClick={handleAddProfileClick}
                sx={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '12px',
                  mb: 1,
                  border: '2px solid grey',
                  color: 'grey',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    border: '2px solid white',
                    color: 'white',
                  },
                }}
              >
                <AddIcon sx={{ fontSize: 50 }} />
              </Button>
              <Typography>Dodaj profil</Typography>
            </Box>
          </Grid>
        )}
      </Grid>
      <Button
        variant='outlined'
        onClick={() => setIsManaging(!isManaging)}
        sx={{
          color: 'grey.500',
          borderColor: 'grey.500',
          mt: 5,
          px: 4,
          py: '6px',
          textTransform: 'none',
          fontSize: '1.1rem',
          letterSpacing: '1px',
          '&:hover': {
            borderColor: 'white',
            color: 'white',
          },
        }}
      >
        {isManaging ? 'Gotowe' : 'Zarządzaj profilami'}
      </Button>
    </Box>
  );
};

export default AccountChoose;
