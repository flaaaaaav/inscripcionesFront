import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const clientId = '27875311198-j2cbmbhmid8llm2bu30be5s8dljret50.apps.googleusercontent.com';

const Auth: React.FC = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    const storedIsLogged = localStorage.getItem('isLogged') === 'true';
    if (storedUserData && storedIsLogged) {
      setUserData(JSON.parse(storedUserData));
      setIsLogged(true);
    }
  }, []);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      try {
        const { access_token } = tokenResponse;
        const response = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        console.log(response.data);
        localStorage.setItem('userData', JSON.stringify(response.data));
        localStorage.setItem('isLogged', 'true');
        setUserData(response.data);
        setIsLogged(true);

        await axios.post('http://localhost:8080/api/auth/login', {
          nombre: response.data.given_name,
          apellido: response.data.family_name,
          email: response.data.email,
          fechaNacimiento: new Date(),
          rolId: 2
        });

      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    },
    onError: (error) => console.log('Login failed:', error),
  });

  const handleLogout = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('isLogged');
    setIsLogged(false);
    setUserData(null);
  };

  return (
    <div>
      {!isLogged ? (
        <button onClick={() => login()}>Inicia sesión con Google</button>
      ) : (
        <div>
          <h2>Hola, {userData.name}</h2>
          <img
            src={userData.picture}
            alt="Profile"
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
          <br />
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <GoogleOAuthProvider clientId={clientId}>
    {children}
  </GoogleOAuthProvider>
);

export { Auth, AuthProvider };
