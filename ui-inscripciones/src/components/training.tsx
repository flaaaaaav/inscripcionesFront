import React, { useRef, useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import theme from '../theme';

const Training: React.FC = () => {
  const iconSrcs = [
    './src/media/requeriments-icon-1.jpg',
    './src/media/requeriments-icon-2.jpg',
    './src/media/requeriments-icon-3.jpg',
  ];

  const requisitos = [
    'Aprende los métodos y técnicas más útiles con los mejores profesionales del sector IT.',
    'Cada profesor te transmitirá sus conocimientos con pasión, ofreciéndote explicaciones claras y una perspectiva profesional en cada lección.',
    'Cada Institución selecciona cuidadosamente los profesores y produce cada curso internamente para garantizar una experiencia de aprendizaje online excelente.',
  ];

  const [inView, setInView] = useState(false);
  const spanRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        } else {
          setInView(false);
        }
      },
      { threshold: 0.5 }
    );

    if (spanRef.current) {
      observer.observe(spanRef.current);
    }

    return () => {
      if (spanRef.current) {
        observer.unobserve(spanRef.current);
      }
    };
  }, []);

  return (
    <Box sx={{}}>
      <Box 
        display="flex" 
        flexDirection={{ xs: 'column', sm: 'row' }} 
        maxWidth="1000px" 
        sx={{ 
          minWidth: '320px', 
          padding: 2,
        }} 
      >
        <Box 
          flex={1} 
          padding={2} 
          display="flex" 
          justifyContent="center" 
          alignItems="center" 
          sx={{
            
            borderRadius: "24px",
            alignSelf: "center",
            order: { xs: 2, sm: 1 }, 
            marginTop: { xs: '2rem', sm: '0' }
          }}
        >
          <img src="./src/media/training.png" alt="Descripción de la imagen" style={{ maxWidth: '70%', height: 'auto' }} />
        </Box>
        <Box 
          flex={1} 
          padding={2}
          order={{ xs: 1, sm: 2 }} 
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Typography
            variant="h5"
            fontSize="14px"
            marginLeft="1rem"
            sx={{
              display: "inline-block",
            }}
          >
            <span
              ref={spanRef}
              style={{
                backgroundColor: inView ? "#d4e1ff" : "#f5f5f5",
                color: theme.palette.primary.main,
                padding: "0.5rem 1rem",
                borderRadius: "16px",
                transition: "background-color 0.3s ease",
              }}
            >
              Profesores
            </span>
          </Typography>

          <Typography 
            variant="h4" 
            color={theme.palette.secondary.main} 
            fontWeight={800} 
            fontSize="32px" 
            marginTop="1rem"
          >
            Formación del personal
          </Typography>
          <List sx={{ maxWidth: "90%" }}>
            {requisitos.map((requisito, index) => (
              <ListItem key={index} sx={{ marginBottom: "1.5rem" }}>
                <ListItemIcon>
                  <img src={iconSrcs[index]} alt={`Icono ${index + 1}`} style={{ width: '32px', height: '32px' }} />
                </ListItemIcon>
                <ListItemText 
                  primary={requisito} 
                  primaryTypographyProps={{ fontSize: '14px' }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default Training;
