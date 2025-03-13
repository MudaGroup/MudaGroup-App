import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import { Contractor } from "../component/contractor";
import RetailComponent from "../component/RetailComponent";
import { Autoplay, Pagination } from "swiper/modules";

export const Home = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSlides = async () => {
    try {
      const response = await fetch("http://localhost:1337/api/slide-images?populate=*");
      const result = await response.json();

      console.log("API Response:", result); // Debugging

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
    <div className="">
      <header className="">
        {loading ? (
          <p>Loading slides...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <Swiper
          className="z-[1] w-full h-[38rem] object-cover"
            spaceBetween={10}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 3000, // Delay dalam milidetik
              disableOnInteraction: false, // Agar tetap autoplay meski user swipe
            }}
            loop={true} // Agar slide terus berputar
            modules={[Autoplay, Pagination]} // Pastikan import modulnya
          >
            {slides.map((slide) => {
              const imageFormats = slide?.image?.formats;
              const imageUrl =
                imageFormats?.large?.url ||
                imageFormats?.medium?.url ||
                imageFormats?.small?.url ||
                slide?.image?.url || "";

              const fullImageUrl = imageUrl ? `http://localhost:1337${imageUrl}` : "/default.jpg";

              return (
                <SwiperSlide key={slide.id}>
                  <img
                    src={fullImageUrl}
                    alt={slide.name || "Slide"}
                    style={{ width: "100%", height: "auto" }}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>

        )}
      </header>

      <Contractor />
      <RetailComponent />
    </div>
  );
};
