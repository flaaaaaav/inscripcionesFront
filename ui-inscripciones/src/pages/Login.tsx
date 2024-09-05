import { Container, Box, Typography, FormControlLabel, Checkbox } from "@mui/material";
import CustomInput from "../components/CustomInput";
import FormButton from "../components/FormButton";
import theme from "../theme";
import GoogleButton from "../components/GoogleButton";

export default function Login() {
  return(
    <>
      <Container sx={{ display: {xs: "block", md:"grid"}, width: "100dvw", height: "100dvh", alignItems: "center",  placeContent: "center", margin: "0 auto", padding: {xs: "0 40px"}, gridTemplateColumns: "1fr 1fr", gap: "2rem", fontFamily: "Poppins, sans-serif"}}>
        <Typography variant="h4" color="primary.dark" sx={{position: "absolute", top: "48px", left: "48px"}}>Punto&Aprende</Typography>
        <Box sx={{display: "flex", flexDirection: "column", gap: "1rem", width: "100%"}}>
          <CustomInput type="email" placeholder="ejemplo@gmail.com" label="Email"></CustomInput>
          <CustomInput type="password" placeholder="Password" label="Password"></CustomInput>
          <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%"}}>
            <FormControlLabel
              sx={{color: "#000"}}
              label="Recordarme"
              control={
                <Checkbox
                  name="SomeName"
                  value="SomeValue"
                />
              }
            />
            <Typography component="span" sx={{color: theme.palette.secondary.light, cursor: "pointer"}}>Olvidé mi contraseña</Typography>
          </Box>
          <FormButton buttonText="Iniciar Sesión"></FormButton>
          <Typography component="p" sx={{color: theme.palette.text.primary, fontWeight: "bold", width: "100%", display: "flex", justifyContent: "center", gap: "8px"}}>
            ¿No tenés cuenta?
            <Typography component="span" sx={{color: theme.palette.secondary.light, cursor: "pointer"}}>Registrate</Typography>
          </Typography>
          <Box sx={{display: "flex", alignItems: "center", width: "100%", position: "relative", margin: "24px 0"}}>
            <Typography component="span" sx={{color: "#999", width: "fit-content", margin: "0 auto", padding: "0 8px",  fontSize: "14px", display: "flex", justifyContent: "center", zIndex: "10", background: theme.palette.background.paper}}>
              O inicia con
            </Typography>
            <hr style={{ width: "100%", border: "none", borderTop: "1px solid black", borderColor: "#cacaca", position: "absolute", zIndex: "5" }} />
          </Box>
          <GoogleButton />
        </Box>
        <Box sx={{display: {xs: "none", md: "block"}}}>
          <img src="./src/media/register-img.png" alt="Descripción de la imagen" style={{ width: "100%", height: 'auto' }} />
        </Box>
      </Container>
    </>
  )
}