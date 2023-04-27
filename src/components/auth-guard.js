import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useAuthContext } from '../contexts/auth-context';
import { useUser } from '@auth0/nextjs-auth0/client';

export const AuthGuard = (props) => {
  const { children } = props;
  const router = useRouter();
  const { isAuthenticated } = useAuthContext();
  const ignore = useRef(false);
  const [checked, setChecked] = useState(false);

  const {user, isLoading} = useUser();
  // Only do authentication check on component mount.
  // This flow allows you to manually redirect the user after sign-out, otherwise this will be
  // triggered and will automatically redirect to sign-in page.

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      // Prevent from calling twice in development mode with React.StrictMode enabled
      if (ignore.current) {
        return;
      }

      ignore.current = !isLoading;

      if (isLoading) return;

      if (!user) {
        console.log('Not authenticated, redirecting');
        router
          .replace({
            pathname: '/api/auth/login',
            query: router.asPath !== '/' ? { continueUrl: router.asPath } : undefined
          })
          .catch(console.error);
      } else {
        setChecked(true);
      }
    },
    [router.isReady, isLoading]
  );

  if (!checked) {
    return null;
  }

  // If got here, it means that the redirect did not occur, and that tells us that the user is
  // authenticated / authorized.

  return children;
};

AuthGuard.propTypes = {
  children: PropTypes.node
};
