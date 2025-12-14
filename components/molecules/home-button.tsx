"use client";

import { Home } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

export const HomeButton = () => {
  const pathname = usePathname();
  const t = useTranslations("common");
  const router = useRouter();

  if (pathname?.includes("/detail"))
    return (
      <button
        className="cursor-pointer border border-primary-100 flex items-center space-x-2.5 py-2 px-4 bg-gradient-to-r from-primary-100/30 via-primary-100/50 to-primary-100/30 rounded-lg"
        onClick={() => router.back()}
      >
        <Home className="size-5 text-primary-400" />
        <span className="text-sm text-primary-500 font-medium">
          {t("btn-home")}
        </span>
      </button>
    );

  return null;
};
