import React, { useEffect, useState } from 'react';
import { Typography, Box, Button } from '@mui/material';
// import axios from 'axios';
import CardProyectos from './cardProyectos';
import theme from '../theme';
import api from '../utils/axiosConfig';

interface Proyecto {
  id: number;
  nombre: string;
  descripcion: string;
  url: string;
}

const Projects: React.FC = () => {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(6); 

  const fetchProyectos = async (limit: number) => {
    try {
      const response = await api.get(`/api/proyecto/listar`, {   // Usar la ruta relativa
        params: { limit },
      });
      console.log('Respuesta del servidor:', response.data);
      setProyectos(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener proyectos:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProyectos(limit);
  }, [limit]);

  const handleViewAll = () => {
    setLimit(0); 
  };

  const handleButtonClick = () => {
    console.log('Botón de proyecto clickeado');
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h2"
          sx={{
            color: theme.palette.primary.main,
            fontWeight: 'bold',
            textAlign: 'center',
            ml: '1rem',
          }}
        >
          Proyectos
        </Typography>

        <Box sx={{ textAlign: 'center', mt: 2, ml: '15rem', marginTop: '0 !important' }}>
          <img src="./src/media/title-line-orange.png" alt="Decorative Line" style={{ width: '100%', maxWidth: '200px' }} />
        </Box>
      </Box>

      <Box sx={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <Typography variant="h6" component="h2" gutterBottom color="#696984" fontWeight={400} mb={5}>
          Convocatorias a egresados/as de nuestros cursos en IT que quieran participar activamente en proyectos en conjunto con las empresas asociadas.
        </Typography>
      </Box>

      {loading ? (
        <Typography variant="h6" sx={{textAlign: "center"}}>Cargando proyectos...</Typography>
      ) : proyectos.length === 0 ? (
        <Typography variant="h6" sx={{textAlign: "center"}}>No se encontraron proyectos.</Typography>
      ) : (
        <Box sx={{ margin: '0 auto', maxWidth: '1200px', display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
          {proyectos.map((proyecto) => (
            <CardProyectos
              key={proyecto.id}
              image={proyecto.url}
              title={proyecto.nombre}
              text={proyecto.descripcion}
              buttonText="Más Información"
              onButtonClick={handleButtonClick}
            />
          ))}
        </Box>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          sx={{
            marginTop: '2.5rem',
            backgroundColor: '#ffffff',
            color: theme.palette.primary.main,
            boxShadow: 'none',
            border: `1px solid ${theme.palette.primary.main}`,
            borderRadius: '12px',
            paddingLeft: '3rem',
            paddingRight: '3rem',
            '&:hover': {
              backgroundColor: theme.palette.secondary.main,
              color: '#fff',
              boxShadow: 'none',
              border: `1px solid ${theme.palette.secondary.main}`,
            },
          }}
          onClick={handleViewAll}
        >
          Ver todos
        </Button>
      </Box>
    </Box>
  );
};

export default Projects;
