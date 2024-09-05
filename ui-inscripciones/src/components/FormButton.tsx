import { Button as MUIButton, ButtonProps as MUIButtonProps } from "@mui/material";
import { styled } from "@mui/system";

interface FormButtonProps extends MUIButtonProps {
  buttonText: string;
}

const StyledFormButton = styled(MUIButton)(({ theme }) => ({
  backgroundColor: theme.palette.formButton.background,
  color: "#fff",
  width: "100%",
  height: "48px",
  borderRadius: "4px",
  padding: "8px 16px",
  fontWeight: "600",
  fontSize: "14px",
  fontFamily: "Poppins, sans-serif",
  textTransform: "none",
  marginTop: "24px"
}));

export default function FormButton({ buttonText, ...props }: FormButtonProps) {
  return (
    <StyledFormButton {...props}>
      {buttonText}
    </StyledFormButton>
  );
}