import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import TodayPage from '../Pages/Today/Today';
import AllTasks from '../Pages/AllTask/AllTasks';
import StartPage from '../Pages/StartPage/StartPage';
import Week from '../Pages/Week/Week';
import Login from '../Pages/Login/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<StartPage />} />
        <Route path="/today" element={<TodayPage />} />
        <Route path="/week" element={<Week />} />
        <Route path="/all" element={<AllTasks />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
