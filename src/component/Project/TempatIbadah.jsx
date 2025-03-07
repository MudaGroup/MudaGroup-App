import { IoMdArrowRoundBack } from 'react-icons/io';
import { useParams, useNavigate } from 'react-router-dom';
import "./Project.css";
import { useEffect, useState } from 'react';

const TempatIbadah = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const response = await fetch(`http://localhost:1337/api/worship-places?populate=*`);
        const data = await response.json();
        const filteredPlace = data.data.find(item => item.id.toString() === id);
        setPlace(filteredPlace);
      } catch (error) {
        console.error("Error fetching place:", error);
      }
    };

    fetchPlace();
    window.scrollTo(0, 0);
  }, [id]);

  if (!place) {
    return <p>Tempat ibadah tidak ditemukan</p>;
  }

  // ✅ Perbaikan cara mengambil atribut dari API
  const { name, desc, address, image } = place;

  // ✅ Perbaikan cara mengambil URL gambar
  const imageUrl = image?.url 
    ? `http://localhost:1337${image.url}` 
    : "default.jpg";

  return (
    <div className="Page-Kandang container">
      <button onClick={() => navigate(-1)} className='btn-back-General-Contractor'>
        <IoMdArrowRoundBack />
      </button>

      <div className="Detail-Page-Kandang">
        <img src={imageUrl} alt={name} />
        <div className="Desc-Page-Kandang">
          <h2 className='Title-Desc-Kandang'>{name}</h2>
          
          {/* ✅ Perbaikan cara menampilkan deskripsi */}
          <p className="Desc-Page-Kandang">
            {desc?.map((item, index) => (
              <span key={index}>
                {item.children?.map(child => child.text).join(" ")}
              </span>
            ))}
          </p>

          <p className="Address-Page-Kandang">Alamat: {address}</p>
        </div>
      </div>
    </div>
  );
};

export default TempatIbadah;