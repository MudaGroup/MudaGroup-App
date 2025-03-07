import { useEffect, useState } from "react";
import "./Profile.css";

const DetailProfile = () => {
    const [profile, setProfile] = useState([]);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch("http://localhost:1337/api/profiles?populate=*");
                const result = await response.json();
                console.log("Response API:", result); // Debugging

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
        <div className="Profile-page-detail">
            <h2 className="Profile-page-detail-title">Muda Group Profile</h2>
            {profile.length > 0 ? (
                profile.map((item) => {
                    const { id, name, image } = item || {}; // Pastikan item tidak undefined
                    const imageUrl = image?.url ? `http://localhost:1337${image.url}` : null;

                    return (
                        <div key={id} className="Profile-page-detail-body">
                            <p className="Profile-page-detail-desc">{name}</p>
                            {imageUrl ? (
                                <img src={imageUrl} alt={name} />
                            ) : (
                                <p>Gambar tidak tersedia</p>
                            )}
                        </div>
                    );
                })
            ) : (
                <p>Data profil tidak ditemukan</p>
            )}
        </div>
    );
};

export default DetailProfile;