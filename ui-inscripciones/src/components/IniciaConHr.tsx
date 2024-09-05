import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import theme from "../theme";

export default function IniciaConHr() {
  return(
    <Box sx={{display: "flex", alignItems: "center", width: "100%", position: "relative", margin: "24px 0"}}>
      <Typography component="span" sx={{color: "#999", width: "fit-content", margin: "0 auto", padding: "0 8px",  fontSize: "14px", display: "flex", justifyContent: "center", zIndex: "10", background: theme.palette.background.paper}}>
        O inicia con
      </Typography>
      <hr style={{ width: "100%", border: "none", borderTop: "1px solid black", borderColor: "#cacaca", position: "absolute", zIndex: "5" }} />
    </Box>
  )
}