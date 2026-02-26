'use client';
import { createContext, useContext, useEffect, useState } from 'react';
// import { auth } from '../firebase';
// import {
//   User,
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   signOut as firebaseSignOut,
//   onAuthStateChanged,
//   GoogleAuthProvider,
//   signInWithPopup
// } from 'firebase/auth';

// Type User vide car Firebase non configuré
interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  metadata?: {
    creationTime?: number;
    [key: string]: any;
  };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Firebase non configuré
    // const unsubscribe = onAuthStateChanged(auth, (user) => {
    //   setUser(user);
    //   setLoading(false);
    // });
    // return unsubscribe;

    // Mock user pour le développement
    setLoading(false);
    setUser(null);
  }, []);

  const signIn = async (email: string, password: string) => {
    // TODO: Firebase non configuré
    // await signInWithEmailAndPassword(auth, email, password);
    console.log('signIn non disponible - Firebase non configuré');
  };

  const signUp = async (email: string, password: string) => {
    // TODO: Firebase non configuré
    // await createUserWithEmailAndPassword(auth, email, password);
    console.log('signUp non disponible - Firebase non configuré');
  };

  const signInWithGoogle = async () => {
    // TODO: Firebase non configuré
    // const provider = new GoogleAuthProvider();
    // await signInWithPopup(auth, provider);
    console.log('signInWithGoogle non disponible - Firebase non configuré');
  };

  const signOut = async () => {
    // TODO: Firebase non configuré
    // await firebaseSignOut(auth);
    console.log('signOut non disponible - Firebase non configuré');
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signInWithGoogle, signOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
