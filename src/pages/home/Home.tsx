import { FaSearch, FaShoppingCart } from "react-icons/fa";

function Home() {
    return (
        <div className="w-full">
            {/* BANNER */}
            <section className="container mx-auto mt-6">
                <div className="relative bg-[#7E8C54] flex flex-col md:flex-row items-center justify-between p-6 rounded-lg text-white shadow-md overflow-hidden">

                    {/* Imagem de fundo quase transparente */}
                    <img
                        src="/comida.jpg"
                        alt="Fundo"
                        className="absolute inset-0 w-full h-full object-cover opacity-20 rounded-lg"
                    />

                    {/* Texto */}
                    <div className="relative z-10 mb-4 md:mb-0">
                        <h2 className="text-3xl font-bold mb-4 text-orange-500">Mais pedido</h2>
                        <div className="flex flex-wrap gap-3">
                            <button className="px-4 py-2 bg-white text-gray-900 rounded-full text-sm shadow hover:opacity-90">
                                Receba nossas novidades
                            </button>
                            <button className="px-4 py-2 bg-white text-gray-900 rounded-full text-sm shadow hover:opacity-90">
                                Delivery em 20-25 min
                            </button>
                        </div>
                    </div>

                    {/* Imagem + Avaliação */}
                    <div className="relative z-10">
                        <img
                            src="/comida.jpg"
                            alt="Prato"
                            className="w-125 h-50 object-cover rounded-lg"
                        />
                        <img
                            src="/avalicao.png"
                            alt="Avaliação"
                            className="absolute bottom-2 left-2 w-17 h-auto rounded shadow"
                        />
                    </div>
                </div>
            </section>

            {/* SEÇÃO PRODUTOS */}
            <section className="container mx-auto mt-8">
                {/* Título + Pesquisa */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Veja nossos produtos</h2>
                    <div className="relative mt-2 md:mt-0">
                        <input
                            type="text"
                            placeholder="Pesquisar"
                            className="pl-10 pr-4 py-2 border border-gray-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF9800]"
                        />
                        <FaSearch className="absolute left-3 top-3 text-gray-400" />
                    </div>
                </div>

                {/* Barra Verde */}
                <div className="bg-[#7E8C54] flex items-center justify-between px-8 py-4 rounded">
                    {/* Botão Contato */}
                    <button className="px-6 py-2 bg-[#FFF5DC] text-black rounded-full text-base font-semibold shadow hover:opacity-90">
                        Contato
                    </button>

                    {/* Categorias */}
                    <span className="text-white font-semibold text-lg flex-1 text-center">
                        Lanches Saudáveis · Marmitas Fit · Sucos
                    </span>

                    <div className="bg-[#7E8C54] p-2 rounded-full flex items-center justify-center">
                        <FaShoppingCart className="text-white text-2xl cursor-pointer hover:scale-110 transition" />
                    </div>
                </div>
            </section>

            {/* SEÇÃO CARDS DE PROMOÇÕES */}
            <section className="container mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 1 */}
                <a href="/promocoes" className="relative rounded-lg overflow-hidden shadow hover:scale-105 transition block">
                    <img
                        src="/saudavel02.jpg"
                        alt="Mais promoções"
                        className="w-full h-56 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-4 text-white">
                        <span className="text-sm">Aproveite nossas promoções parceiras</span>
                        <h3 className="font-bold text-lg">Mais promoções</h3>
                    </div>
                    <span className="absolute top-2 right-2 bg-[#7E8C54] text-white text-xs px-2 py-1 rounded">-20%</span>
                </a>

                {/* Card 2 */}
                <a href="/vegan" className="relative rounded-lg overflow-hidden shadow hover:scale-105 transition block">
                    <img
                        src="/lanche01.jpg"
                        alt="Comidas veganas"
                        className="w-full h-56 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-4 text-white">
                        <span className="text-sm">Aqui você encontra</span>
                        <h3 className="font-bold text-lg">Comidas veganas</h3>
                    </div>
                    <span className="absolute top-2 right-2 bg-[#7E8C54] text-white text-xs px-2 py-1 rounded">-20%</span>
                </a>

                {/* Card 3 */}
                <a href="/detox" className="relative rounded-lg overflow-hidden shadow hover:scale-105 transition block">
                    <img
                        src="/promo3.jpg"
                        alt="Linha Detox"
                        className="w-full h-56 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-4 text-white">
                        <span className="text-sm">Sempre o melhor para você</span>
                        <h3 className="font-bold text-lg">Conheça nossa linha Detox</h3>
                    </div>
                    <span className="absolute top-2 right-2 bg-[#7E8C54] text-white text-xs px-2 py-1 rounded">-100%</span>
                </a>
            </section>

            {/* SEÇÃO LANCHES */}
            <section className="container mx-auto mt-12">
                <h2 className="text-2xl font-bold text-orange-500 mb-6">Lanches</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {/* Card Produto */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition cursor-pointer">
                        <div className="flex justify-between p-4">
                            <div>
                                <h3 className="font-bold text-lg">Produto</h3>
                                <p className="text-sm text-gray-600">Descrição</p>
                                <span className="font-bold text-gray-900 mt-2 block">Valor</span>
                            </div>
                            <img
                                src="/lanche01.jpg"
                                alt="Produto"
                                className="w-30 h-35 object-cover rounded"
                            />
                        </div>
                    </div>

                    {/* Outro Produto */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition cursor-pointer">
                        <div className="flex justify-between p-4">
                            <div>
                                <h3 className="font-bold text-lg">Produto</h3>
                                <p className="text-sm text-gray-600">Descrição</p>
                                <span className="font-bold text-gray-900 mt-2 block">Valor</span>
                            </div>
                            <img
                                src="/lanche02.jpg"
                                alt="Produto"
                                className="w-30 h-35 object-cover rounded"
                            />
                        </div>
                    </div>

                    {/* Card com ícone do carrinho */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition cursor-pointer">
                        <div className="flex justify-between p-4">
                            <div>
                                <h3 className="font-bold text-lg">Produto</h3>
                                <p className="text-sm text-gray-600">Descrição</p>
                                <span className="font-bold text-gray-900 mt-2 block">Valor</span>
                            </div>
                            <div className="relative">
                                <img
                                    src="/lanche03.jpg"
                                    alt="Produto"
                                    className="w-30 h-35 object-cover rounded"
                                />
                                <FaShoppingCart className="absolute bottom-2 right-2 text-[#FF9800] text-xl" />
                            </div>
                        </div>
                    </div>
                      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition cursor-pointer">
                        <div className="flex justify-between p-4">
                            <div>
                                <h3 className="font-bold text-lg">Produto</h3>
                                <p className="text-sm text-gray-600">Descrição</p>
                                <span className="font-bold text-gray-900 mt-2 block">Valor</span>
                            </div>
                            <img
                                src="/lanche02.jpg"
                                alt="Produto"
                                className="w-30 h-35 object-cover rounded"
                            />
                        </div>
                    </div>
                      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition cursor-pointer">
                        <div className="flex justify-between p-4">
                            <div>
                                <h3 className="font-bold text-lg">Produto</h3>
                                <p className="text-sm text-gray-600">Descrição</p>
                                <span className="font-bold text-gray-900 mt-2 block">Valor</span>
                            </div>
                            <img
                                src="/lanche02.jpg"
                                alt="Produto"
                                className="w-30 h-35 object-cover rounded"
                            />
                        </div>
                    </div>
                      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition cursor-pointer">
                        <div className="flex justify-between p-4">
                            <div>
                                <h3 className="font-bold text-lg">Produto</h3>
                                <p className="text-sm text-gray-600">Descrição</p>
                                <span className="font-bold text-gray-900 mt-2 block">Valor</span>
                            </div>
                            <img
                                src="/lanche02.jpg"
                                alt="Produto"
                                className="w-30 h-35 object-cover rounded"
                            />
                        </div>
                    </div>
                      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition cursor-pointer">
                        <div className="flex justify-between p-4">
                            <div>
                                <h3 className="font-bold text-lg">Produto</h3>
                                <p className="text-sm text-gray-600">Descrição</p>
                                <span className="font-bold text-gray-900 mt-2 block">Valor</span>
                            </div>
                            <img
                                src="/lanche02.jpg"
                                alt="Produto"
                                className="w-30 h-35 object-cover rounded"
                            />
                        </div>
                    </div>
                      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition cursor-pointer">
                        <div className="flex justify-between p-4">
                            <div>
                                <h3 className="font-bold text-lg">Produto</h3>
                                <p className="text-sm text-gray-600">Descrição</p>
                                <span className="font-bold text-gray-900 mt-2 block">Valor</span>
                            </div>
                            <img
                                src="/lanche02.jpg"
                                alt="Produto"
                                className="w-30 h-35 object-cover rounded"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* SEÇÃO SAUDÁVEIS */}
            <section className="container mx-auto mt-12">
                <h2 className="text-2xl font-bold text-orange-500 mb-6">Saudáveis</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {/* Card Saudável */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition cursor-pointer">
                        <img
                            src="/saudavel02.jpg"
                            alt="Produto Saudável"
                            className="w-full h-50 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="font-bold text-lg">Nome da Comida</h3>
                            <p className="text-sm text-gray-600">
                                Comentario
                            </p>
                            <span className="font-bold text-gray-900 mt-2 block">Não sei</span>
                        </div>
                    </div>

                    {/* Outro exemplo */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition cursor-pointer">
                        <img
                            src="/saudavel01.jpg"
                            alt="Produto Saudável"
                            className="w-full h-50 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="font-bold text-lg">Nome da comida</h3>
                            <p className="text-sm text-gray-600">
                                Comentario
                            </p>
                            <span className="font-bold text-gray-900 mt-2 block">Não sei</span>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition cursor-pointer">
                        <img
                            src="/saudavel01.jpg"
                            alt="Produto Saudável"
                            className="w-full h-50 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="font-bold text-lg">Nome da comida</h3>
                            <p className="text-sm text-gray-600">
                                Comentario
                            </p>
                            <span className="font-bold text-gray-900 mt-2 block">Não sei</span>
                        </div>
                    </div>
                      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition cursor-pointer">
                        <img
                            src="/saudavel01.jpg"
                            alt="Produto Saudável"
                            className="w-full h-50 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="font-bold text-lg">Nome da comida</h3>
                            <p className="text-sm text-gray-600">
                                Comentario
                            </p>
                            <span className="font-bold text-gray-900 mt-2 block">Não sei</span>
                        </div>
                    </div>
                </div>
            </section>

                {/* SEÇÃO BEBIDAS */}
            <section className="container mx-auto mt-12">
                <h2 className="text-2xl font-bold text-orange-500 mb-6">Bebidas</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {/* Bebida 01 */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition cursor-pointer">
                        <img
                            src="/coca.jpg"
                            alt="Produto Saudável"
                            className="w-full h-70 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="font-bold text-lg">Nome da Comida</h3>
                            <p className="text-sm text-gray-600">
                                Comentario
                            </p>
                            <span className="font-bold text-gray-900 mt-2 block">Não sei</span>
                        </div>
                    </div>

                    {/* Bebida 02 */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition cursor-pointer">
                        <img
                            src="/manga.jpg"
                            alt="Produto Saudável"
                            className="w-full h-70 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="font-bold text-lg">Nome da comida</h3>
                            <p className="text-sm text-gray-600">
                                Comentario
                            </p>
                            <span className="font-bold text-gray-900 mt-2 block">Não sei</span>
                        </div>
                    </div>

                     {/* Bebida 03*/}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition cursor-pointer">
                        <img
                            src="/milk.jpg"
                            alt="Produto Saudável"
                            className="w-full h-70 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="font-bold text-lg">Nome da comida</h3>
                            <p className="text-sm text-gray-600">
                                Comentario
                            </p>
                            <span className="font-bold text-gray-900 mt-2 block">Não sei</span>
                        </div>
                    </div>

                     {/* Bebida 04 */}
                      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition cursor-pointer">
                        <img
                            src="/laranja.jpg"
                            alt="Produto Saudável"
                            className="w-full h-70 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="font-bold text-lg">Nome da comida</h3>
                            <p className="text-sm text-gray-600">
                                Comentario
                            </p>
                            <span className="font-bold text-gray-900 mt-2 block">Não sei</span>
                        </div>
                    </div>
                </div>
            </section>
            <h1>fim</h1>
        </div>
    );
}

export default Home;
