import './App.css';
import Navbar from './components/Navbar';
import Profile from './Pages/Profile';
import About from './Pages/About';
import TechStack from './Pages/TechStack';
import Contact from './Pages/Contact';
import Projects from './Pages/Project';
import { useState, useEffect } from 'react';
import Loader from './components/Loader';
import AnimatedBackground from './components/AnimatedBackground';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // show loader for two seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatedBackground />
      <Loader loading={isLoading} />
      <Navbar />
      <Profile />
      <About />
      <TechStack />
      <Projects />
      <Contact />
    </>
  );
}

export default App;
