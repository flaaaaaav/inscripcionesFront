import React from "react";
import { Button as MUIButton, ButtonProps as MUIButtonProps } from "@mui/material";
import { styled } from "@mui/system";

interface CustomButtonProps extends MUIButtonProps {
  colorVariant: "orange" | "green" | "white" | "white-navbar";
}

const StyledButton = styled(MUIButton, { shouldForwardProp: (prop) => prop !== 'colorVariant' })<CustomButtonProps>(({ theme, colorVariant }) => ({
  backgroundColor: colorVariant === "orange"
    ? theme.palette.secondary.main
    : colorVariant === "green"
    ? theme.palette.primary.main
    : "white",
  color: colorVariant === "white" || colorVariant === "white-navbar"
    ? theme.palette.custom.buttonWhiteText
    : "#ffffff",
  border: colorVariant === "white"
    ? `1px solid ${theme.palette.custom.buttonWhiteBorder}`
    : "none",
  borderRadius: "10px",
  padding: "12px 24px",
  textTransform: "none",
  fontSize: "16px",
  marginLeft: 3,
  fontWeight: "regular",
  "&:hover": {
    backgroundColor: colorVariant === "white" || colorVariant === "white-navbar"
      ? theme.palette.primary.main
      : colorVariant === "orange"
      ? theme.palette.secondary.dark
      : theme.palette.primary.dark,
    color: colorVariant === "white" || colorVariant === "white-navbar" ? "#ffffff" : undefined,
    border: colorVariant === "white" ? `1px solid #ffffff` : "none",
  },
}));

const CustomButton: React.FC<CustomButtonProps> = ({ colorVariant, children, ...props }) => {
  return (
    <StyledButton colorVariant={colorVariant} {...props}>
      {children}
    </StyledButton>
  );
};

export default CustomButton;
