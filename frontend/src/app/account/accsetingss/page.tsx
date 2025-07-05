"use client";
import { useEffect, useState } from "react";
import { Box, Typography, Button, Grid, TextField, FormControlLabel, Checkbox, CircularProgress, Divider } from "@mui/material";
import { auth, db } from "../../auth/firebase";
import { useRouter, useSearchParams } from "next/navigation";
import { doc, getDoc, collection, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { UserProfile } from "@/types/userProfile";
import EditIcon from '@mui/icons-material/Edit';

const availableAvatars = Array.from({ length: 16 }, (_, i) => i.toString());

const AccountSettings = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const accountId = searchParams.get('id');

    const [profileData, setProfileData] = useState<{
        id?: string;
        nazwaKonta: string;
        ograniczenieDorosli: boolean;
        img_id: string;
    } | null>(null);

    const [loading, setLoading] = useState(true);
    const [isNewProfile, setIsNewProfile] = useState(!accountId);
    const [showAvatarSelection, setShowAvatarSelection] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const currentUser = auth.currentUser;
            if (currentUser) {
                if (accountId) {
                    setIsNewProfile(false);
                    const accountDocRef = doc(db, "users", currentUser.uid, "accounts", accountId);
                    const accountDoc = await getDoc(accountDocRef);
                    if (accountDoc.exists()) {
                        setProfileData({ id: accountDoc.id, ...accountDoc.data() } as UserProfile);
                    } else {
                        alert("Profil nie znaleziony.");
                        router.push('/account/acchoose');
                    }
                } else {
                    setIsNewProfile(true);
                    setProfileData({
                        nazwaKonta: '',
                        ograniczenieDorosli: false,
                        img_id: '0',
                    });
                }
                setLoading(false);
            } else {
                router.push("/auth/authPage");
            }
        };
        fetchData();
    }, [accountId, router]);

    const handleSave = async () => {
        if (!profileData || !profileData.nazwaKonta) {
            alert("Nazwa profilu nie może być pusta.");
            return;
        }
        const currentUser = auth.currentUser;
        if (!currentUser) return;

        const dataToSave = {
            nazwaKonta: profileData.nazwaKonta,
            ograniczenieDorosli: profileData.ograniczenieDorosli,
            img_id: profileData.img_id,
        };

        try {
            if (isNewProfile) {
                await addDoc(collection(db, "users", currentUser.uid, "accounts"), dataToSave);
                alert("Profil utworzony!");
            } else {
                const accountRef = doc(db, "users", currentUser.uid, "accounts", accountId!);
                await updateDoc(accountRef, dataToSave);
                alert("Profil zaktualizowany!");
            }
            router.push("/account/acchoose");
        } catch (error) {
            console.error("Błąd zapisu profilu: ", error);
            alert("Wystąpił błąd podczas zapisywania profilu.");
        }
    };

    const handleDelete = async () => {
        if (isNewProfile || !accountId) return;
        const currentUser = auth.currentUser;
        if (!currentUser) return;

        if (window.confirm("Czy na pewno chcesz usunąć ten profil?")) {
            try {
                const accountRef = doc(db, "users", currentUser.uid, "accounts", accountId);
                await deleteDoc(accountRef);
                alert("Profil usunięty.");
                router.push("/account/acchoose");
            } catch (error) {
                console.error("Błąd podczas usuwania profilu: ", error);
                alert("Wystąpił błąd podczas usuwania profilu.");
            }
        }
    };

    const handleCancel = () => {
        router.push("/account/acchoose");
    };

    const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!profileData) return;
        const { name, value, checked, type } = e.target;
        setProfileData({
            ...profileData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };
    
    const handleAvatarSelect = (img_id: string) => {
        if (!profileData) return;
        setProfileData({ ...profileData, img_id });
        setShowAvatarSelection(false);
    }

    if (loading || !profileData) {
        return (
            <Box sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "black" }}>
                <CircularProgress color="inherit" />
            </Box>
        );
    }

    return (
        <Box sx={{ minHeight: "100vh", background: "#111", color: "white", p: 4 }}>
            <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
                <Typography variant="h3" component="h1" sx={{ mb: 2 }}>
                    {isNewProfile ? 'Dodaj profil' : 'Edytuj profil'}
                </Typography>
                <Divider sx={{ backgroundColor: 'grey.700', mb: 4 }} />

                {showAvatarSelection ? (
                    <Box>
                        <Typography variant="h5" sx={{mb: 2}}>Wybierz ikonę</Typography>
                        <Grid container spacing={2}>
                            {availableAvatars.map(avatarId => (
                                <Grid item key={avatarId} xs={4} sm={3} md={2}>
                                    <Button onClick={() => handleAvatarSelect(avatarId)} sx={{p: 0, borderRadius: 1}}>
                                        <img src={`/profiles/${avatarId}.png`} alt={`Avatar ${parseInt(avatarId) + 1}`} style={{ width: '100%', borderRadius: '4px' }}/>
                                    </Button>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                ) : (
                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs={12} sm={4}>
                            <Box
                                onClick={() => setShowAvatarSelection(true)}
                                sx={{
                                    position: 'relative',
                                    width: '150px',
                                    height: '150px',
                                    cursor: 'pointer',
                                    '&:hover .edit-overlay': {
                                        opacity: 1,
                                    },
                                }}
                            >
                                <img src={`/profiles/${profileData.img_id}.png`} alt={profileData.nazwaKonta} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} />
                                <Box
                                    className="edit-overlay"
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
                                        opacity: 0,
                                        transition: 'opacity 0.3s ease',
                                        borderRadius: '4px',
                                    }}
                                >
                                    <EditIcon sx={{ color: 'white', fontSize: 60 }} />
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={8}>
                            <TextField
                                name="nazwaKonta"
                                label="Nazwa"
                                value={profileData.nazwaKonta}
                                onChange={handleFieldChange}
                                variant="filled"
                                fullWidth
                                sx={{ backgroundColor: 'grey.800', borderRadius: 1, mb: 2, '& .MuiInputBase-input': { color: 'white' } }}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="ograniczenieDorosli"
                                        checked={profileData.ograniczenieDorosli}
                                        onChange={handleFieldChange}
                                        sx={{ color: 'grey.500', '&.Mui-checked': { color: 'white' } }}
                                    />
                                }
                                label="Profil dla dorosłych"
                            />
                        </Grid>
                    </Grid>
                )}

                <Divider sx={{ backgroundColor: 'grey.700', my: 4 }} />

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button onClick={handleSave} variant="contained" sx={{ backgroundColor: 'white', color: 'black', '&:hover': { backgroundColor: 'lightgrey'} }}>Zapisz</Button>
                    <Button onClick={handleCancel} variant="outlined" sx={{ color: 'grey.500', borderColor: 'grey.500', '&:hover': { color: 'white', borderColor: 'white' } }}>Anuluj</Button>
                    {!isNewProfile && (
                        <Button onClick={handleDelete} variant="outlined" sx={{ color: 'grey.500', borderColor: 'grey.500', '&:hover': { color: 'white', borderColor: 'white' } }}>Usuń Profil</Button>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default AccountSettings;
