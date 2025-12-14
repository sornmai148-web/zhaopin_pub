"use client"; // Only needed in Next.js App Router

import { useEffect, useState } from "react";
import { ChevronUp, Phone } from "lucide-react";
import Link from "next/link";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-sm:right-2 fixed max-sm:bottom-5 sm:bottom-8 sm:right-10 !z-50 flex flex-col space-y-12">
      <Link
        href="tel:010257252"
        target="_blank"
        className={`hover:scale-105 size-fit transition-all shadow-[0px_0px_57px_0px_rgba(0,_0,_0,_0.1)] cursor-pointer  rounded-full bg-primary-500 outline outline-offset-4 outline-primary-200 p-2 sm:p-3 text-white duration-500 hover:bg-tertiary ${
          isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        {/* <NextImage
          src={CustomerServerIcon}
          alt="customer-server"
          className="size-5 max-sm:size-4 object-cover"
          priority
        /> */}
        <Phone className="size-4" />
      </Link>

      <button
        onClick={scrollToTop}
        className={`hover:scale-105 size-fit transition-all grow-0 shrink-0 shadow-[0px_0px_57px_0px_rgba(0,_0,_0,_0.1)] cursor-pointer  rounded-full bg-primary-500 outline outline-offset-4 outline-primary-200 p-2 sm:p-3 text-white  hover:bg-tertiary ${
          isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <ChevronUp className="size-4 sm:size-5" />
      </button>
    </div>
  );
}
