import React from 'react';
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaSnapchatGhost,
} from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#FDF8EB] text-gray-800">
      <div className="max-w-8xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

        <div>
          <img src="/LogoDevLivery.png" alt="DevLivery Logo" className="w-40" />
          <a href="#">
            <img src="" alt="" className="" />
          </a>

          <p className="text-xs mt-4">
            Empresa nº 490039-445, Registrada na Junta Comercial.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Receba nossas novidades por e-mail</h3>
          <form className="flex rounded-full overflow-hidden shadow-sm">
            <input
              type="email"
              placeholder="seuemail@email.com"
              className="px-4 py-2 flex-1 outline-none text-sm"
            />
            <button
              type="submit"
              className="bg-[#758250] text-white px-4 py-2 text-sm font-semibold"
            >
              Inscrever-se
            </button>
          </form>
          <p className="text-xs mt-1">
            Não se preocupe, não enviaremos spam. Leia nossa{' '}
            <a href="#" className="underline">
              política de e-mail
            </a>
          </p>
          <div className="flex space-x-4 mt-4 text-xl text-black">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTiktok /></a>
            <a href="#"><FaSnapchatGhost /></a>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Páginas Legais</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="#" className="hover:underline">Termos e Condições</a></li>
            <li><a href="#" className="hover:underline">Privacidade</a></li>
            <li><a href="#" className="hover:underline">Cookies</a></li>
            <li><a href="#" className="hover:underline">Declaração de Conformidade</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Links Importantes</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="#" className="hover:underline">Obter ajuda</a></li>
            <li><a href="#" className="hover:underline">Adicione seu restaurante</a></li>
            <li><a href="#" className="hover:underline">Cadastre-se para entregar</a></li>
            <li><a href="#" className="hover:underline">Criar uma conta comercial</a></li>
          </ul>
        </div>
      </div>

      <div className="bg-[#758250] text-white text-center py-4 text-sm">
        Order.uk Copyright 2024, Todos os Direitos Reservados.
      </div>

    </footer>
  );
};

export default Footer;