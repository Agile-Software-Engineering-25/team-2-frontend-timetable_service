import Weather from '@pages/Weather/Weather';
import JoyColorShowcase from '@/pages/JoyColorShowcase/JoyColorShowcase';
import Home from '@pages/Home/Home';
import { Route, Routes } from 'react-router';

const RoutingComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/weather" element={<Weather />} />
      <Route path="/colors" element={<JoyColorShowcase />} />
    </Routes>
  );
};

export default RoutingComponent;
