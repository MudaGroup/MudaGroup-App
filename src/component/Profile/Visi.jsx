import { useEffect, useState } from "react";
import "./Profile.css";

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
        <div className="Profile-page-vision">
            <h2 className="Profile-page-vision-title">Visi Muda Group</h2>

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : vision.length > 0 ? (
                vision.map((item) => (
                    <div key={item.id} className="Profile-page-vision-desc">
                        <p>{item.name || "Data tidak tersedia"}</p>
                    </div>
                ))
            ) : (
                <p>Visi tidak tersedia</p>
            )}
        </div>
    );
};

export default Visi;