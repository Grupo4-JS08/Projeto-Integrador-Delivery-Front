import React from 'react';
import { FaUser, FaUserPlus } from 'react-icons/fa';

type ModalLoginProps = {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
  onRegisterClick: () => void;
};

const ModalLogin: React.FC<ModalLoginProps> = ({
  isOpen,
  onClose,
  onLoginClick,
  onRegisterClick,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
      <div className="relative bg-white rounded-xl p-6 max-w-md w-full shadow-lg">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-[#0F172A] rounded-full w-8 h-8 flex items-center justify-center text-lg"
        >
          &times;
        </button>

        <div className="flex justify-center mb-6">
          <img src="/LogoDevLivery.png" alt="DevLivery Logo" className="w-40" />
        </div>

        <button
          onClick={onLoginClick}
          className="flex items-center justify-center w-full bg-[#758250] hover:bg-[#606f3d] text-white font-semibold py-3 rounded-full text-lg transition mb-4"
        >
          <FaUser className="mr-2" />
          Login
        </button>

        <button
          onClick={onRegisterClick}
          className="flex items-center justify-center w-full bg-[#FDF2C3] hover:bg-[#fbe9a1] text-[#1E1E1E] font-semibold py-3 rounded-full text-lg transition mb-4"
        >
          <FaUserPlus className="mr-2" />
          Cadastrar
        </button>

        <div className="text-center">
          <a href="#" className="text-sm text-[#1E1E1E] underline hover:text-orange-600">
            Esqueci a senha
          </a>
        </div>
      </div>
    </div>
  );
};

export default ModalLogin;
