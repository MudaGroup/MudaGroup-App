import { Carousel } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Contractor } from "../component/contractor";
import RetailComponent from "../component/RetailComponent";

export const Home = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true); // State untuk loading
  const [error, setError] = useState(null); // State untuk menangani error

  const fetchSlides = async () => {
    try {
      const response = await fetch("http://localhost:1337/api/slide-images?populate=*");
      const result = await response.json();

      console.log("API Response:", JSON.stringify(result, null, 2)); // Debugging API response

      if (result?.data?.length > 0) {
        setSlides(result.data);
      } else {
        console.warn("⚠️ Data slide kosong atau tidak ditemukan");
      }
    } catch (err) {
      console.error("❌ Error fetching slides:", err);
      setError("Gagal memuat slide. Periksa koneksi atau server Strapi!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  return (
    <div className="homepage">
      <header className="header-box">
        {loading ? (
          <p>Loading slides...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <Carousel>
            {slides.length > 0 ? (
              slides.map((slide) => {
                // Cek format gambar yang tersedia
                const imageFormats = slide?.image?.formats;
                const imageUrl =
                  imageFormats?.large?.url ||
                  imageFormats?.medium?.url ||
                  imageFormats?.small?.url ||
                  "";

                const fullImageUrl = imageUrl ? `http://localhost:1337${imageUrl}` : "";

                console.log("Image URL:", fullImageUrl); // Debugging URL gambar

                return (
                  <Carousel.Item key={slide.id}>
                    <img
                      className="d-block w-100"
                      src={fullImageUrl || "/default.jpg"} // Default jika gambar tidak ada
                      alt={slide.attributes?.name || "Slide"}
                    />
                  </Carousel.Item>
                );
              })
            ) : (
              <p>Data slide tidak tersedia.</p>
            )}
          </Carousel>
        )}
      </header>

      <Contractor />
      <RetailComponent />
    </div>
  );
};