import { Button as MUIButton } from "@mui/material";
import { styled } from "@mui/system";

interface GoogleButtonProps {}

const StyledGoogleButton = styled(MUIButton)(() => ({
  backgroundColor: "#fff",
  border: "1px solid #515def",
  width: "100%",
  height: "48px",
  borderRadius: "4px",
}));

export default function GoogleButton({ ...props }: GoogleButtonProps) {
  return (
    <StyledGoogleButton {...props}>
      <img src="./src/media/google-icon.png" alt="Google login" />
    </StyledGoogleButton>
  );
}