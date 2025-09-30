import Weather from '@pages/Weather/Weather';
import Home from '@pages/Home/Home';
import ApiTestPage from '@/pages/ApiTestPage/ApiTestPage';
import { Route, Routes } from 'react-router';
import Administration from '@/pages/Administration/Administration';

const RoutingComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/weather" element={<Weather />} />
      <Route path="/apitest" element={<ApiTestPage />} />
      <Route path="/administration" element={<Administration />} />
    </Routes>
  );
};

export default RoutingComponent;
