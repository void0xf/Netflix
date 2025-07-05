'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/app/auth/firebase';
import { User as UserDocument } from '@/types/user';

interface AuthState {
  authUser: FirebaseUser | null;
  userData: UserDocument | null;
  loading: boolean;
}

export const useAuth = (): AuthState => {
  const [authState, setAuthState] = useState<AuthState>({
    authUser: null,
    userData: null,
    loading: true,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          setAuthState({
            authUser: user,
            userData: userDocSnap.data() as UserDocument,
            loading: false,
          });
        } else {
          setAuthState({
            authUser: user,
            userData: null,
            loading: false,
          });
        }
      } else {
        setAuthState({
          authUser: null,
          userData: null,
          loading: false,
        });
      }
    });

    return () => unsubscribe();
  }, []);

  return authState;
};
