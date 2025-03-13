import { IoMdArrowRoundBack } from 'react-icons/io';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Kandang = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:1337/api/cages?populate=*`);
        const data = await response.json();
        const filteredProduct = data.data.find(item => item.id.toString() === id);
        setProduct(filteredProduct);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return <p className="text-center text-gray-500">Produk tidak ditemukan</p>;
  }

  const imageUrl = product.image?.url 
    ? `http://localhost:1337${product.image.url}` 
    : "default.jpg";

  return (
    <div className="mx-[6rem] pt-12 pb-8">
      <button onClick={() => navigate(-1)} className='inline-flex items-center p-3 bg-gray-200 rounded-full text-gray-700 text-2xl mb-5 hover:bg-gray-300'>
        <IoMdArrowRoundBack />
      </button>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
        <img src={imageUrl} alt={product.name} className="w-full h-[24rem] object-cover md:w-1/2 max-w-lg rounded-lg" />
        <div className="w-full md:w-1/2">
          <h2 className='text-2xl font-bold mb-4'>{product.name}</h2>
          <p className="text-gray-600 mb-4">
            {product.desc?.map((item, index) => (
              <span key={index}>
                {item.children?.map(child => child.text).join(" ")}
              </span>
            ))}
          </p>
          <p className="text-gray-800 font-semibold">Alamat: {product.address}</p>
        </div>
      </div>
    </div>
  );
};

export default Kandang;