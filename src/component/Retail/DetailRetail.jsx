import { IoMdArrowRoundBack } from 'react-icons/io';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const DetailRetail = () => {
  const { id } = useParams(); // Mengambil id dan name dari URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:1337/api/retail/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
    window.scrollTo(0, 0); // Scroll ke atas saat halaman dibuka
  }, [id]);

  if (!product) {
    return <p>Produk tidak ditemukan</p>; // Jika produk tidak ditemukan
  }

  return (
    <div className="Page-Kandang container">
      <a href="/" className='btn-back-General-Contractor'>
        <IoMdArrowRoundBack />
      </a>
      <div className="Detail-Page-Kandang">
        <img src={product.url} alt={product.name} />
        <div className="Desc-Page-Kandang">
          <h2 className='Title-Desc-Kandang'>{product.name}</h2>
          <p className="Desc-Page-Kandang">{product.desc}</p>
          <p className="Address-Page-Kandang">Alamat : {product.address}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailRetail;
