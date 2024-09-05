import { ReactNode } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

interface LoginLayoutProps {
  children: ReactNode
}

export default function LoginLayout({children}: LoginLayoutProps) {
  return(
    <>
      <Typography variant="h4" color="primary.dark" sx={{margin: "3rem", marginBottom: "0"}}>Punto&Aprende</Typography>
      <Container sx={{ display: {xs: "block", md:"grid"}, width: "100dvw", minHeight: "calc(100dvh - 8.625rem)", alignItems: "center",  placeContent: "center", padding: {xs: "0 40px", md: "4rem"}, gridTemplateColumns: "1fr 1fr", gap: "2rem", fontFamily: "Poppins, sans-serif"}}>
        {children}
      </Container>
    </>
  )
}