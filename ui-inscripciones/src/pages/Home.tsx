import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from '../auth';
import Button from '@mui/material/Button'
import { Container } from '@mui/material';

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
    <Container>
      <nav className='bg-dark'>
        {/* Logo */}
        <Container sx={{backgroundColor: '#34495e'}} >
          <a>Inicio</a>
          <a>Cursos</a>
          <a>Proyectos</a>
        </Container>
        <div>
          <Button variant='contained' color='secondary' sx={{backgroundColor: '#fff', color: '#0b7077'}} >INICIAR SESION</Button>
          <Button variant='contained'>REGISTRARSE</Button>
        </div>
      </nav>
      <section className='bg-dark'>
        <div>
          <span>Nunca pares de aprender</span>
          <h2>Desarrolla tus habilidades con cursos en línea</h2>
          <Button variant='contained' color='secondary' sx={{color: '#fff'}}>VER CURSOS</Button>
        </div>
        {/* Imagen */}
      </section>


      <Auth />
      <button onClick={handleProfileClick}>Perfil de usuario</button>
    </Container>
  );
};

export default Home;
