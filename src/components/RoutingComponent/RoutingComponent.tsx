import Weather from '@pages/Weather/Weather';
import Home from '@pages/Home/Home';
import ApiTestPage from '@/pages/ApiTestPage/ApiTestPage';
import { Route, Routes } from 'react-router';
import Timetable from '@/pages/Timetable/Timetable';

const RoutingComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Timetable />} />
    </Routes>
  );
};

export default RoutingComponent;
