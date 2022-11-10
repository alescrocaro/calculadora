import { Routes, Route, BrowserRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import Mean from './pages/mean';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Mean />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
