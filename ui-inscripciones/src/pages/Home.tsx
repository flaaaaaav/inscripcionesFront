import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from '../auth';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    const isLogged = localStorage.getItem('isLogged') === 'true';
    if (isLogged) {
      navigate('/profile');
    } else {
      alert('Debes iniciar sesión para acceder al perfil.');
    }
  };

  return (
    <div>
      <h1>Inscripciones</h1>
      <Auth />
      <button onClick={handleProfileClick}>Perfil de usuario</button>
    </div>
  );
};

export default Home;
