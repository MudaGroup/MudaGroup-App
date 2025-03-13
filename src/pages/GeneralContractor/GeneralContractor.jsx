import { IoMdArrowRoundBack } from "react-icons/io";

const GeneralContractor = () => {
  return (
    <div className="mx-[6rem] my-10">
      {/* Tombol kembali */}
      <a href="/" className="inline-flex items-center p-3 bg-gray-200 rounded-full text-gray-700 text-2xl mb-5 hover:bg-gray-300">
        <IoMdArrowRoundBack />
      </a>

      {/* Kartu General Contractor */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 justify-items-center">
        <a href="/GeneralContractor/Kandang" className="transition transform hover:scale-105">
          <img src="../../../public/img/LogoMudaGroup.png" alt="Kandang" className="w-full h-auto rounded-md" />
        </a>
        <a href="/GeneralContractor/TempatIbadah" className="transition transform hover:scale-105">
          <img src="../../../public/img/LogoMudaGroup.png" alt="Tempat Ibadah" className="w-full h-auto rounded-md" />
        </a>
        <a href="/GeneralContractor/Gedung" className="transition transform hover:scale-105">
          <img src="../../../public/img/LogoMudaGroup.png" alt="Gedung" className="w-full h-auto rounded-md" />
        </a>
      </div>
    </div>
  );
};

export default GeneralContractor;