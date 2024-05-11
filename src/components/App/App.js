import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import TodayPage from '../Pages/Today/Today';
import AllTasks from '../Pages/AllTask/AllTasks';
import StartPage from '../Pages/StartPage/StartPage';
import Week from '../Pages/Week/Week';

import Signup from '../Pages/Signup/Signup';
import Login from '../Pages/Login/Login';
import ProtectedRoute from './ProtectedRoute';
import List from '../Pages/List/List';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/today" element={<TodayPage />} />
          <Route path="/week" element={<Week />} />
          <Route path="/all" element={<AllTasks />} />
          <Route path="/lists/:id" element={<List />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
