import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import theme from '../theme';
import CustomButton from './customButton';
import CardCursos from './cardCursos';
import api from '../utils/axiosConfig';

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);  

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get('/api/curso/listar');
        setCourses(response.data.content);  
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: '#f9f9f9',
        py: 4,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ maxWidth: '1200px', mx: 'auto', px: 2, margin: '0 auto' }}>
        {/* Contenedor del título */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h2"
            sx={{
              color: theme.palette.secondary.main,
              fontWeight: 'bold',
              textAlign: 'center',
              ml: { xs: 'none', lg: '1rem' },
            }}
          >
            Próximos cursos
          </Typography>

          {/* Imagen debajo del título */}
          <Box sx={{ textAlign: 'center', mt: 2, ml: { xs: '10rem', lg: '35rem' }, marginTop: '0 !important' }}>
            <img src="./src/media/title-line.png" alt="Decorative Line" style={{ width: '100%', maxWidth: '200px' }} />
          </Box>
        </Box>

        {/* Contenedor de los botones */}
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 5, justifyContent: 'center' }}>
          <CustomButton colorVariant="green">Todos los cursos</CustomButton>
          <CustomButton colorVariant="white">Ui/Ux Design</CustomButton>
          <CustomButton colorVariant="white">Python</CustomButton>
          <CustomButton colorVariant="white">HTML & CSS</CustomButton>
          <CustomButton colorVariant="white">React</CustomButton>
          <CustomButton colorVariant="white">QA</CustomButton>
        </Box>

        {/* Lista de cursos obtenidos */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
          {courses.length > 0 ? (
            courses.map((course) => (
              <CardCursos
                key={course.id}  
                amount={`${course.semanal} Clase Semanal`} 
                duration={`Duración: ${course.duracion} semanas`}
                title={course.titulo}
                subtitle={`con ${course.lenguaje}`} 
                description={course.descripcion}
                imageUrl={course.url}  
                onButtonClick={() => alert(`Curso de ${course.lenguaje}`)}
                buttonText="Inscribite"
              />
            ))
          ) : (
            <Typography variant="h6">No se encontraron cursos.</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Courses;
