import React, { useState, useEffect } from 'react';
import { UserDataType } from '../types';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Avatar, Button } from '@mui/material';
import theme from '../theme';

const Profile: React.FC = () => {
  const [userData, setUserData] = useState<UserDataType>({
    email: "",
    email_verified: false,
    family_name: "",
    given_name: "",
    name: "",
    picture: "",
    sub: "",
    birthday: "",
    rolId: 0 
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
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: theme.palette.background.default,
      padding: '2rem',
      mt: "2rem"
    }}>
      <Typography variant="h4" sx={{ marginBottom: '1.5rem', fontWeight: 500, color: theme.palette.text.primary }}>
        Perfil del Usuario
      </Typography>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: theme.palette.background.paper,
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
      }}>
        <Avatar
          src={userData.picture}
          alt={userData.name}
          sx={{ width: '150px', height: '150px', marginBottom: '1.5rem' }}
        />
        <Typography variant="h5" sx={{ marginBottom: '1rem', color: theme.palette.text.secondary }}>
          {userData.name}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: '0.5rem', color: theme.palette.text.primary }}>
          Correo: {userData.email}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: '1.5rem', color: theme.palette.text.primary }}>
          Fecha de nacimiento: {userData.birthday || 'No disponible'}
        </Typography>
        
        <Button
          onClick={handleHomeClick}
          variant="contained"
          color="primary"
          sx={{ textTransform: 'none', width: '200px', boxShadow: 'none' }}
        >
          Ir al Inicio
        </Button>
      </Box>
    </Box>
  );
};

export default Profile;
