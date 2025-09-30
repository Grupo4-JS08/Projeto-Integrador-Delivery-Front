// /* eslint-disable @typescript-eslint/no-unused-vars */

// import { useContext, useState } from "react";
// import { FaShoppingCart } from "react-icons/fa";
// import { AuthContext } from "../../contexts/AuthContext";
// import { Link } from "react-router-dom";
// import NavBarSearch from "./NavBarSearch";
// import type Produto from "../../models/Produto";


// function NavBar2() {
//   const { usuario, handleLogout } = useContext(AuthContext);
//   const [searchResults, setSearchResults] = useState<Produto[]>([]);
//   const [searchObjective, setSearchObjective] = useState("");

//   const handleSearchResults = (produtos: Produto[], objetivo: string) => {
//     setSearchResults(produtos);
//     setSearchObjective(objetivo);

//     // Aqui você pode redirecionar para uma página de resultados ou exibir os resultados de outra forma
//     console.log(`Produtos encontrados para ${objetivo}:`, produtos);

//     // Exemplo: redirecionar para página de resultados
//     // window.location.href = `/produtos?objetivo=${objetivo}`;
//   };

//   return (
//     <div className="mt-2">
//       {/* Use container para ter a mesma largura dos cards */}
//       <div className="flex items-stretch container mx-auto rounded-lg overflow-hidden">

//         {/* Bloco branco do logo */}
//         <div className="bg-white flex items-center justify-center px-4">
//           <Link to={"/home2"}>
//             <img src="/logo.png" alt="DevLivery Logo" className="h-16" />
//           </Link>
//         </div>

//         {/* Bloco verde da navbar */}
//         <div className="bg-[#7E8C54] flex items-center justify-between flex-1 px-8 gap-6">

//           {/* Botão Olá Fulano ou Login */}
//           {usuario && usuario.token ? (
//             <>
//               <div className="px-6 py-2 bg-[#FFF5DC] text-black rounded-full text-base font-semibold shadow">
//                 Olá {usuario.nome}
//               </div>
//               <button
//                 onClick={handleLogout}
//                 className="px-6 py-2 bg-[#FFF5DC] text-black rounded-full text-base font-semibold shadow hover:opacity-90"
//               >
//                 Sair
//               </button>
//             </>
//           ) : (
//             <button
//               onClick={() => (window.location.href = "/home")}
//               className="px-6 py-2 bg-[#FFF5DC] text-black rounded-full text-base font-semibold shadow hover:opacity-90"
//             >
//               Login
//             </button>
//           )}

//           {/* Categorias substituída pelo campo de pesquisa por objetivo */}
//           <NavBarSearch onSearchResults={handleSearchResults} />

//           <Link to="/carrinho">
//             <FaShoppingCart className="text-white text-2xl cursor-pointer hover:scale-110 transition" />
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default NavBar2;
