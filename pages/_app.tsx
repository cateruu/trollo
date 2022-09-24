import '../styles/globals.scss';
import type { AppProps } from 'next/app';

import { UserProvider } from '@supabase/auth-helpers-react';
import { supabase } from '../config/supabase';

import { store } from '../redux/store';
import { Provider } from 'react-redux';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider supabaseClient={supabase}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </UserProvider>
  );
}

export default MyApp;
