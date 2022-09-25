import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAuth } from '../../store/AuthContext';

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth?.user) {
      router.push('/login');
    }
  });

  return <>{auth?.user ? children : null}</>;
};

export default ProtectedRoute;
