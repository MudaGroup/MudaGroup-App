import { useEffect, useState } from "react";

const DetailProfile = () => {
    const [profile, setProfile] = useState([]);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch("http://localhost:1337/api/profiles?populate=*");
                const result = await response.json();
                console.log("Response API:", result);

                if (result.data) {
                    setProfile(result.data);
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        fetchProfile();
    }, []);

    return (
        <div className="p-0 text-center">
            <h2 className="text-3xl font-bold text-center mb-10">Muda Group Profile</h2>
            {profile.length > 0 ? (
                profile.map((item) => {
                    const { id, name, image } = item || {};
                    const imageUrl = image?.url ? `http://localhost:1337${image.url}` : null;

                    return (
                        <div key={id} className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10 mb-8">
                            <p className="text-gray-600 text-lg text-justify">{name}</p>
                            {imageUrl ? (
                                <img src={imageUrl} alt={name} className="w-auto h-60 rounded-lg shadow-lg object-cover" />
                            ) : (
                                <p className="text-gray-500">Gambar tidak tersedia</p>
                            )}
                        </div>
                    );
                })
            ) : (
                <p className="text-gray-500 text-center">Data profil tidak ditemukan</p>
            )}
        </div>
    );
};

export default DetailProfile;