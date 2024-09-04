import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from '../auth';
import Button from '@mui/material/Button'
import CardCursos from '../components/cardCursos';
import CustomButton from '../components/customButton';
import NavBar from '../components/NavBar';
import Requeriments from '../components/requeriments';
import Training from '../components/training';
import Banner from '../components/Banner';
import Courses from '../components/courses';
import Projects from '../components/projects';


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
    <div style={{}}>
      {/* <button onClick={handleProfileClick}>Perfil de usuario</button> */}
      <Banner />
      <Courses />
      <Projects />
      <Requeriments />
      <Training/>
     
    </div>
    

  );
};

export default Home;
