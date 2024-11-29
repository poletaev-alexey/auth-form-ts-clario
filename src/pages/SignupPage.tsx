import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, styled } from '@mui/material';
import PasswordInput from '../components/PasswordInput';
import EmailInput from '../components/EmailInput';
import Star from '../components/Star';

const StyledBox = styled(Box)({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(167.96deg, #F4F9FF 0%, #E0EDFB 100%)',
});

const StyledForm = styled('form')({
    width: '320px',
    gap: '20px',
    display: 'flex',
    flexDirection: 'column',

});

const StyledTypography = styled(Typography)({
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    fontSize: '28px'
});

const StyledButton = styled(Button)({
    width: '70%',
    margin: 'auto',
    marginBottom: 0,
    display: 'flex',
    padding: '12px 0',
    borderRadius: '50px',
    background: 'linear-gradient(90deg, #43B6FB 0%, #3A8BFE 100%)',
    fontWeight: 'bold',
    fontSize: '16px',
    color: '#fff',
    '&:hover': {
        background: 'linear-gradient(90deg, #43B6FB 0%, #3A8BFE 100%)',
    },
});

export default function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();
    const numStars = 8;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);

        const emailIsValid = /\S+@\S+\.\S+/.test(email);
        const passwordIsValid =
            password.length >= 8 &&
            /[A-Z]/.test(password) &&
            /\d/.test(password) &&
            !password.includes(' ');

        if (!emailIsValid || !passwordIsValid) {
            console.log('Form validation failed');
            return;
        }

        localStorage.setItem('isLoggedIn', 'true');
        navigate('/success');
    };

    return (
        <StyledBox>
            {[...Array(numStars)].map((_, index) => (
                <Star key={index} />
            ))}
            <StyledForm onSubmit={handleSubmit}>
                <StyledTypography variant="h4">Sign up</StyledTypography>

                <EmailInput
                    value={email}
                    onBlur={() => { }}
                    onChange={setEmail}
                    error={submitted && !/\S+@\S+\.\S+/.test(email)}
                />

                <PasswordInput
                    value={password}
                    onChange={setPassword}
                    onBlur={() => { }}
                    submitted={submitted}
                    error={
                        submitted &&
                        (password.length < 8 ||
                            !/[A-Z]/.test(password) ||
                            !/\d/.test(password) ||
                            password.includes(' '))
                    }
                />
                <StyledButton type="submit" variant="contained" color="primary">
                    Sign up
                </StyledButton>
            </StyledForm>
        </StyledBox>
    );
}
