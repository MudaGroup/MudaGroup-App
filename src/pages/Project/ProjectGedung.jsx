import { useState, useEffect } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const ProjectGedung = () => {
    const [status, setStatus] = useState("");
    const [location, setLocation] = useState("");
    const [productData, setProductData] = useState([]);
    const navigate = useNavigate();

    const API_BASE_URL = "http://localhost:1337";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/buildings?populate=*`);
                const result = await response.json();

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

    const handleButtonClick = (id, name) => {
        if (!name) {
            console.error("Error: Nama produk tidak tersedia!");
            return;
        }

        const formattedName = name.toLowerCase().replace(/\s+/g, "-");
        navigate(`/GeneralContractor/Gedung/${formattedName}/${id}`);
    };

    return (
        <div className="mx-[6rem] pt-12 pb-8">
            <a href="/GeneralContractor" className="inline-flex items-center p-3 bg-gray-200 rounded-full text-gray-700 text-2xl mb-5 hover:bg-gray-300">
                <IoMdArrowRoundBack />
            </a>
            <h1 className="text-3xl font-bold text-center my-6 text-gray-800">Project Gedung</h1>

            <div className="flex flex-wrap gap-4 justify-center mb-6">
                <select 
                    className="border rounded-lg p-2" 
                    value={status} 
                    onChange={handleStatusChange}
                >
                    <option value="">Semua Status</option>
                    {uniqueStatuses.map((statusItem, index) => (
                        <option key={index} value={statusItem}>{statusItem}</option>
                    ))}
                </select>

                <select 
                    className="border rounded-lg p-2" 
                    value={location} 
                    onChange={handleLocationChange}
                >
                    <option value="">Semua Lokasi</option>
                    {uniqueLocations.map((locationItem, index) => (
                        <option key={index} value={locationItem}>{locationItem}</option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <button 
                            key={product.id} 
                            onClick={() => handleButtonClick(product.id, product.name)}
                            className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center hover:shadow-lg transition border-solid border-2"
                        >
                            {product.imageUrl ? (
                                <img 
                                    src={product.imageUrl} 
                                    alt={product.name} 
                                    className="w-full h-48 object-cover rounded-md"
                                />
                            ) : (
                                <p className="text-gray-500">Gambar tidak tersedia</p>
                            )}
                            <h2 className="text-lg font-semibold mt-3">{product.name}</h2>
                        </button>
                    ))
                ) : (
                    <p className="text-center text-gray-500">Data tidak ditemukan</p>
                )}
            </div>
        </div>
    );
};

export default ProjectGedung;