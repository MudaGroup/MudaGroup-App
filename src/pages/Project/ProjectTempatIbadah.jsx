import { useState, useEffect } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const ProjectTempatIbadah = () => {
    const [status, setStatus] = useState("");
    const [location, setLocation] = useState("");
    const [productData, setProductData] = useState([]);
    const navigate = useNavigate();

    const API_BASE_URL = "http://localhost:1337";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/worship-places?populate=*`);
                const result = await response.json();

                console.log("API Response:", result);

                if (result.data) {
                    const formattedData = result.data.map((item) => {
                        return {
                            id: item.id,
                            name: item.name || "Tanpa Nama",
                            project_status: item.project_status || "Tidak Diketahui",
                            project_location: item.project_location || "Tidak Diketahui",
                            address: item.address || "Tidak Diketahui",
                            imageUrl: item.image?.url ? `http://localhost:1337${item.image.url}` : "",
                        };
                    });
                    
                    console.log("Formatted Data:", formattedData);
                    

                    console.log("Formatted Data:", formattedData);
                    setProductData(formattedData);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleStatusChange = (e) => setStatus(e.target.value);
    const handleLocationChange = (e) => setLocation(e.target.value);

    const uniqueStatuses = [...new Set(productData.map((product) => product.project_status))];
    const uniqueLocations = [...new Set(productData.map((product) => product.project_location))];

    const filteredProducts = productData.filter((product) => {
        const statusMatch = status ? product.project_status === status : true;
        const locationMatch = location ? product.project_location === location : true;
        return statusMatch && locationMatch;
    });

    console.log("Filtered Products:", filteredProducts);

    const handleButtonClick = (id, name) => {
        if (!name) {
            console.error("Error: Nama produk tidak tersedia!");
            return;
        }

        const formattedName = name.toLowerCase().replace(/\s+/g, "-");
        console.log(`Navigating to: /GeneralContractor/TempatIbadah/${formattedName}/${id}`);

        navigate(`/GeneralContractor/TempatIbadah/${formattedName}/${id}`);
    };

    return (
        <div className="General-Contractor-Kandang container">
            <a href="/GeneralContractor" className="btn-back-General-Contractor">
                <IoMdArrowRoundBack />
            </a>
            <h1 className="General-Contractor-Kandang-title">Project Tempat Ibadah</h1>

            <div className="General-Contractor-Kandang-Category">
                <div className="Category-Status">
                    <select id="status" value={status} onChange={handleStatusChange}>
                        <option value="">Semua</option>
                        {uniqueStatuses.map((statusItem, index) => (
                            <option key={index} value={statusItem}>
                                {statusItem}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="Category-Location">
                    <select id="location" value={location} onChange={handleLocationChange}>
                        <option value="">Semua</option>
                        {uniqueLocations.map((locationItem, index) => (
                            <option key={index} value={locationItem}>
                                {locationItem}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="General-Contractor-Kandang-Card">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <button
                            key={product.id}
                            onClick={() => handleButtonClick(product.id, product.name)}
                        >
                            {product.imageUrl ? (
                                <img src={product.imageUrl} alt={product.name} style={{ width: "100%", height: "auto" }} />
                            ) : (
                                <p>Gambar tidak tersedia</p>
                            )}
                            <h2>{product.name}</h2>
                        </button>
                    ))
                ) : (
                    <p>Data tidak ditemukan</p>
                )}
            </div>
        </div>
    );
};

export default ProjectTempatIbadah;