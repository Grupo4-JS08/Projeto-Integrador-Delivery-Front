import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="w-full bg-white shadow-sm">
      <div className="container mx-auto flex justify-between items-center py-2 px-6">
        
        {/* LOGO */}
        <Link to="/home" className="flex items-center space-x-2">
          <img 
            src="/logo.png" 
            alt="Logo DevLivery" 
            className="h-25 w-auto"
          />
        </Link>

        {/* MENU */}
        <div className="flex items-center space-x-6">
          {/* Ofertas + Contato (pill group) */}
          <div className="flex rounded-full overflow-hidden border border-gray-200">
            <Link 
              to="/ofertas" 
              className="px-4 py-2 bg-[#7E8C54] text-black font-semibold text-sm hover:opacity-90 transition rounded-l-full text-center"
            >
              Ofertas
            </Link>
            <Link 
              to="/contato" 
              className="px-4 py-2 bg-[#FFF5DC] text-black font-semibold text-sm hover:opacity-90 transition rounded-full -ml-4"
            >
              Contato
            </Link>
          </div>

          {/* Login */}
          <Link 
            to="/login" 
            className="flex items-center space-x-2 px-5 py-2 rounded-full bg-[#FF9800] text-black font-semibold text-sm hover:opacity-90 transition"
          >
            <FaUser />
            <span>Login</span>
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
