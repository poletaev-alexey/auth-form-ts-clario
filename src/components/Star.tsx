import { useEffect, useState } from 'react';

const Star = () => {
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [size, setSize] = useState(10);

    useEffect(() => {
        const top = Math.floor(Math.random() * 80);
        const left = Math.floor(Math.random() * 80);
        const randomSide = Math.floor(Math.random() * (30 - 10 + 1)) + 10;
        setPosition({ top, left });
        setSize(randomSide);
    }, []);

    return (
        <img
            src="/star.svg"
            alt="star"
            style={{
                position: 'absolute',
                top: `${position.top}%`,
                left: `${position.left}%`,
                width: `${size}px`,
                height: `${size}px`,
                zIndex: 0,
            }}
        />
    );
};

export default Star;
