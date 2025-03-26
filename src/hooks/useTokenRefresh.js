import { useEffect } from 'react';
import { secureStorage } from '../utils/encryption';
import axios from 'axios';

const useTokenRefresh = () => {
  useEffect(() => {
    const refreshToken = async () => {
      const tokenData = secureStorage.getItem('instagram_token');
      if (!tokenData) return;

      try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/refresh`, {
          refreshToken: tokenData.refresh_token
        });

        secureStorage.setItem('instagram_token', {
          ...tokenData,
          access_token: response.data.access_token,
          expires_at: Date.now() + (response.data.expires_in * 1000)
        });
      } catch (error) {
        console.error('Token refresh failed:', error);
      }
    };

    // Check token expiration every 5 minutes
    const interval = setInterval(() => {
      const tokenData = secureStorage.getItem('instagram_token');
      if (tokenData && Date.now() > tokenData.expires_at - 300000) {
        refreshToken();
      }
    }, 300000);

    return () => clearInterval(interval);
  }, []);
};

export default useTokenRefresh;
