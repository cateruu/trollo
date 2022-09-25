export const getAuthErrorMessage = (error: string) => {
  switch (error) {
    case 'auth/wrong-password':
      return 'Wrong password!';
    case 'auth/too-many-requests':
      return 'Too many requests! Try again later.';
    case 'auth/user-not-found':
      return 'User not found!';
    case 'auth/invalid-email':
      return 'Wrong email!';
    case 'auth/internal-error':
      return 'No password provided!';
    default:
      return 'Unknown auth error.';
  }
};
