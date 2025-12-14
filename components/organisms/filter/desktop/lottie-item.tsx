"use client";

import dynamic from "next/dynamic";
import LottieHiringn from "@/public/lotties/lottie-hiring3.json";

const LottiePlayer = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);

export const LottieItem = () => {
  return (
    <div className="relative max-sm:w-36 max-sm:h-34 sm:w-52 sm:h-46 -mt-4 overflow-y-hidden">
      <LottiePlayer
        autoplay
        loop
        className="flex justify-center max-sm:size-36 max-sm:h-34 sm:w-52 sm:h-46 items-center"
        src={LottieHiringn}
        speed={1}
      />
    </div>
  );
};
