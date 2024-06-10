import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "../../../../../src/App.css";
import { useState } from "react";
export default function Banner() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        spaceBetween={10}
        // thumbs={{ swiper: thumbsSwiper }}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        loop={true}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2">
        <SwiperSlide>
          <img src="https://i.ibb.co/WzRKCX5/build-1.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://i.ibb.co/1X2Tph6/simone-hutsch-l8fy-K9-RS-OU-unsplash.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://i.ibb.co/9cF6Qz6/giulia-may-k-HAe-Cx-Tm-XDI-unsplash.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://i.ibb.co/WzRKCX5/build-1.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://i.ibb.co/1X2Tph6/simone-hutsch-l8fy-K9-RS-OU-unsplash.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://i.ibb.co/9cF6Qz6/giulia-may-k-HAe-Cx-Tm-XDI-unsplash.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://i.ibb.co/WzRKCX5/build-1.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://i.ibb.co/1X2Tph6/simone-hutsch-l8fy-K9-RS-OU-unsplash.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://i.ibb.co/9cF6Qz6/giulia-may-k-HAe-Cx-Tm-XDI-unsplash.jpg" />
        </SwiperSlide>
      </Swiper>
      <Swiper
        spaceBetween={10}
        loop={true}
        onSwiper={setThumbsSwiper}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper swiper-1 lg:w-1/2 mx-auto mt-4">
        <SwiperSlide>
          <img src="https://i.ibb.co/WzRKCX5/build-1.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://i.ibb.co/1X2Tph6/simone-hutsch-l8fy-K9-RS-OU-unsplash.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://i.ibb.co/9cF6Qz6/giulia-may-k-HAe-Cx-Tm-XDI-unsplash.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://i.ibb.co/WzRKCX5/build-1.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://i.ibb.co/1X2Tph6/simone-hutsch-l8fy-K9-RS-OU-unsplash.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://i.ibb.co/9cF6Qz6/giulia-may-k-HAe-Cx-Tm-XDI-unsplash.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://i.ibb.co/WzRKCX5/build-1.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://i.ibb.co/1X2Tph6/simone-hutsch-l8fy-K9-RS-OU-unsplash.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://i.ibb.co/9cF6Qz6/giulia-may-k-HAe-Cx-Tm-XDI-unsplash.jpg" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
