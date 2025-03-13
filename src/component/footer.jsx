import heroLogo from "/public/img/LogoMudaGroup.png";

const Footer = () => {
  return (
    <>
      <div className="bg-gray-900 py-10 shadow-md">
        <div className="flex flex-col items-center">
          <img src={heroLogo} alt="Logo Muda Group" className="w-24 mb-5" />
          <h2 className="text-white text-xl font-bold flex items-center">
            <p className="text-yellow-600 mr-1">MUDA</p> GROUP
          </h2>
          <p className="text-white text-xs text-center max-w-md">
            Jl. Joglo Raya, Ruko Taman Kebon Jeruk, Blok W3 No. 24, RT.12/03, Jakarta 11640 / Phone +62 / Fax +62
          </p>
        </div>
      </div>
      <div className="text-center text-xs py-2">
        <p>© 2024 Muda Group, All Rights Reserved</p>
      </div>
    </>
  );
};

export default Footer;