import { useState, useEffect } from 'react';
import { TextField, IconButton, InputAdornment, Typography, Box, styled, TypographyProps } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

type PasswordInputProps = {
    value: string;
    onChange: (value: string) => void;
    onBlur: () => void;
    submitted: boolean;
    error?: boolean;
};

const StyledErrorBox = styled(Box)({
    zIndex: 2,
    position: 'relative',
    padding: '20px 20px 0px'
});

const StyledTextField = styled(TextField)(({ error }: { error?: boolean }) => ({
    borderRadius: '10px',
    margin: '0!important',
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

const StyledTypography = styled(({ isValid, submitted, isTyping, ...props }: {
    isValid: boolean;
    submitted: boolean;
    isTyping: boolean;
} & TypographyProps) => (
    <Typography {...props} />
))(({ isValid, submitted, isTyping }: { isValid: boolean; submitted: boolean; isTyping: boolean }) => ({
    color: submitted && !isValid ? '#FF8080' : isTyping && isValid ? '#27B274' : '#4A4E71',
    fontSize: '13px',
}));

const PasswordInput = ({ value, onChange, onBlur, submitted, error }: PasswordInputProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isValidLength, setIsValidLength] = useState(false);
    const [hasUppercase, setHasUppercase] = useState(false);
    const [hasDigit, setHasDigit] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        const hasNoSpaces = !/\s/.test(value);
        setIsValidLength(value.length >= 8 && hasNoSpaces);
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

            <StyledErrorBox aria-live="polite">
                <StyledTypography isValid={isValidLength} submitted={submitted} isTyping={isTyping} variant="body2">
                    Has at least 8 characters (no spaces)
                </StyledTypography>
                <StyledTypography isValid={hasUppercase} submitted={submitted} isTyping={isTyping} variant="body2">
                    Uppercase and lowercase letters
                </StyledTypography>
                <StyledTypography isValid={hasDigit} submitted={submitted} isTyping={isTyping} variant="body2">
                    1 digit minimum
                </StyledTypography>
            </StyledErrorBox>
        </Box>
    );
};

export default PasswordInput;
