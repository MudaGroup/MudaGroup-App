import { useEffect, useState } from "react";

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
        <div className="p-0 text-center">
            <h2 className="text-3xl font-bold text-center mb-10">Misi Muda Group</h2>

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : mission.length > 0 ? (
                <ol className="list-decimal text-left">
                    {mission.map((item) => (
                        <li key={item.id} className="text-gray-600 text-lg text-justify">
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