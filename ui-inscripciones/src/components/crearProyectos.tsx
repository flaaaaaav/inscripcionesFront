import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios';
import UploadWidget from '../components/uploadWidget'; 

const CrearProyectos: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (url: string | null) => {
    setUrl(url);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const proyectoData = {
      nombre,
      descripcion,
      url,
      fechaCreacion: new Date().toISOString() 
    };

    try {
      const response = await axios.post('http://localhost:8080/api/proyecto/crear', proyectoData);
      console.log('Proyecto creado:', response.data);
      setNombre('');
      setDescripcion('');
      setUrl(null);
      setOpen(false); 
    } catch (error) {
      console.error('Error al crear el proyecto:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const isFormValid = nombre.trim() !== '' && descripcion.trim() !== '' && url !== null;

  return (
    <Box sx={{padding: "1.5rem"}}>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Crear Proyecto
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Crear Proyecto</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            display="flex"
            flexDirection="column"
            gap={2}
            padding={2}
            borderRadius={2}
            onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}
          >
            <TextField
              label="Nombre del Proyecto"
              variant="outlined"
              fullWidth
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <TextField
              label="Descripción"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
            {/* Upload Widget para cargar la imagen */}
            <UploadWidget onUploadComplete={handleImageUpload} />
            {/* Mostrar la imagen cargada */}
            {url && (
              <Box mt={2}>
                <Typography variant="subtitle1">Imagen cargada:</Typography>
                <img src={url} alt="Uploaded" width="300" />
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            disabled={loading || !isFormValid}
          >
            {loading ? 'Guardando...' : 'Guardar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CrearProyectos;
