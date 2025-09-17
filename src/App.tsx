import { Routes, Route, useLocation } from 'react-router-dom'; 
import Contato from './pages/contato/Contato';
import Home from './pages/home/Home';
import Produtos from './pages/produtos/Produtos';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './componets/navbar/NavBar';
import Footer from './componets/footer/Footer';
import Home2 from './pages/home/Home2';
import { CarrinhoProvider } from './contexts/CarrinhoContext';
import Carrinho from './pages/carrinho/Carrinho';

function App() {
  const location = useLocation(); 

  return (
    <AuthProvider>
      <div className="App">
        {location.pathname !== '/home2' && <Navbar />}

        <div className="min-h-[80vh]">
          <CarrinhoProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/home2" element={<Home2 />} />
            <Route path="/produtos" element={<Produtos />} />
            <Route path="/ofertas" element={<Home />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/carrinho" element={<Carrinho />} />
          </Routes>
          </CarrinhoProvider>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
