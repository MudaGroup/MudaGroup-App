import { useEffect, useState } from "react";
import "./Profile.css";

const Misi = () => {
    const [mission, setMission] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMission = async () => {
            try {
                const response = await fetch("http://localhost:1337/api/missions");
                const result = await response.json();

                console.log("API Response:", result); // Debugging API response

                // Pastikan format API sesuai
                if (Array.isArray(result)) {
                    setMission(result); // Jika API mengembalikan array langsung
                } else if (result.data && Array.isArray(result.data)) {
                    setMission(result.data); // Jika API memiliki properti `data`
                } else {
                    setError("Data tidak ditemukan");
                }
            } catch (error) {
                console.error("Error fetching mission:", error);
                setError("Terjadi kesalahan saat mengambil data.");
            } finally {
                setLoading(false);
            }
        };

        fetchMission();
    }, []);

    return (
        <div className="Profile-page-mission">
            <h2 className="Profile-page-mission-title">Misi Muda Group</h2>

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : mission.length > 0 ? (
                <ol className="Profile-page-mission-list">
                    {mission.map((item) => (
                        <li key={item.id} className="Profile-page-mission-desc">
                            {item.name || item.attributes?.name || "Data tidak tersedia"}
                        </li>
                    ))}
                </ol>
            ) : (
                <p>Tidak ada data misi</p>
            )}
        </div>
    );
};

export default Misi;