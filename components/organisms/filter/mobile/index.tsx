"use client";

import { Button } from "@/components/ui/button";
import {
  BriefcaseBusiness,
  Funnel,
  MapPin,
  RotateCcw,
  Search,
  SlidersHorizontal,
} from "lucide-react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { getTransformFilters } from "../helper";
import { JobFilterProps } from "../interface";
import { SearchInput } from "../search-input";
import { useTranslations } from "next-intl";
import { NestedSelect } from "../nested-select";
import { cn, selectStyleClassName } from "@/lib/utils";
import { useQueryParamsV2 } from "@/hooks/use-query-params-v2";
import { useGlobalSearchStore } from "@/hooks/use-global-search";

interface Props {
  parentLevel: Array<JobFilterProps>;
  secondLevel: Array<JobFilterProps>;
  thirdLevel: Array<JobFilterProps>;
}

export const MobileFilter: React.FC<Props> = ({
  parentLevel,
  secondLevel,
  thirdLevel,
}) => {
  const { search: keywords } = useGlobalSearchStore();
  const { updateSearch } = useQueryParamsV2();
  const filterOptions = getTransformFilters(parentLevel);

  const t = useTranslations("components.filter-labels");

  return (
    <div data-aos="zoom-in-up" className="lg:hidden">
      <div className="bg-white max-sm:py-2.5 sm:py-4 text-gray-800 rounded-lg grid grid-cols-12">
        <div className="col-span-8 pl-2">
          <div className="sm:h-11 xl:h-12 flex justify-center items-center mx-auto">
            {/*-- Search Icon --*/}
            <Search className="size-7 text-primary-400" />

            {/*-- Real Search Input  --*/}
            <SearchInput
              type="mobile"
              placeholder={t("search")}
              defaultValue={keywords}
              className="placeholder:text-[13px] border-none shadow-none focus-visible:ring-0 text-sm lg:hidden"
            />
          </div>
        </div>

        <div className="col-span-4 flex justify-center">
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

      <div className="flex space-x-2 items-center bg-white rounded-md px-3 py-2.5 mt-2.5">
        <div className="grow max-sm:hidden shrink-0">
          <div className="w-full h-full flex justify-center items-center border-r border-gray-100">
            <MapPin className="size-6 shrink-0 text-primary-400" />
            <NestedSelect
              id={1}
              parentId={filterOptions?.jobLocation?.selfId as number}
              level2={secondLevel}
              level3={thirdLevel}
              placeholder={t("location")}
              className={cn(selectStyleClassName, "text-[13px]")}
            />
          </div>
        </div>

        <div className="grow shrink-0">
          <div className="w-full h-full flex justify-center items-center border-r border-gray-100">
            <BriefcaseBusiness className="size-6 text-primary-400" />
            <NestedSelect
              id={2}
              parentId={filterOptions?.jobPosition?.selfId as number}
              level2={secondLevel}
              level3={thirdLevel}
              placeholder={t("job-position")}
              className={cn(selectStyleClassName, "text-[13px]")}
            />
          </div>
        </div>

        <div className="shrink-0">
          <DrawerFilter
            parentLevel={parentLevel}
            secondLevel={secondLevel}
            thirdLevel={thirdLevel}
          />
        </div>
      </div>
    </div>
  );
};

const DrawerFilter: React.FC<Props> = ({
  parentLevel,
  secondLevel,
  thirdLevel,
}) => {
  const { removeAll } = useQueryParamsV2();
  const filterOptions = getTransformFilters(parentLevel);

  const t = useTranslations("components");

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div role="button" className="w-full flex justify-end items-center">
          <button className="shadow-none w-fit p-1.5 rounded-sm focus-visible:bg-transparent hover:bg-transparent text-primary-500">
            <SlidersHorizontal className="size-4" />
          </button>
        </div>
      </DrawerTrigger>

      <DrawerContent className="bg-gray-50 px-2">
        <div className="flex flex-col space-y-4 mx-auto w-full max-w-sm">
          <DrawerHeader className="mt-4">
            <DrawerTitle>{t("mobile-filter.title")}</DrawerTitle>
            <DrawerDescription>{t("mobile-filter.subtitle")}</DrawerDescription>
          </DrawerHeader>

          <div className="grid gap-4 rounded-lg px-5">
            {/*-- Location --*/}
            <NestedSelect
              id={31}
              parentId={filterOptions?.jobLocation?.selfId as number}
              level2={secondLevel}
              level3={thirdLevel}
              placeholder={t("filter-labels.location")}
              className={cn("text-[13px] h-10")}
            />

            {/*-- Job Type --*/}
            <NestedSelect
              id={4}
              parentId={filterOptions?.jobType?.selfId as number}
              level2={secondLevel}
              level3={thirdLevel}
              placeholder={t("filter-labels.job-type")}
              className={cn("text-[13px] h-10")}
            />

            {/*--  Job Experience --*/}
            <NestedSelect
              id={5}
              parentId={filterOptions?.jobExperience?.selfId as number}
              level2={secondLevel}
              level3={thirdLevel}
              placeholder={t("filter-labels.experience")}
              className={cn("text-[13px] h-10")}
            />

            {/*-- Position Level --*/}
            <NestedSelect
              id={6}
              parentId={filterOptions?.jobLevel?.selfId as number}
              level2={secondLevel}
              level3={thirdLevel}
              placeholder={t("filter-labels.position-level")}
              className={cn("text-[13px] h-10")}
            />

            {/*-- Job Qualification --*/}
            <NestedSelect
              id={7}
              parentId={filterOptions?.jobQualification?.selfId as number}
              level2={secondLevel}
              level3={thirdLevel}
              placeholder={t("filter-labels.qualification")}
              className={cn("text-[13px] h-10")}
            />
          </div>

          <DrawerFooter className="border-t px-0 border-gray-200/50 mt-6 pt-5 flex flex-row justify-center space-x-2.5 items-center">
            <Button
              className="shadow-none bg-amber-400/10 text-amber-500 flex items-center space-x-1.5"
              onClick={removeAll}
            >
              <span className="p-1.5 bg-white rounded-md">
                <RotateCcw className="!size-3" />
              </span>
              <span>{t("mobile-filter.btn-reset")}</span>
            </Button>

            <DrawerClose asChild>
              <Button
                type="button"
                className="bg-primary-500/10 text-primary-500 shadow-none flex items-center space-x-1.5"
                onClick={() => {}}
              >
                <span className="p-1.5 bg-white rounded-md">
                  <Funnel className="!size-3" />
                </span>
                <span>{t("mobile-filter.btn-filter")}</span>
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
