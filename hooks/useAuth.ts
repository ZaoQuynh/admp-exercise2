import { useState } from 'react';
import { login } from '../scripts/authApi';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    try {
      const data = await login(email, password);
      setLoading(false);
      return data;
    } catch (err) {
      setLoading(false);
      setError('Failed to login');
      throw err;
    }
  };

  return { handleLogin, loading, error };
};
