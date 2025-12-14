import { getTranslations } from "next-intl/server";
import { Container } from "../molecules/container";

import { Logo } from "./logo";
import { Button } from "../ui/button";
import Link from "next/link";
import { Mail } from "lucide-react";

export const Footer = async () => {
  const t = await getTranslations("common");
  const year = new Date().getFullYear();

  return (
    <div className="w-full bg-secondary-400 py-5 border-t border-t-secondary">
      <Container>
        <div className="text-primary py-5">
          <div className="flex sm:items-center max-sm:space-y-1 max-sm:flex-col sm:justify-between w-full">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center to-transparent rounded-l-full space-x-2 sm:space-x-3 py-2">
                <Logo />
                <div className="flex flex-col">
                  <h3 className="font-bold sm:text-xl text-gray-800">
                    Light Rain
                  </h3>
                  <p className="max-sm:text-xs text-sm text-primary-500 font-medium">
                    <span className="font-bold">Recruitment </span>
                    <span className="text-gray-800"> Agent</span>
                  </p>
                </div>
              </div>
              <div className="sm:w-5/6 flex max-sm:mt-2 sm:justify-end items-center lg:w-1/2">
                <p className="text-gray-500 max-sm:text-[15px] text-start md:w-5/6 lg:w-full text-sm 2xl:text-base">
                  {t("short-description")}
                </p>
              </div>
            </div>

            {/*-- Right Section  --*/}
            <div className="sm:w-3/5 flex max-sm:mt-2 sm:justify-end items-center lg:w-2/5">
              <Button
                className="group px-5 h-10 flex items-center space-x-2 bg-primary-100/50 shadow-none cursor-pointer outline-0 hover:bg-primary-400 hover:text-white transition-colors duration-300 text-primary-400 !font-medium max-sm:w-full max-sm:!h-11"
                asChild
              >
                <Link
                  href="mailto:Lightrainnetworktechnolgy@gmail.com"
                  target="_blank"
                  className="flex items-center space-x-1"
                >
                  <span className="p-1.5 bg-white rounded-2xl">
                    <Mail className="!size-3 group-hover:text-primary-400" />
                  </span>
                  <span>{t("footer-hr-label")}</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>

      <div>
        <div className="h-[1px] bg-secondary my-5 sm:my-8" />
        <p className="text-sm text-center sm:text-base text-gray-800">
          {t("coptyright", { year: `${year}` })}
        </p>
      </div>
    </div>
  );
};
