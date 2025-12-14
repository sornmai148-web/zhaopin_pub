"use client";

import { Button } from "@/components/ui/button";
import { BriefcaseBusiness, MapPin, Search } from "lucide-react";
import { PropsWithChildren } from "react";
import { cn, selectStyleClassName } from "@/lib/utils";
import { JobFilterProps } from "../interface";
import { getTransformFilters } from "../helper";
import { SearchInput } from "../search-input";
import { useGlobalSearchStore } from "@/hooks/use-global-search";
import { useTranslations } from "next-intl";
import { NestedSelect } from "../nested-select";
import { useQueryParamsV2 } from "@/hooks/use-query-params-v2";

interface Props {
  parentLevel: Array<JobFilterProps>;
  secondLevel: Array<JobFilterProps>;
  thirdLevel: Array<JobFilterProps>;
}

export const DesktopFilter: React.FC<Props> = ({
  parentLevel,
  secondLevel,
  thirdLevel,
}) => {
  const { search: keywords } = useGlobalSearchStore();
  const { updateSearch } = useQueryParamsV2();

  const filterOptions = getTransformFilters(parentLevel);

  const t = useTranslations("components.filter-labels");

  return (
    <div
      data-aos="zoom-in-up"
      className="max-lg:hidden text-white overflow-x-hidden"
    >
      <div className="bg-white py-4 text-gray-800 rounded-lg grid grid-cols-12">
        <div className="col-span-4 border-r border-r-primary-200 border-dashed">
          <div className="w-11/12 sm:h-11 xl:h-12 flex justify-center items-center space-x-2 mx-auto">
            <Search className="size-7 text-primary-400" />
            <SearchInput
              type="desktop"
              placeholder={t("search")}
              defaultValue={keywords}
              className="border-none shadow-none focus-visible:ring-0 text-[15px] max-lg:hidden"
            />
          </div>
        </div>

        <IconStyleWrapper className="col-span-3">
          <MapPin className="size-7 text-primary-400" />
          <NestedSelect
            id={1}
            parentId={filterOptions?.jobLocation?.selfId as number}
            level2={secondLevel}
            level3={thirdLevel}
            placeholder={t("location")}
            className={selectStyleClassName}
          />
        </IconStyleWrapper>

        <IconStyleWrapper className="col-span-3">
          <BriefcaseBusiness className="size-7 text-primary-400" />
          <NestedSelect
            id={2}
            parentId={filterOptions?.jobPosition?.selfId as number}
            level2={secondLevel}
            level3={thirdLevel}
            placeholder={t("job-position")}
            className={selectStyleClassName}
          />
        </IconStyleWrapper>

        <div className="col-span-2 flex justify-center">
          <Button
            className="max-w-5/6 w-full font-bold sm:h-11 xl:h-12 bg-gradient-to-r from-primary-400 to-primary-500 sm:text-base hover:bg-amber-500 hover:scale-105 duration-300 transition-all ease-linear"
            onClick={(e) => {
              e.preventDefault();
              updateSearch(keywords);
            }}
          >
            {t("btn-search")}
          </Button>
        </div>
      </div>

      {/*-- Bottom filter options --*/}
      <div className="grid grid-cols-16 gap-3 mt-4 sm:mt-5">
        <SelectStyleWrapper>
          <NestedSelect
            id={3}
            parentId={filterOptions?.jobType?.selfId as number}
            level2={secondLevel}
            level3={thirdLevel}
            placeholder={t("job-type")}
          />
        </SelectStyleWrapper>

        <SelectStyleWrapper>
          <NestedSelect
            id={4}
            parentId={filterOptions?.jobExperience?.selfId as number}
            level2={secondLevel}
            level3={thirdLevel}
            placeholder={t("experience")}
          />
        </SelectStyleWrapper>

        <SelectStyleWrapper>
          <NestedSelect
            id={5}
            parentId={filterOptions?.jobLevel?.selfId as number}
            level2={secondLevel}
            level3={thirdLevel}
            placeholder={t("position-level")}
          />
        </SelectStyleWrapper>

        <SelectStyleWrapper>
          <NestedSelect
            id={6}
            parentId={filterOptions?.jobQualification?.selfId as number}
            level2={secondLevel}
            level3={thirdLevel}
            placeholder={t("qualification")}
          />
        </SelectStyleWrapper>
      </div>
    </div>
  );
};

const IconStyleWrapper: React.FC<
  PropsWithChildren & { className?: string }
> = ({ children, className }) => (
  <div
    className={cn(
      "border-r border-r-primary-200 border-dashed flex justify-center items-center",
      className
    )}
  >
    <div className="w-5/6 h-full flex justify-center items-center space-x-0.5">
      {children}
    </div>
  </div>
);

const SelectStyleWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="lg:col-span-4 xl:col-span-3 flex justify-center items-center">
      <div className="w-full h-full flex justify-center items-center space-x-0.5">
        {children}
      </div>
    </div>
  );
};
