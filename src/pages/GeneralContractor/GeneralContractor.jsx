import { IoMdArrowRoundBack } from 'react-icons/io'

const GeneralContractor = () => {
  return (
    <>
      <div className="General-Contractor-Page container">
        <a href="/" className='btn-back-General-Contractor'>
        <IoMdArrowRoundBack />
        </a>
        <div className="General-Contractor-Card">
            <a href='/GeneralContractor/Kandang'>
                <img src="../../../public/img/LogoMudaGroup.png" alt="" />
            </a>
            <a href='/GeneralContractor/TempatIbadah'>
                <img src="../../../public/img/LogoMudaGroup.png" alt="" />
            </a>
            <a href='/GeneralContractor/Gedung'>
                <img src="../../../public/img/LogoMudaGroup.png" alt="" />
            </a>
        </div>
      </div>
    </>
  )
}

export default GeneralContractor
