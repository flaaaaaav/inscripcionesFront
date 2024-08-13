import React, { useState, useEffect } from 'react';
import { UserDataType } from '../types';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
    const [userData, setUserData] = useState<UserDataType>({
      email: "",
      email_verified: false,
      family_name: "",
      given_name: "",
      name: "",
      picture: "",
      sub: "",
      birthday: ""
    });
  
    const navigate = useNavigate(); 
  
    useEffect(() => {
      const storedUserData = localStorage.getItem('userData');
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
      }
    }, []);
  
    const handleHomeClick = () => {
      navigate('/'); 
    };
  
    return (
      <div>
        <h1>Perfil del Usuario</h1>
        <div>
          <h2>Hola, {userData.name}</h2>
          <img
            src={userData.picture}
            alt="Profile"
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
          <p>Email: {userData.email}</p>
          <p>Nombre: {userData.given_name}</p>
          <p>Apellido: {userData.family_name}</p>
          <p>Fecha de Nacimiento: {userData.birthday}</p>
          <p>Verificado: {userData.email_verified ? 'Sí' : 'No'}</p>
          <p>ID: {userData.sub}</p>
          <button onClick={handleHomeClick}>Inicio</button>
        </div>
      </div>
    );
  };
  
  export default Profile;
