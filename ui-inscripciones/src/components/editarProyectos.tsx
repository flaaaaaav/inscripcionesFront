import React, { useState, useEffect } from 'react';
import { Box, Button, Container, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import api from '../utils/axiosConfig';

interface Proyecto {
  id: number;
  nombre: string;
  descripcion: string;
  url: string;
  fechaCreacion: string;
}

const EditarProyectos: React.FC = () => {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProyecto, setSelectedProyecto] = useState<Proyecto | null>(null);
  const [formData, setFormData] = useState<Omit<Proyecto, 'id'>>({
    nombre: '',
    descripcion: '',
    url: '',
    fechaCreacion: ''
  });

  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const response = await api.get('/api/proyecto/listar');
        setProyectos(response.data);
      } catch (error) {
        console.error('Error fetching proyectos:', error);
      }
    };

    fetchProyectos();
  }, []);

  const handleOpenDialog = (proyecto: Proyecto) => {
    setSelectedProyecto(proyecto);
    setFormData({
      nombre: proyecto.nombre,
      descripcion: proyecto.descripcion,
      url: proyecto.url,
      fechaCreacion: proyecto.fechaCreacion
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProyecto(null);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleEdit = async () => {
    if (selectedProyecto) {
      try {
        await api.put(`/api/proyecto/editar/${selectedProyecto.id}`, formData);
        setProyectos(proyectos.map(proyecto => proyecto.id === selectedProyecto.id ? { ...proyecto, ...formData } : proyecto));
        handleCloseDialog();
      } catch (error) {
        console.error('Error updating proyecto:', error);
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/api/proyecto/borrar/${id}`);
      setProyectos(proyectos.filter(proyecto => proyecto.id !== id));
    } catch (error) {
      console.error('Error deleting proyecto:', error);
    }
  };

  return (
    <Container sx={{marginTop: "4rem"}}>
      <Typography variant="h6" fontWeight={600} color="primary" gutterBottom>
        Editar Proyectos
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Fecha de Creación</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {proyectos.map(proyecto => (
              <TableRow key={proyecto.id}>
                <TableCell>{proyecto.nombre}</TableCell>
                <TableCell>{proyecto.descripcion}</TableCell>
                <TableCell>{new Date(proyecto.fechaCreacion).toLocaleDateString()}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenDialog(proyecto)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(proyecto.id)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Editar Proyecto</DialogTitle>
        <DialogContent>
          <TextField
            label="Nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Descripción"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="URL"
            name="url"
            value={formData.url}
            onChange={handleChange}
            fullWidth
            margin="normal"
            disabled
          />
          <TextField
            label="Fecha de Creación"
            name="fechaCreacion"
            value={formData.fechaCreacion}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="date"
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleEdit} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default EditarProyectos;
