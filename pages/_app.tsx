import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { UserProvider } from '@supabase/auth-helpers-react';
import { supabase } from '../config/supabase';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider supabaseClient={supabase}>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
