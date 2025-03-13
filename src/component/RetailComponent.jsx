import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RetailComponent = () => {
  const [retail, setRetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchRetail = async () => {
    try {
      console.log("Fetching data from API...");

      const response = await fetch("http://localhost:1337/api/retails?populate=*");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Retail API Response:", result);

      if (result?.data?.length > 0) {
        setRetail(result.data);
      } else {
        console.warn("⚠️ Data retail kosong atau tidak ditemukan");
      }
    } catch (error) {
      console.error("Error fetching retail:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRetail();
  }, []);

  const handleViewDetails = (id, name) => {
    const formattedName = name ? name.toLowerCase().replace(/\s+/g, "-") : "retail";
    navigate(`/MudaGroup/Retail/${formattedName}/${id}`);
  };

  return (
    <div className="flex flex-col items-center mt-10 mb-20 mx-[6rem]">
      <h1 className="text-2xl font-bold mb-12">RETAIL</h1>
      {loading ? (
        <p>Loading retail data...</p>
      ) : retail.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 w-full max-w-6xl">
          {retail.map((retailItem, index) => {
            console.log(`Retail Item ${index + 1}:`, retailItem);

            const { id, name, image } = retailItem || {};
            if (!name) {
              console.warn(`⚠️ Data name tidak ditemukan untuk item ID ${id}`);
              return null;
            }

            const imageUrl = image?.formats?.large?.url
              ? `http://localhost:1337${image.formats.large.url}`
              : "/default.jpg";

            return (
              <div key={id} className="bg-white rounded-lg shadow-lg p-5 text-center transform transition-transform duration-300 hover:scale-105">
                <img src={imageUrl} alt={name} className="w-full h-auto rounded-lg mb-4" />
                <h2 className="text-xl font-semibold mb-4">{name}</h2>
                <button 
                  className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-black transition-colors duration-300"
                  onClick={() => handleViewDetails(id, name)}
                >
                  Lihat Selengkapnya
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <p>Data retail tidak tersedia.</p>
      )}
    </div>
  );
};

export default RetailComponent;