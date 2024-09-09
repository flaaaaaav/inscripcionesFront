import React from "react";
import { Card, CardContent, CardMedia, Typography, CardActions } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CustomButton from "./customButton";

interface CardCursosProps {
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  duration: string;
  amount: string;
  onButtonClick?: () => void;
  buttonText?: string;
}

const CardCursos: React.FC<CardCursosProps> = ({ title, subtitle, description, imageUrl, duration, amount, onButtonClick, buttonText = "Learn More" }) => {
  const theme = useTheme();

  return (
    <Card 
      sx={{ 
        maxWidth: "320px", 
        borderRadius: "16px", 
        backgroundColor: theme.palette.background.paper, 
        boxShadow: "none" ,
      }}
    >
 <CardMedia
  component="img"
  image={imageUrl}
  alt={title}
  sx={{
    width: '100%',           
    height: 200,             
    objectFit: 'cover',      
    borderRadius: '8px',     
  }}
/>

      <CardContent>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
          <Typography variant="body2" color={theme.palette.text.secondary}>
            {duration}
          </Typography>
          <Typography variant="body2" color={theme.palette.text.secondary}>
            {amount}
          </Typography>
        </div>
        <Typography gutterBottom variant="h6" component="div" color={theme.palette.primary.main} fontWeight="800" marginBottom={0}>
          {title}
        </Typography>
        <Typography gutterBottom variant="h6" component="div" color={theme.palette.primary.main} fontWeight="300">
          {subtitle}
        </Typography>
        <Typography
  variant="body2"
  color={theme.palette.text.primary}
  marginBottom={1}
  marginTop={2}
  sx={{
    height: '40px',           
    overflow: 'hidden',       
    textOverflow: 'ellipsis', 
    display: '-webkit-box',    
    WebkitLineClamp: 3,       
    WebkitBoxOrient: 'vertical',
  }}
>
  {description}
</Typography>
      </CardContent>
      <CardActions>
        <CustomButton colorVariant="green" onClick={onButtonClick}>
          {buttonText}
        </CustomButton>
      </CardActions>
    </Card>
  );
};

export default CardCursos;
