import { Container } from "@/components/molecules/container";
import { Megaphone } from "lucide-react";
import { TextAnimate } from "@/components/molecules/text-animate";
import { LottieItem } from "./desktop/lottie-item";
import { DesktopFilter } from "./desktop";
import { MobileFilter } from "./mobile";
import { getFilterOptions } from "@/api/resource";
import { select } from "radash";
import { getLocale, getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";

interface Props {
  locale: Locale;
}

export const FilterOptions: React.FC<Props> = async ({ locale }) => {
  const filterOptions = await getFilterOptions({
    langCode: locale || "en",
    platType: "job",
  });

  const parentLevel = select(
    filterOptions?.data || [],
    (f) => f,
    (f) => f.parentId == null
  )?.[0]?.values?.map((x) => ({
    parentId: x?.parentId,
    selfId: x?.id,
    selfFieldId: x?.fieldId,
    selfFieldValue: x?.fieldValue,
    selfDisplayName: x?.valueText,
  }));

  const secondLevel = select(
    filterOptions?.data || [],
    (f) => f,
    (f) => f?.level == 2
  )?.[0]?.values?.map((x) => ({
    parentId: x?.parentId,
    selfId: x?.id,
    selfFieldId: x?.fieldId,
    selfFieldValue: x?.fieldValue,
    selfDisplayName: x?.valueText,
  }));

  const thirdLevel = select(
    filterOptions?.data || [],
    (f) => f,
    (f) => f?.level == 3
  )?.[0]?.values?.map((x) => ({
    parentId: x?.parentId,
    selfId: x?.id,
    selfFieldId: x?.fieldId,
    selfFieldValue: x?.fieldValue,
    selfDisplayName: x?.valueText,
  }));

  return (
    <div className="overflow-hidden bg-gradient-to-br from-primary-400 to-primary-500 text-white max-sm:py-4 max-xl:py-6 py-4">
      <Container className="pt-8 pb-5 md:pb-3 sm:pt-12 flex flex-col space-y-8">
        <BannerSection />
        <DesktopFilter
          parentLevel={parentLevel}
          secondLevel={secondLevel}
          thirdLevel={thirdLevel}
        />
        <MobileFilter
          parentLevel={parentLevel}
          secondLevel={secondLevel}
          thirdLevel={thirdLevel}
        />
      </Container>
    </div>
  );
};

const BannerSection = async () => {
  const locale = await getLocale();
  const t = await getTranslations("common");

  return (
    <div className="flex justify-between items-center !overflow-x-hidden">
      <div className="max-lg:basis-[80%] flex flex-col max-sm:space-y-2 space-y-3 w-fit rounded-xl">
        <div className="flex items-center space-x-2 max-sm:px-2.5 px-4 py-1 bg-gradient-to-br from-amber-400 to-amber-300 w-fit rounded-sm">
          <Megaphone className="size-5 max-sm:size-4" />
          <p className="max-sm:text-xs text-sm font-medium text-white">
            {t("tag")}
          </p>
        </div>

        <TextAnimate
          text={t("title")}
          className={cn(
            "max-sm:text-start max-sm:text-xl max-[375px]:text-lg",
            { "max-[375px]:!text-base max-sm:text-[17px]": locale == "en" }
          )}
        />
        <TextAnimate
          text={t("subtitle")}
          className="text-gray-100 max-sm:text-xs font-medium"
          type="paragraph"
        />
      </div>

      <div
        data-aos="fade-left"
        className="max-lg:basis-[20%] flex justify-end translate-x-5"
      >
        <LottieItem />
      </div>
    </div>
  );
};
