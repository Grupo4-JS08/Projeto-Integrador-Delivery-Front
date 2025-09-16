
function FooterInfo() {
  return (
    <section className="container mx-auto mt-12 space-y-8">
      
      {/* Parte do Mapa */}
      <div className="relative rounded-lg overflow-hidden shadow-lg">
        {/* Iframe do Google Maps */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1982.209620914366!2d-0.123!3d51.507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604b3e0b6!2sMcDonald%E2%80%99s!5e0!3m2!1sen!2suk!4v1694512345678!5m2!1sen!2suk"
          width="100%"
          height="400"
          style={{ border: 0 }}
          
          loading="lazy"
          className="w-full h-96"
        ></iframe>

        {/* Card por cima do mapa */}
        <div className="absolute top-25 left-6 bg-[#7E8C54] text-white p-10 rounded-lg shadow-lg w-70">
          <h3 className="font-bold text-lg">DevLivery</h3>
          <p className="mt-2 text-sm">
            AV. Brigadeiro Faria Lima, 10 - São Paulo - SP
          </p>
          <p className="mt-7 text-sm">
            <span className="font-bold">Número de Telefone: </span>(11) 91234-5678
          </p>
        </div>
      </div>
    </section>
  );
}

export default FooterInfo;
