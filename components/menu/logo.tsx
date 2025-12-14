"use client";

import Image from "next/image";

import LogoImg from "@/public/images/logo.jpg";
import { ROUTES } from "@/config/routes";
import { useRouter } from "@/src/i18n/navigation";

export const Logo = () => {
  const router = useRouter();
  return (
    <button
      className="cursor-pointer"
      onClick={() => router.replace(`${ROUTES.HOME}`)}
    >
      <Image
        sizes="(min-width: 1024px) 50vw, 100vw"
        src={LogoImg}
        alt="news-logo.png"
        className="object-contains size-14 sm:size-18 rounded-full"
        priority
      />
    </button>
  );
};
