import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { fetchBackend } from '../hooks/fetchBackend';
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import firebaseConfig from './firebase_keys.json';

interface IAuthContext {
  firebaseAuth: any;
  token: string;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

interface IAuthProvider {
  children: JSX.Element | JSX.Element[];
}

const app = initializeApp(firebaseConfig);

export const AuthProvider = (props: IAuthProvider): JSX.Element => {
  const {children} = props;
  const firebaseAuth = useMemo(() => getAuth(app), []);
  const [token, setToken] = useState<string>('');

  const checkUser = useCallback(async () => {
    // Check if we have a storage token
    let previousToken = localStorage.getItem('token');
    
    if(previousToken){
      setToken(previousToken);
      return;
    }

    // Check if the user has logged
    if (!firebaseAuth.currentUser) {
      await signInAnonymously(firebaseAuth);
    }
    const firebaseToken = await firebaseAuth.currentUser?.getIdToken();
    try {
      const json = await fetchBackend(`/api/get-token`, {
        firebase_token: firebaseToken,
      });
      localStorage.setItem('token', json.token)
      setToken(json.token);
    } catch (error) {
      console.log('Hubo un error al conseguir el servert token', error);
    }
  }, [firebaseAuth]);

  useEffect(() => {
    checkUser();
  }, [firebaseAuth, checkUser]);

  return (
    <AuthContext.Provider
      value={{
        firebaseAuth,
        token,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within a AuthProvider');
  }

  return context;
};
