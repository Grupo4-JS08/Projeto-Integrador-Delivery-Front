import { Route, Routes } from 'react-router-dom'
import './App.css'
import FooterInfo from './componets/footerinfo/FooterInfo'
import NavBar from './componets/navbar/NavBar'
import Home from './pages/home/Home'
import Footer from './componets/footer/Footer'

function App() {

  return (
    <>
      <NavBar/>
       <div className="min-h-[80vh]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
            </Routes>
      <FooterInfo/>
      <Footer/>
      </div>
    </>
  )
}

export default App
