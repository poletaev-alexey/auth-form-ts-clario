import { useState, useEffect } from 'react';
import { TextField, IconButton, InputAdornment, Typography, Box, styled } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

type PasswordInputProps = {
    value: string;
    onChange: (value: string) => void;
    onFocus: () => void;
    onBlur: () => void;
    submitted: boolean;
    error?: boolean;
};

const StyledTextField = styled(TextField)(({ error }: { error?: boolean }) => ({
    borderRadius: '10px',
    backgroundColor: error ? '#FFEBEE' : '#fff',
    '& .MuiOutlinedInput-root': {
        borderRadius: '10px',
        '& fieldset': {
            borderColor: error ? '#D32F2F' : '#B0BEC5',
        },
        '&:hover fieldset': {
            borderColor: '#1E88E5',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#2B3EAB',
        },
    },
}));

const StyledTypography = styled(Typography)(({ isValid, submitted, isTyping }: { isValid: boolean, submitted: boolean, isTyping: boolean }) => ({
    color: submitted && !isValid ? 'red' : isTyping && isValid ? '#27B274' : 'black',
}));

const PasswordInput = ({ value, onChange, onFocus, onBlur, submitted, error }: PasswordInputProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isValidLength, setIsValidLength] = useState(false);
    const [hasUppercase, setHasUppercase] = useState(false);
    const [hasDigit, setHasDigit] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        setIsValidLength(value.length >= 8);
        setHasUppercase(/[A-Z]/.test(value) && /[a-z]/.test(value));
        setHasDigit(/\d/.test(value));
        setIsTyping(value.length > 0);
    }, [value]);

    return (
        <Box mb={2}>
            <StyledTextField
                label="Create your password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                fullWidth
                margin="normal"
                value={value}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={(e) => onChange(e.target.value)}
                error={!!error}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={togglePasswordVisibility}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />

            <Box p={3}>
                <StyledTypography isValid={isValidLength} submitted={submitted} isTyping={isTyping} variant="body2">
                    Has at least 8 characters (no spaces)
                </StyledTypography>
                <StyledTypography isValid={hasUppercase} submitted={submitted} isTyping={isTyping} variant="body2">
                    Uppercase and lowercase letters
                </StyledTypography>
                <StyledTypography isValid={hasDigit} submitted={submitted} isTyping={isTyping} variant="body2">
                    1 digit minimum
                </StyledTypography>
            </Box>
        </Box>
    );
};

export default PasswordInput;
