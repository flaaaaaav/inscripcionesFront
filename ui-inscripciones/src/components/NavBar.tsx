import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CustomButton from './customButton';
import theme from '../theme';

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = ['Inicio', 'Cursos', 'Proyectos'];

export default function DrawerAppBar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Punto&Aprende
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <CustomButton colorVariant="white" >
        INICIAR SESION
      </CustomButton>
      <CustomButton colorVariant="green" >
        REGISTRARSE
      </CustomButton>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" sx={{py: "2rem", backgroundColor: theme.palette.primary.dark, boxShadow: "none"}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <div style={{width: '16px'}}>X</div>
          <Typography variant="h6" sx={{ my: 2, ml: '2rem' }}>
            Punto&Aprende
          </Typography>
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, marginX: {lg: '7.5rem', md: "1rem"}, width: "0", display: { xs: 'none', sm: 'block' } }}
          >
            Punto&Aprende
          </Typography>
          <Box sx={{flexGrow: {lg: 1, md: 0.5}, gap: {lg:"4rem", md: "1rem",}, justifyContent: 'center', alignItems: "center", display: { xs: 'none', sm: 'flex' } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: '#fff', textTransform: 'none' }}>
                {item}
              </Button>
            ))}
          </Box>
          <Box sx={{flexGrow: 0, display: { xs: "none", sm: "flex"}, flexDirection: {sm: "column", md: "row"}, gap: "1rem", justifyContent: "start"}}>
            <CustomButton colorVariant="white" sx={{width: {md: "12.6rem", sm: "8rem" }, height: {md: "3.75rem", sm: "3rem"}, padding: {md: "20px 40px", sm: "5px 8px"}, color: theme.palette.primary.main}} >
              INICIAR SESION
            </CustomButton>
            <CustomButton colorVariant="green" sx={{width: {md: "12.6rem", sm: "8rem" }, height: {md: "3.75rem", sm: "3rem"}, padding: {md: "20px 40px", sm: "5px 8px"}}} >
              REGISTRARSE
            </CustomButton>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
} 