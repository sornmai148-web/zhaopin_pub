import Image from "next/image";

import EmptyStateImg from "@/public/images/job-empty-state.jpg";
import EmptyStateSearchImg from "@/public/images/empty-search-result.png";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import { useQueryParamsV2 } from "@/hooks/use-query-params-v2";

interface Props {
  type?: "default" | "search";
  title: string;
  subtitle: string;
}

export const EmptyState: React.FC<Props> = ({
  type = "default",
  title,
  subtitle,
}) => {
  const { removeAll, updateSearch } = useQueryParamsV2();
  const img = getImage(type);
  const t = useTranslations("common");

  const handleReset = () => {
    if (type == "search") {
      updateSearch("");
      return;
    }
    removeAll();
  };

  return (
    <div
      className={cn(
        "h-[calc(60dvh)] md:h-[calc(55dvh)] flex justify-center items-center",
        {
          "h-[calc(60dvh)] md:h-[calc(55dvh)]": type == "default",
        }
      )}
    >
      <div className="size-fit flex flex-col justify-center items-center">
        <Image
          src={img}
          alt="empty-state"
          className="object-cover mix-blend-multiply"
          width={100}
          height={62}
        />
        <div className="flex flex-col space-y-1 mt-4 justify-center items-center">
          <h2 className="text-xl md:text-2xl font-bold text-gray-700 text-center">
            {title}
          </h2>
          <span className="font-medium w-full px-10 text-gray-500 text-center text-sm">
            {subtitle}
          </span>

          <Button
            className="bg-primary-400/10 hover:bg-primary-400 hover:text-white duration-500 transition-colors border border-primary-200 mt-2 shadow-none text-primary-400"
            onClick={handleReset}
          >
            {type == "search" ? t("btn-reset-keyword") : t("btn-reset-filter")}
          </Button>
        </div>
      </div>
    </div>
  );
};

function getImage(type: Exclude<Props["type"], undefined>) {
  switch (type) {
    default:
    case "default":
      return EmptyStateImg;

    case "search":
      return EmptyStateSearchImg;
  }
}
