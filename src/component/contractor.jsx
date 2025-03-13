import heroImage1 from "../../public/img/LogoMudaGroup.png";

export const Contractor = () => {
  return (
    <div className="relative justify-center text-center p-10 w-full h-full bg-white bg-cover bg-center bg-no-repeat text-white" style={{ backgroundImage: "url('/public/img/Dummy/Dummy2opacity.png')" }}>
      <h1 className="text-2xl font-bold text-black mb-12 opacity-100">
        GENERAL CONTRACTOR
      </h1>
      <a href="/GeneralContractor" className="flex justify-center">
        <img src={heroImage1} alt="Logo Muda Group" className="max-w-[40%] h-auto rounded-lg mt-8 mb-8" />
      </a>
    </div>
  );
};
