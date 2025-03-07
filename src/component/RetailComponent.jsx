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
      console.log("Retail API Response:", result); // Debugging

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
    <div className="container Retail-component-page">
      <div className="Retail-component-title">
        <h1>RETAIL</h1>
      </div>
      {loading ? (
        <p>Loading retail data...</p>
      ) : retail.length > 0 ? (
        <div className="Retail-component-list">
          {retail.map((retailItem, index) => {
            console.log(`Retail Item ${index + 1}:`, retailItem); // Debugging

            const { id, name, image } = retailItem || {};
            if (!name) {
              console.warn(`⚠️ Data name tidak ditemukan untuk item ID ${id}`);
              return null;
            }

            // Cek apakah ada image dan apakah memiliki format yang besar
            const imageUrl = image?.formats?.large?.url
              ? `http://localhost:1337${image.formats.large.url}`
              : "/default.jpg";

            return (
              <div key={id} className="Retail-component-card">
                <img src={imageUrl} alt={name} />
                <h2>{name}</h2>
                <button onClick={() => handleViewDetails(id, name)}>Lihat Selengkapnya</button>
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