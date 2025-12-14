"use client";

import { Swiper } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import { Autoplay, Pagination, EffectFade } from "swiper/modules";

export const ImageSlider: React.FC = () => {
  return (
    <div className="relative mb-3 mt-1">
      <Swiper
        loop
        effect="fade"
        speed={2000}
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
          bulletClass:
            "!size-2 bg-white/60 !rounded-md !mr-1 !px-0 flex items-center !space-x-1",
          bulletActiveClass: "!w-4 h-2 !rounded-sm !bg-amber-300",
        }}
        modules={[Autoplay, EffectFade, Pagination]}
        className="advertisement-slider relative"
      >
        <div>xxx</div>
      </Swiper>

      <div className="custom-pagination z-20 absolute bottom-2 w-full flex justify-center" />
    </div>
  );
};
