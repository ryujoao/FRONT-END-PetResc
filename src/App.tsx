import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Denuncie from './pages/denuncie';
import Nav from './components/navbar';
import Doar from './pages/doar';
import Adotar from './pages/adotar';
import Voluntarios from './pages/voluntarios';
import Footer from './components/footer';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/denuncie" element={<><Nav /><Denuncie /></>} />
        <Route path="/adotar" element={<><Nav /><Adotar /></>} />
        <Route path="/voluntarios" element={<><Nav /><Voluntarios /></>} />
        <Route path="/doar" element={<><Nav /><Doar /></>} />
        <Route path='footer' element={<Footer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;