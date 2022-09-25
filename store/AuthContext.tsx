import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../config/firebase';

type Props = {
  children: React.ReactNode;
};

type User = {
  uid: string;
  email: string;
  username: string;
};

const AuthContext = createContext<User | null>(null);

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email as string,
          username: user.displayName as string,
        });
      } else {
        setUser(null);
      }

      return () => unsubscribe();
    });
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export default AuthContext;
