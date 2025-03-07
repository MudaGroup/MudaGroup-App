import heroLogo from "/public/img/LogoMudaGroup.png";


const Footer = () => {
  return (
    <>
      <div className="Footer-Component">
        <div className="container">
            <img src={heroLogo} alt="" />
            <h2 className="Footer-Component-Title">
                <p>MUDA </p> GROUP
            </h2>
            <p className="Footer-Component-Address">
            Jl. Joglo Raya, Ruko Taman Kebon Jeruk, Blok W3 No. 24, RT.12/03, Jakarta 11640 / Phone +62 / Fax +62
            </p>
        </div>
      </div>
      <div className="copyright-component">
        <p>copyright @2024 Muda Group, All right Reserved</p>
      </div>
    </>
  )
}

export default Footer
