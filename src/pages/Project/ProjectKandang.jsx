import { useState, useEffect } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const ProjectKandang = () => {
    const [status, setStatus] = useState("");
    const [location, setLocation] = useState("");
    const [productData, setProductData] = useState([]);
    const navigate = useNavigate();

    const API_BASE_URL = "http://localhost:1337";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/cages?populate=*`);
                const result = await response.json();

                if (result.data) {
                    const formattedData = result.data.map((item) => ({
                        id: item.id,
                        name: item.name || "Tanpa Nama",
                        project_status: item.project_status || "Tidak Diketahui",
                        project_location: item.project_location || "Tidak Diketahui",
                        address: item.address || "Tidak Diketahui",
                        imageUrl: item.image?.url ? `http://localhost:1337${item.image.url}` : "",
                    }));
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
        navigate(`/GeneralContractor/Kandang/${formattedName}/${id}`);
    };

    return (
        <div className="mx-[6rem] pt-12 pb-8">
            <a href="/GeneralContractor" className="inline-flex items-center p-3 bg-gray-200 rounded-full text-gray-700 text-2xl mb-5 hover:bg-gray-300">
                <IoMdArrowRoundBack />
            </a>
            <h1 className="text-3xl font-bold text-center mb-6">Project Kandang</h1>

            <div className="flex justify-center gap-5 mb-6">
                <select className="p-2 border rounded-md" value={status} onChange={handleStatusChange}>
                    <option value="">Semua</option>
                    {uniqueStatuses.map((statusItem, index) => (
                        <option key={index} value={statusItem}>{statusItem}</option>
                    ))}
                </select>

                <select className="p-2 border rounded-md" value={location} onChange={handleLocationChange}>
                    <option value="">Semua</option>
                    {uniqueLocations.map((locationItem, index) => (
                        <option key={index} value={locationItem}>{locationItem}</option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <button
                            key={product.id}
                            onClick={() => handleButtonClick(product.id, product.name)}
                            className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center hover:shadow-lg transition border-solid border-2"
                        >
                            {product.imageUrl ? (
                                <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded-md" />
                            ) : (
                                <p>Gambar tidak tersedia</p>
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

export default ProjectKandang;