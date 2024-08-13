import React, { useState, useEffect } from 'react';
import { UserDataType } from './types';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const clientId = '27875311198-j2cbmbhmid8llm2bu30be5s8dljret50.apps.googleusercontent.com';

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const Auth: React.FC = () => {
  const initialUser: UserDataType = {
    email: "",
    email_verified: false,
    family_name: "",
    given_name: "",
    name: "",
    picture: "",
    sub: "",
    birthday: ""
  };

  const [isLogged, setIsLogged] = useState(false);
  const [userData, setUserData] = useState<UserDataType>(initialUser);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    const storedIsLogged = localStorage.getItem('isLogged') === 'true';
    if (storedUserData && storedIsLogged) {
      setUserData(JSON.parse(storedUserData));
      setIsLogged(true);
    }
  }, []);

  const login = useGoogleLogin({
    scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/user.birthday.read',
    onSuccess: async (tokenResponse) => {
      try {
        const { access_token } = tokenResponse;

        const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        const peopleApiResponse = await axios.get('https://people.googleapis.com/v1/people/me?personFields=birthdays', {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        const birthdayData = peopleApiResponse.data.birthdays?.[1] || peopleApiResponse.data.birthdays?.[0];
        const birthday = birthdayData?.date || {};

        const userDataWithBirthday: UserDataType = {
          ...userInfoResponse.data,
          birthday: formatDate(new Date(birthday.year, birthday.month - 1, birthday.day)),
        };

        localStorage.setItem('userData', JSON.stringify(userDataWithBirthday));
        localStorage.setItem('isLogged', 'true');
        setUserData(userDataWithBirthday);
        setIsLogged(true);

        await axios.post('http://localhost:8080/api/auth/login', {
          nombre: userDataWithBirthday.given_name,
          apellido: userDataWithBirthday.family_name,
          email: userDataWithBirthday.email,
          fechaNacimiento: userDataWithBirthday.birthday,
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
    setUserData(initialUser);
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
          <p>Fecha de Nacimiento: {userData.birthday}</p>
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
