import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from '../auth';
import Button from '@mui/material/Button'
import CardCursos from '../components/cardCursos';
import CustomButton from '../components/customButton';
import NavBar from '../components/NavBar';


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
    <div style={{width: '100vw'}}>
      <NavBar />
      <section className='bg-dark'>
        <div>
          <span>Nunca pares de aprender</span>
          <h2>Desarrolla tus habilidades con cursos en línea</h2>
          <Button variant='contained' color='secondary' sx={{color: '#fff'}}>VER CURSOS</Button>
        </div>
        {/* Imagen */}
      </section>

      <CardCursos
        amount='1 Clase Semanal'
        duration='Duración: 4 Meses'
        title="Programación Inicial"
        subtitle="con Python"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        imageUrl="../src/media/curso.png"
        onButtonClick={() => alert("Curso de Python")}
        buttonText="Inscribite"
      />

      <CustomButton colorVariant="green" >
        Boton Verde
      </CustomButton>
      <CustomButton colorVariant="orange" >
        Boton Naranja
      </CustomButton>
      <CustomButton colorVariant="white" >
        Boton Blanco
      </CustomButton>

      <Auth />
      <button onClick={handleProfileClick}>Perfil de usuario</button>
    </div>
  );
};

export default Home;
