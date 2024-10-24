import { useState } from 'react';
import { TextField, styled } from '@mui/material';

const StyledTextField = styled(TextField)(({ isValid, error }: { isValid: boolean; error?: boolean }) => ({
    borderRadius: '10px',
    backgroundColor: error ? '#FFEBEE' : '#fff',
    '& .MuiOutlinedInput-root': {
        borderRadius: '10px',
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
        color: isValid ? '#27B274' : '#4A4E71',
    },

    '& .MuiInputBase-input': {
        color: isValid ? '#27B274' : '#4A4E71',
    },
}));

type EmailInputProps = {
    value: string;
    onChange: (value: string) => void;
    onFocus: () => void;
    onBlur: () => void;
    error?: boolean;
};

const EmailInput = ({ value, onChange, onFocus, onBlur, error }: EmailInputProps) => {
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
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={handleChange}
            error={!!error}
            helperText={error ? "Please enter a valid email" : ""}
            isValid={isValid} // Pass isValid only to StyledTextField for internal styling
        />
    );
};

export default EmailInput;
