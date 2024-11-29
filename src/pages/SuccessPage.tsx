import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, styled } from '@mui/material';
import Star from '../components/Star';
const StyledWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    textAlign: 'center',
    zIndex: 2,
    position: 'relative',
    padding: '16px',
    [theme.breakpoints.down('sm')]: {
        padding: '32px 16px',
    },
}))

const StyledBox = styled(Box)({
    background: 'linear-gradient(167.96deg, #F4F9FF 0%, #E0EDFB 100%)',
});

const StyledGiftImage = styled('img')({
    width: '75px',
    height: '75px',
    objectFit: 'cover',
});

const StyledImageWrapper = styled(Box)(({ theme }) => ({
    width: '75px',
    height: '75px',
    borderRadius: '50%',
    overflow: 'hidden',
    marginBottom: '10px',
    [theme.breakpoints.down('sm')]: {
        width: '75px',
        height: '75px',
    },
}));

const StyledPhotoImage = styled('img')(({ theme }) => ({
    width: '75px',
    height: '75px',
    [theme.breakpoints.down('md')]: {
        width: '75px',
        height: '75px',
    },
}));

const StyledButton = styled(Button)({
    maxWidth: '270px',
    width: '70%',
    margin: 'auto',
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
            <StyledWrapper zIndex={2}>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
                    Congratulations, you have successfully logged in!
                </Typography>

                <StyledGiftImage src="/gift.png" alt="Gift" />

                <StyledImageWrapper>
                    <StyledPhotoImage src="/photo.jpg" alt="Your Photo" />
                </StyledImageWrapper>

                <Typography variant="h5" sx={{ color: '#333' }}>
                    Hi, I am Oleksii Poletaiev
                </Typography>

                <Typography variant="h6" sx={{ color: '#333' }}>
                    Clario, I want to work with you! :)
                </Typography>

                <StyledButton onClick={handleLogout} variant="contained" color="primary">
                    Logout
                </StyledButton>
            </StyledWrapper>
        </StyledBox>
    );
}
