"use client";
import { useEffect, useState } from "react";
import { Box, Typography, Button, Grid, TextField, FormControlLabel, Checkbox, CircularProgress } from "@mui/material";
import { auth, db } from "../../auth/firebase";
import { useRouter } from "next/navigation";
import { doc, getDoc, collection, getDocs, updateDoc } from "firebase/firestore";


const AccountSettings = () => {
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
                    const accList = accSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setAccounts(accList);
                }
                setLoading(false);
            } else {
                router.push("/auth/authPage");
            }
        };
        fetchData();
    }, [router]);

    const handleUpdateAccount = async (accountId: string, newAccountName: string, adultContent: boolean) => {
        if (!newAccountName) {
            alert("Podaj nowa nazwe konta");
            return;
        }

        const accountRef = doc(db, "users", user?.uid, "accounts", accountId);
        try {
            await updateDoc(accountRef, {
                nazwaKonta: newAccountName,
                ograniczenieDorosli: adultContent,
            });
            alert("Konto zaktualizowane!");
        } catch (error) {
            console.error("Blad podczas aktualizacji konta: ", error);
            alert("Cos poszlo nie tak!");
        }
    };

    const handleSettingsClick = () => {
        router.push("/account/acchoose");
    };

    const handleAccountNameChange = (e: React.ChangeEvent<HTMLInputElement>, accountId: string) => {
        setAccounts(prevAccounts =>
            prevAccounts.map(account =>
                account.id === accountId ? { ...account, nazwaKonta: e.target.value } : account
            )
        );
    };

    const handleAdultContentChange = (accountId: string) => {
        setAccounts(prevAccounts =>
            prevAccounts.map(account =>
                account.id === accountId ? { ...account, ograniczenieDorosli: !account.ograniczenieDorosli } : account
            )
        );
    };

    if (loading) {
        return (
            <Box sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "black" }}>
                <CircularProgress color="inherit" />
            </Box>
        );
    }

    if (!user || !userProfile) return null;

    return (
        <Box sx={{ minHeight: "100vh",  background: "black", p: 4, pt:10, textAlign: "center", color: "white" }}>
            
            <Typography variant="h6" sx={{ mb: 4 }}>Zarzadzaj swoimi kontami:</Typography>

            <Grid container spacing={3} justifyContent="center">
                {accounts.map(account => (
                    <Grid  key={account.id} sx={{ textAlign: "center" }}>
                        <Box
                            sx={{
                                background: "orange",
                                width: "120px",
                                height: "120px",
                                borderRadius: "12px",
                                marginBottom: 1,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        />
                        <Typography sx={{ mt: 1 }}>{account.nazwaKonta}</Typography>

                        <TextField
                            label="Nowa nazwa konta"
                            value={account.nazwaKonta}
                            onChange={(e) => handleAccountNameChange(e, account.id)}
                            sx={{ mt: 2, mb: 1, width: "20vw", backgroundColor: "white", borderRadius:3  }}
                            variant="filled"
                        />

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={account.odgraniczenieDorosli}
                                    onChange={() => handleAdultContentChange(account.id)}
                                    color="primary"
                                    sx={{ backgroundColor: "white" , margin:3}}
                                    
                                />
                            }
                            label="Konto 18+"
                        />

                        <Button
                            variant="contained"
                            sx={{ mt: 2, backgroundColor: "orange", textTransform: "none" }}
                            onClick={() => handleUpdateAccount(account.id, account.nazwaKonta, account.ograniczenieDorosli)}
                        >
                            Zaktualizuj
                        </Button>
                    </Grid>
                ))}
            </Grid>

            

            <Box sx={{ position: "absolute", bottom: 16, right: 16 }}>
                <Button onClick={handleSettingsClick}>
                    <img src="/settings.png" style={{ height: 30, color: "white" }} />
                </Button>
            </Box>
        </Box>
    );
};

export default AccountSettings;
