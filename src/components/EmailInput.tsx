import { useState } from 'react';
import { TextField, styled, TextFieldProps } from '@mui/material';

const StyledTextField = styled(({ isValid, error, ...props }: { isValid: boolean; error?: boolean } & TextFieldProps) => (
    <TextField {...props} />
))(({ isValid, error }: { isValid: boolean; error?: boolean }) => ({
    borderRadius: '10px',
    margin: '0!important',
    '& .MuiOutlinedInput-root': {
        borderRadius: '10px',
        overflow: 'hidden',
        '& fieldset': {
            borderColor: isValid ? '#27B274' : error ? '#D32F2F' : '#B0BEC5',
        },
        '&:hover fieldset': {
            borderColor: isValid ? '#27B274' : '#1E88E5',
        },
        '&.Mui-focused fieldset': {
            borderColor: isValid ? '#27B274' : '#2B3EAB',
        },
    },
    '& .MuiInputLabel-root': {
        color: isValid ? '#27B274' : '#4A4E71',
    },
    '& .MuiFormHelperText-root': {
        color: isValid ? '#27B274' : '#FF8080',
        fontSize: '13px',
        marginLeft: "20px",
        marginRight: "20px",
    },
    '& .MuiInputBase-input': {
        color: isValid ? '#27B274' : '#4A4E71',
        backgroundColor: error ? '#FFEBEE' : '#fff',
    },
}));

type EmailInputProps = {
    value: string;
    onChange: (value: string) => void;
    onBlur: () => void;
    error?: boolean;
};

const EmailInput = ({ value, onChange, onBlur, error }: EmailInputProps) => {
    const [isValid, setIsValid] = useState(false);

    const validateEmail = (email: string) => {
        const emailRegex = /\S+@\S+\.\S+/;
        return emailRegex.test(email);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        onChange(newValue);
        setIsValid(validateEmail(newValue));
    };

    return (
        <StyledTextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={value}
            onBlur={onBlur}
            onChange={handleChange}
            error={!!error}
            helperText={error ? "Please enter a valid email" : ""}
            isValid={isValid}
        />
    );
};

export default EmailInput;
