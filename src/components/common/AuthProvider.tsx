import { GoogleOAuthProvider } from '@react-oauth/google';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const GOOGLE_DRIVE_CLIENT_ID = import.meta.env
    .VITE_GOOGLE_DRIVE_CLIENT_ID as string;

  return (
    <GoogleOAuthProvider clientId={GOOGLE_DRIVE_CLIENT_ID}>
      {children}
    </GoogleOAuthProvider>
  );
};
