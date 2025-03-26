import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const useInstagramAPI = (endpoint, params = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('instagram_token');
        if (!token) throw new Error('No authentication token found');
        
        // Construct query string from params
        const queryString = Object.keys(params)
          .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
          .join('&');
        
        const url = `https://graph.instagram.com/${endpoint}?${queryString}&access_token=${token}`;
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, user, JSON.stringify(params)]); // React to changes in params

  return { data, loading, error };
};
