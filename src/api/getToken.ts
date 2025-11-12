import useUser from '@hooks/useUser.ts';

export function getToken(): string {
  const user = useUser();
  const token: string | undefined = user.getAccessToken();
  if (!token) {
    console.error('No user token found');
    return '';
  } else {
    return token;
  }
}

