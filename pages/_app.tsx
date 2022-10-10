import '../styles/global.scss';
import type { AppProps } from 'next/app';
import { AuthContextProvider } from '../store/AuthContext';
import { useRouter } from 'next/router';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import { EditProjectProvider } from '../store/EditProjectContext';
import { Provider } from 'react-redux';
import { store } from '../store/store';

const authNotRequired = ['/login', '/signup'];

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <AuthContextProvider>
      {authNotRequired.includes(router.pathname) ? (
        <Component {...pageProps} />
      ) : (
        <ProtectedRoute>
          <Provider store={store}>
            <EditProjectProvider>
              <Component {...pageProps} />
            </EditProjectProvider>
          </Provider>
        </ProtectedRoute>
      )}
    </AuthContextProvider>
  );
}

export default MyApp;
