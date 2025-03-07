import { IoMdArrowRoundBack } from 'react-icons/io';
import { useParams, useNavigate } from 'react-router-dom';
import "./Project.css";
import { useEffect, useState } from 'react';

const Gedung = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:1337/api/buildings?populate=*`);
        const data = await response.json();
        const filteredProduct = data.data.find(item => item.id.toString() === id);
        setProduct(filteredProduct);
      } catch (error) {
        console.error("Error fetching cage:", error);
      }
    };

    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return <p>Produk tidak ditemukan</p>;
  }

  // ✅ Perbaikan cara mengambil URL gambar
  const imageUrl = product.image?.url 
    ? `http://localhost:1337${product.image.url}` 
    : "default.jpg";

  return (
    <div className="Page-Kandang container">
      <button onClick={() => navigate(-1)} className='btn-back-General-Contractor'>
        <IoMdArrowRoundBack />
      </button>

      <div className="Detail-Page-Kandang">
        <img src={imageUrl} alt={product.name} />
        <div className="Desc-Page-Kandang">
          <h2 className='Title-Desc-Kandang'>{product.name}</h2>
          
          {/* ✅ Perbaikan cara menampilkan deskripsi */}
          <p className="Desc-Page-Kandang">
            {product.desc?.map((item, index) => (
              <span key={index}>
                {item.children?.map(child => child.text).join(" ")}
              </span>
            ))}
          </p>

          <p className="Address-Page-Kandang">Alamat: {product.address}</p>
        </div>
      </div>
    </div>
  );
};

export default Gedung;