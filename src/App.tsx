import { Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './componets/navbar/NavBar';
import Home from './pages/home/Home';
import Produtos from './pages/produtos/Produtos';
// import Categorias from './pages/categorias/Categorias';
import Footer from './componets/footer/Footer';
import Contato from './pages/contato/Contato';
function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Navbar />
        <div className="min-h-[80vh]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/produtos" element={<Produtos />} />
            {/* <Route path="/categorias" element={<Categorias />} /> */}
            <Route path="/ofertas" element={<Home />} />
            <Route path="/contato" element={<Contato />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
