"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

/**
 * @link https://techsimple.in/blog/nextjs-aos-effortless-scroll-based-animations
 */
export const AOSInit = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      mirror: false,
      offset: 20,
    });
  }, []);

  return null;
};
