
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import animationData from '../assets/animation.json';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/menu');
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#000',
        overflow: 'hidden',
      }}
    >
      <Lottie
        animationData={animationData}
        loop={false}
        style={{
          width: '100vw',
          height: '100vh',
        }}
        rendererSettings={{
          preserveAspectRatio: 'xMidYMid slice', // 🔥 this makes the animation cover the screen like CSS background-size: cover
        }}
      />
    </div>
  );
};

export default SplashScreen;
