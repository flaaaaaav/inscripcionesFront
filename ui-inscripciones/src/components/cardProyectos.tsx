import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import theme from '../theme';

interface CardProyectosProps {
  image: string;
  title: string;
  text: string;
  buttonText: string;
  onButtonClick: () => void;
}

const CardProyectos: React.FC<CardProyectosProps> = ({ image, title, text, buttonText, onButtonClick }) => {
  return (
    <Card sx={{ maxWidth: 345, boxShadow: "none", textAlign: "center", display: "flex", justifyContent: "center", flexDirection: "column" }}>
      <CardMedia
        component="img"
        image={image}
        alt={title} sx={{width: "50px", margin: "0 auto"}}
      />
      <CardContent>
        <Typography variant="h5" component="div" fontWeight={600} mb={1} sx={{color: theme.palette.primary.main}}>
          {title}
        </Typography>
        <Typography
      variant="body2"
      color="#696984"
      fontWeight={500}
      sx={{ lineHeight: '2' }} 
    >
      {text}
    </Typography>
      </CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
      <Button
      variant="contained"
      onClick={onButtonClick}
      sx={{
        backgroundColor: '#ffffff', 
        color: theme.palette.primary.main, 
        boxShadow: "none",
        '&:hover': {
          backgroundColor: theme.palette.secondary.main, 
          color: '#fff', 
          boxShadow: "none",
        },
      }}
    >
      {buttonText}
    </Button>
      </Box>
    </Card>
  );
};

export default CardProyectos;
