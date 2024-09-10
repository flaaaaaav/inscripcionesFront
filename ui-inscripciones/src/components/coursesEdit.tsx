import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, IconButton, Table, TableBody, TableCell, TableHead, TableRow, TextField, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import api from '../utils/axiosConfig';


interface CursoDTO {
  id: number;
  titulo: string;
  descripcion: string;
  categoria: string;
  url: string;
  lenguaje: string;
  duracion: string;
  semanal: string;
  fechaInicio: string;
  fechaFin: string;
  ongId: string;
  mentorId: string;
}

const CoursesEdit: React.FC = () => {
  const [cursos, setCursos] = useState<CursoDTO[]>([]);
  const [editCourse, setEditCourse] = useState<CursoDTO | null>(null);
  const [open, setOpen] = useState(false);
  const [mentores, setMentores] = useState<{ id: number; nombreCompleto: string }[]>([]);
  const [ongs, setOngs] = useState<{ id: number; nombre: string }[]>([]);

  useEffect(() => {
    fetchCourses();
    fetchMentores();
    fetchOngs();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await api.get('/api/curso/listar');
      setCursos(response.data.content); 
    } catch (error) {
      console.error('Error al obtener los cursos', error);
    }
  };

  const fetchMentores = async () => {
    try {
      const response = await api.get('/api/mentor/listar');
      setMentores(response.data.content.map((mentor: any) => ({
        id: mentor.id,
        nombreCompleto: `${mentor.nombreUsuario} ${mentor.apellidoUsuario}`,
      })));
    } catch (error) {
      console.error('Error al obtener mentores', error);
    }
  };

  const fetchOngs = async () => {
    try {
      const response = await api.get('/api/ong/listar');
      setOngs(response.data.content.map((ong: any) => ({
        id: ong.id,
        nombre: ong.nombre,
      })));
    } catch (error) {
      console.error('Error al obtener ONGs', error);
    }
  };

  const handleEdit = (course: CursoDTO) => {
    setEditCourse(course);
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/api/curso/borrar/${id}`);
      fetchCourses();
    } catch (error) {
      console.error('Error al eliminar el curso', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setEditCourse(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editCourse) {
      setEditCourse({ ...editCourse, [e.target.name]: e.target.value });
    }
  };

  const handleSave = async () => {
    if (editCourse) {
      try {
        await api.put(`/api/curso/editar/${editCourse.id}`, editCourse);
        fetchCourses();
        handleClose();
      } catch (error) {
        console.error('Error al actualizar el curso', error);
      }
    }
  };

  return (
    <Box sx={{margin: "1.5rem"}}>
      <Typography variant="h6" fontWeight={600} color="primary" gutterBottom>
        Editar cursos
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Título</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Lenguaje</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cursos.map((curso) => (
            <TableRow key={curso.id}>
              <TableCell>{curso.titulo}</TableCell>
              <TableCell>{curso.descripcion}</TableCell>
              <TableCell>{curso.lenguaje}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleEdit(curso)} color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(curso.id)} color="secondary">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Editar Curso</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Título"
            name="titulo"
            value={editCourse?.titulo || ''}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Descripción"
            name="descripcion"
            value={editCourse?.descripcion || ''}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            select
            label="Categoría"
            name="categoria"
            value={editCourse?.categoria || ''}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="Ui/Ux">Ui/Ux</MenuItem>
            <MenuItem value="Python">Python</MenuItem>
            <MenuItem value="HTML/CSS">HTML/CSS</MenuItem>
            <MenuItem value="React">React</MenuItem>
            <MenuItem value="QA">QA</MenuItem>
          </TextField>
          <TextField
            margin="dense"
            label="Lenguaje"
            name="lenguaje"
            value={editCourse?.lenguaje || ''}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            select
            label="Días por semana"
            name="semanal"
            value={editCourse?.semanal || ''}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="1">1 día</MenuItem>
            <MenuItem value="2">2 días</MenuItem>
            <MenuItem value="3">3 días</MenuItem>
          </TextField>
          <TextField
            margin="dense"
            label="Fecha de Inicio"
            name="fechaInicio"
            type="date"
            value={editCourse?.fechaInicio || ''}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            label="Fecha de Fin"
            name="fechaFin"
            type="date"
            value={editCourse?.fechaFin || ''}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            select
            label="Mentor"
            name="mentorId"
            value={editCourse?.mentorId || ''}
            onChange={handleChange}
            fullWidth
          >
            {mentores.map((mentor) => (
              <MenuItem key={mentor.id} value={mentor.id}>
                {mentor.nombreCompleto}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="ONG"
            name="ongId"
            value={editCourse?.ongId || ''}
            onChange={handleChange}
            fullWidth
          >
            {ongs.map((ong) => (
              <MenuItem key={ong.id} value={ong.id}>
                {ong.nombre}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSave} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CoursesEdit;
