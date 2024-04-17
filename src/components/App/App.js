import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Wrapper from '../Wrapper/Wrapper';
import './App.scss';
import TodayPage from '../Pages/Today/Today';
import AllTasks from '../Pages/AllTask.jsx/AllTasks';

function App() {
  return (
    <BrowserRouter>
      <Wrapper>
        <Routes>
          <Route path="/" element={<TodayPage />}></Route>
          <Route path="/all" element={<AllTasks />}></Route>
        </Routes>
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;
