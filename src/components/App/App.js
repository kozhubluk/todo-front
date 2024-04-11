import { BrowserRouter } from 'react-router-dom';
import Wrapper from '../Wrapper/Wrapper';
import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <Wrapper>
        <div className="test"></div>
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;
