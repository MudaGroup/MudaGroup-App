import { useEffect, useState } from "react";

const Visi = () => {
    const [vision, setVision] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVision = async () => {
            try {
                const response = await fetch("http://localhost:1337/api/visions");
                const result = await response.json();

                console.log("API Response:", result); // Debugging API response

                if (Array.isArray(result)) {
                    setVision(result);
                } else {
                    setError("Data tidak ditemukan");
                }
            } catch (error) {
                console.error("Error fetching vision:", error);
                setError("Terjadi kesalahan saat mengambil data.");
            } finally {
                setLoading(false);
            }
        };

        fetchVision();
    }, []);
    
    return (
        <div className="p-0 text-center">
            <h2 className="text-3xl font-bold text-center mb-10">Visi Muda Group</h2>

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : vision.length > 0 ? (
                vision.map((item) => (
                    <div key={item.id} className="mb-5">
                        <p className="text-gray-600 text-lg text-justify">
                            {item.name || "Data tidak tersedia"}
                        </p>
                    </div>
                ))
            ) : (
                <p>Visi tidak tersedia</p>
            )}
        </div>
    );
};

export default Visi;