import Timetable from '@/pages/Timetable/Timetable';
import { Route, Routes } from 'react-router';

const RoutingComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Timetable />} />
    </Routes>
  );
};

export default RoutingComponent;
