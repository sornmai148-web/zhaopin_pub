"use client";

import { useTranslations } from "next-intl";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { useRouter } from "next/navigation";

export const JobsBreadcrumb = () => {
  const t = useTranslations("common");
  const router = useRouter();

  return (
    <Breadcrumb>
      <BreadcrumbList className="flex flex-nowrap">
        <BreadcrumbItem className="px-0.5">
          <button
            className="cursor-pointer shrink-0 text-primary-400 max-w-24 line-clamp-1 break-words text-[13px] sm:text-[15px] xl:text-base hover:text-gray-500"
            onClick={() => router.back()}
          >
            {t("home")}
          </button>
        </BreadcrumbItem>

        <BreadcrumbSeparator />

        <BreadcrumbItem>
          <BreadcrumbPage className="line-clamp-1 text-gray-400 text-[13px] sm:text-[15px] xl:text-base pr-1.5">
            {t("view-detail")}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
