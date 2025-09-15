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
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

        <div>
          <img src="/LogoDevLivery.png" alt="DevLivery Logo" className="w-32 mb-4" />
            <a href="#">
              <img src="/gpas.png" alt="Download on the App Store & Google Play" className="h-9" />
            </a>

          <p className="text-xs mt-4">
            Company # 490039-445, Registered with House of companies.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Receba nossas novidades por e-mail</h3>
          <form className="flex rounded-full overflow-hidden shadow-sm">
            <input
              type="email"
              placeholder="youremail@gmail.com"
              className="px-4 py-2 flex-1 outline-none text-sm"
            />
            <button
              type="submit"
              className="bg-[#758250] text-white px-4 py-2 text-sm font-semibold"
            >
              Subscribe
            </button>
          </form>
          <p className="text-xs mt-1">
            we won’t spam, read our{' '}
            <a href="#" className="underline">
              email policy
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
          <h3 className="font-semibold mb-2">Legal Pages</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="#" className="hover:underline">Terms and conditions</a></li>
            <li><a href="#" className="hover:underline">Privacy</a></li>
            <li><a href="#" className="hover:underline">Cookies</a></li>
            <li><a href="#" className="hover:underline">Modern Slavery Statement</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Important Links</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="#" className="hover:underline">Get help</a></li>
            <li><a href="#" className="hover:underline">Add your restaurant</a></li>
            <li><a href="#" className="hover:underline">Sign up to deliver</a></li>
            <li><a href="#" className="hover:underline">Create a business account</a></li>
          </ul>
        </div>
      </div>

      <div className="bg-[#758250] text-white text-center py-4 text-sm">
        Order.uk Copyright 2024, All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
