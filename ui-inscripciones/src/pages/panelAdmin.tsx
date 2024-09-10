import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, CircularProgress } from '@mui/material'; // Agregamos CircularProgress
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import EditarProyectos from '../components/editarProyectos';
import CrearProyectos from '../components/crearProyectos';
import CrearCurso from '../components/crearCurso';
import CoursesEdit from '../components/coursesEdit';
import EditarUsuarios from '../components/editarUsuario';
import axios from 'axios';
import api from '../utils/axiosConfig';

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  fechaNacimiento: string;
  rolId: number;
  rolDescripcion: string;
}

const PanelAdmin: React.FC = () => {
  const [userData, setUserData] = useState<{ family_name: string; email: string; rolId: number | null }>({
    family_name: '',
    email: '',
    rolId: null
  });

  const [usuarios, setUsuarios] = useState<Usuario[]>([]); 
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData((prevData) => ({
        ...prevData,
        family_name: parsedUserData.family_name,
        email: parsedUserData.email
      }));
    }

    const fetchUsuarios = async () => {
      try {
        const response = await api.get('/api/usuario/listar');
        setUsuarios(response.data.content);
      } catch (error) {
        console.error('Error fetching usuarios:', error);
      }
    };

    fetchUsuarios();
  }, []);

  useEffect(() => {
    if (userData.email && usuarios.length > 0) {
      const usuarioLogueado = usuarios.find((usuario) => usuario.email === userData.email);

      if (usuarioLogueado) {
        setUserData((prevData) => ({
          ...prevData,
          rolId: usuarioLogueado.rolId
        }));
      }
    }
  }, [userData.email, usuarios]);

  useEffect(() => {
    if (userData.rolId !== null) {
      if (userData.rolId !== 1) {
        navigate('/'); 
      } else {
        setLoading(false); 
      }
    }
  }, [userData.rolId, navigate]);

  const handleGoBack = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress /> 
      </Box>
    );
  }

  return (
    <Box sx={{ padding: '16px' }}>
      <Box
        sx={{
          maxWidth: '1200px',
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <IconButton onClick={handleGoBack} color="primary">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" color="primary" fontWeight={600} gutterBottom sx={{ marginLeft: '16px' }}>
          Panel de Administrador
        </Typography>
      </Box>

      <Typography variant="h6" color="textPrimary" sx={{ margin: '16px 0' }}>
        Bienvenido, {userData.family_name}
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ marginBottom: '16px' }}>
        Correo: {userData.email}
      </Typography>
      {userData.rolId && (
        <Typography variant="body1" color="textSecondary" sx={{ marginBottom: '16px' }}>
          ID del Rol: {userData.rolId}
        </Typography>
      )}

      <Box sx={{ margin: '0 auto', maxWidth: '1200px' }}>
        <EditarProyectos />
        <CrearProyectos />
        <CoursesEdit />
        <CrearCurso />
        <EditarUsuarios />
      </Box>
    </Box>
  );
};

export default PanelAdmin;
