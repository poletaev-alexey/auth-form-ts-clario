import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, styled } from '@mui/material';
import Star from '../components/Star';

const StyledBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    textAlign: 'center',
    background: 'linear-gradient(167.96deg, #F4F9FF 0%, #E0EDFB 100%)',
});

const StyledImageWrapper = styled(Box)({
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    overflow: 'hidden',
    marginBottom: '20px',
});

const StyledGiftImage = styled('img')({
    width: '300px',
    height: '300px',
    objectFit: 'cover',
});

const StyledPhotoImage = styled('img')({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
});

const StyledButton = styled(Button)({
    marginTop: '24px',
});

export default function SuccessPage() {
    const numStars = 10;
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn) {
            navigate('/');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        navigate('/');
    };

    return (
        <StyledBox>
            {[...Array(numStars)].map((_, index) => (
                <Star key={index} />
            ))}

            <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
                Congratulations, you have successfully logged in!
            </Typography>

            <StyledGiftImage src="/gift.png" alt="Gift" />

            <StyledImageWrapper>
                <StyledPhotoImage src="/photo.jpg" alt="Your Photo" />
            </StyledImageWrapper>

            <Typography variant="h4" sx={{ color: '#333' }}>
                Hi, I am Oleksii Poletaiev
            </Typography>

            <Typography variant="h5" sx={{ color: '#333' }}>
                Clario, I want to work with you! :)
            </Typography>

            <StyledButton onClick={handleLogout} variant="contained" color="primary">
                Logout
            </StyledButton>
        </StyledBox>
    );
}
