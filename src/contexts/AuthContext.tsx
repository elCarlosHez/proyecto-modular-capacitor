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
import { getAuth, signInAnonymously, linkWithCredential, EmailAuthProvider, User, Auth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import firebaseConfig from './firebase_keys.json';
import { useNavigate } from 'react-router-dom';

interface IAuthContext {
  firebaseAuth: Auth;
  token: string;
  signupUser: (email: string, password: string) => Promise<User | null>;
  signInUSer: (email: string, password: string) => Promise<User | null>;
  logoutUser: () => Promise<void>;
  isTempUser: () => boolean;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

interface IAuthProvider {
  children: JSX.Element | JSX.Element[];
}

const app = initializeApp(firebaseConfig);

export const AuthProvider = (props: IAuthProvider): JSX.Element => {
  const { children } = props;
  const firebaseAuth = useMemo(() => getAuth(app), []);
  const [token, setToken] = useState<string>('');
  //const navigate = useNavigate();

  const checkUser = useCallback(async () => {
    // Check if we have a storage token
    let previousToken = localStorage.getItem('token');

    if (previousToken) {
      setToken(previousToken);
      //navigate('/impuestos');
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

  const signupUser = useCallback(async (email: string, password: string): Promise<User | null> => {
    if (firebaseAuth.currentUser) {
      try {
        const credential = EmailAuthProvider.credential(email, password);
        const newUser = await linkWithCredential(firebaseAuth.currentUser, credential);
        return newUser.user;
      } catch (error) {
        console.log(error);
      }
    }
    return null;
  }, [firebaseAuth]);

  const signInUSer = useCallback(async (email: string, password: string): Promise<User> => {
    const user = await signInWithEmailAndPassword(firebaseAuth, email, password);
    localStorage.removeItem('token');
    await checkUser();
    return user.user;
  }, [firebaseAuth, checkUser]);

  const isTempUser = useCallback((): boolean => {
    return !!firebaseAuth.currentUser?.isAnonymous;
  }, [firebaseAuth]);

  const logoutUser = useCallback(async (): Promise<void> => {
    try {
      await signOut(firebaseAuth);
      localStorage.removeItem('token');
      await checkUser();
    } catch (error) {
      console.log(error);
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
        signupUser,
        signInUSer,
        logoutUser,
        isTempUser,
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
