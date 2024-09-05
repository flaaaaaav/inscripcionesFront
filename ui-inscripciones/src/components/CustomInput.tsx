import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { styled } from "@mui/system";
import { Input as MUIInput, InputProps as MUIInputProps } from "@mui/material";

interface InputFieldProps extends MUIInputProps {
  type: "email" | "text" | "password",
  placeholder: string,
  label: string
}

const StyledInput = styled(MUIInput)(() => ({
  border: "1px solid #79747E",
  borderBottom: "1px",
  borderRadius: "4px",
  padding: "8px 0 8px 16px"
}));

export default function InputField({type, placeholder, label}: InputFieldProps) {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <StyledInput type={type} placeholder={placeholder} />
    </FormControl>
  );
}