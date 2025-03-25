// Instagram OAuth implementation
export const instagramAuth = async () => {
  // In production, use your backend for OAuth flow to keep client secret safe
  const clientId = process.env.REACT_APP_INSTAGRAM_CLIENT_ID;
  const redirectUri = encodeURIComponent(process.env.REACT_APP_REDIRECT_URI);
  const scope = encodeURIComponent('user_profile,user_media');
  
  // Redirect to Instagram for authentication
  window.location.href = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`;
  
  // After redirect back to your app, parse the code and exchange for token
  // This part would typically be handled by your backend
};

export const logout = () => {
  localStorage.removeItem('instagram_token');
  // Clear any Instagram cookies
  document.cookie.split(';').forEach(cookie => {
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    if (name.trim().startsWith('ig_')) {
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    }
  });
};
