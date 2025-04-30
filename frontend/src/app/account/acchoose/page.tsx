"use client";
import { useEffect, useState } from "react";
import { Box, Typography, Button, Grid, CircularProgress } from "@mui/material";
import { auth, db } from "../../auth/firebase";
import { useRouter } from "next/navigation";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";

const AccountChoose = () => {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [userProfile, setUserProfile] = useState<any>(null);
    const [accounts, setAccounts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const currentUser = auth.currentUser;
            if (currentUser) {
                setUser(currentUser);
                const userDoc = await getDoc(doc(db, "users", currentUser.uid));
                if (userDoc.exists()) {
                    setUserProfile(userDoc.data());
                    const accSnap = await getDocs(collection(db, "users", currentUser.uid, "accounts"));
                    const accList = accSnap.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                        nazwaKonta: doc.data().nazwaKonta ?? "Brak nazwy",
                        ograniczenieDorosli: doc.data().ograniczenieDorosli ?? false
                    })).reverse();

                    setAccounts(accList);
                }
                setLoading(false);
            } else {
                router.push("/auth/authPage");
            }
        };
        fetchData();
    }, [router]);

    if (loading) {
        return (
            <Box sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "black" }}>
                <CircularProgress color="inherit" />
            </Box>
        );
    }

    if (!user || !userProfile) return null;

    const handleAccountClick = (accountName: string) => {
        router.push('/browse')
    };

    const handleSettingsClick = () => {
        router.push("/account/accsetingss");
    };

    return (
        <Box sx={{ height: "100vh", background: "black", p: 4, textAlign: "center", color: "white", pt: "18vw" }}>
            <Typography variant="h4">Witaj!</Typography>
            <Typography variant="h6" sx={{ mb: 4 }}>Wybierz konto:</Typography>

            <Grid container spacing={3} justifyContent="center">
                {accounts.map(account => (
                    <Grid  key={account.id} sx={{ textAlign: "center" }}>
                        <Button
                            onClick={() => handleAccountClick(account.nazwaKonta)}
                            sx={{
                                background: "orange",
                                width: "120px",
                                height: "120px",
                                borderRadius: "12px",
                                mb: 1
                            }}
                        />
                        <Typography sx={{ mt: 1 }}>{account.nazwaKonta}</Typography>
                    </Grid>
                ))}
            </Grid>

            <Box sx={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)" }}>
                <img src="/logo-no-background.png" alt="Logo" style={{ height: 60 }} />
            </Box>

            <Box sx={{ position: "absolute", bottom: 26, left: "96%", display: "flex" }}>
                <Button onClick={handleSettingsClick}>
                    <img src="/settings.png" style={{ height: 30 }} />
                </Button>
            </Box>
        </Box>
    );
};

export default AccountChoose;
