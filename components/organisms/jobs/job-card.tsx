"use client";

import { Button } from "@/components/ui/button";
import { getFormatDate, getFormatHumanReadable } from "@/config/dayjs";
import { enFont } from "@/config/font";
import { cn } from "@/lib/utils";
import {
  ArrowUpRight,
  Banknote,
  BriefcaseBusiness,
  Clock,
  Flame,
  GraduationCap,
  MapPin,
  Megaphone,
  User,
  Zap,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

export interface CardProps {
  id?: number;
  jobTitle: string;
  jobType: string;
  jobPos: string;
  jobExp: string;
  jobQlft: string;
  jobSalary?: string;
  jobCate: string;
  jobRecruitPosNums: number;
  jobLocate: string;
  isUrgent: boolean;
  jobCreatedAt: string;
  jobExpiryAt: string;
  onClick?: () => void;
}

export const JobCard: React.FC<CardProps> = (props) => {
  const t = useTranslations("components");
  const locale = useLocale();

  return (
    <div className="relative outline-1 outline-white outline-offset-5 border border-gray-100/60  duration-300 hover:scale-[1.02] ease-linear transition-all hover:outline-primary-400 rounded-xl bg-white h-full">
      <div
        className={cn(
          "flex flex-col space-y-1 bg-white pt-10 pb-4 rounded-xl max-w-[375px]:px-2 px-3 md:px-5 lg:px-7 xl:px-7 2xl:px-6"
        )}
      >
        {/*-- Post Date --*/}
        <div className="absolute top-3 left-2 md:left-4.5 flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-primary-100/30 via-primary-100/80 to-primary-100/40 w-fit rounded-lg">
          <span>
            <Clock className="size-4 text-primary-400" />
          </span>

          <span className="text-xs text-gray-500">
            {getFormatHumanReadable(new Date(props.jobCreatedAt), locale)}
          </span>
        </div>

        <div className="mt-3 flex flex-col space-y-1 border-b border-b-gray-200/80 pb-3 border-dashed">
          <h3 className="line-clamp-1 leading-tight break-words text-gray-700 text-lg font-bold">
            {props?.jobTitle || ""}
          </h3>
        </div>

        <div className="flex flex-col space-y-2.5 px-1 mb-2 mt-3">
          <div className="flex items-center flex-wrap gap-2 sm:gap-3 md:gap-4">
            <div className="flex items-center space-x-2">
              <span>
                <BriefcaseBusiness className="size-5 text-primary-500" />
              </span>

              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>{props?.jobCate || ""}</span>
                <div className="size-1.5 mt-1 rounded-2xl bg-primary-300" />
                <span>{props?.jobPos || ""}</span>
              </div>
            </div>

            <div className="max-sm:hidden h-3.5 w-[1px] border-r mt-1 border-dotted border-gray-200" />

            {!!props?.jobRecruitPosNums && (
              <div className="max-sm:hidden text-gray-500 text-xs flex items-center">
                {!!t("job-card.recruit") && (
                  <span className="mr-2 font-bold capitalize">
                    {t("job-card.recruit")}
                  </span>
                )}
                <span className="font-bold mr-1.5 size-5 flex justify-center items-center text-primary-400 rounded-2xl bg-primary-100/60">
                  {props?.jobRecruitPosNums || 0}
                </span>

                <span>
                  {t("job-card.position", {
                    position: props?.jobRecruitPosNums,
                  })?.replace(/\d+/g, "")}
                </span>
              </div>
            )}
          </div>

          {!!props?.jobSalary && (
            <div className="flex items-center space-x-2">
              <span>
                <Banknote className="size-5 text-primary-500" />
              </span>

              <span
                style={{
                  fontFamily: enFont.style.fontFamily,
                }}
                className="text-base 2xl:text-lg text-amber-500 font-bold leading-tight"
              >
                {props?.jobSalary || 0}
              </span>
            </div>
          )}

          {!!props?.jobRecruitPosNums && (
            <div className="sm:hidden flex items-center space-x-2">
              <span>
                <User className="size-5 text-primary-500" />
              </span>

              <div className="text-gray-500 text-sm flex items-center">
                <span className="mr-2 font-bold">{t("job-card.recruit")}</span>
                <div className="font-bold mr-1.5 size-5 flex justify-center items-center text-primary-400 rounded-2xl bg-primary-100/60">
                  <span>{props?.jobRecruitPosNums || 0}</span>
                </div>

                <span>
                  {t("job-card.position", {
                    position: props?.jobRecruitPosNums,
                  })?.replace(/\d+/g, "")}
                </span>
              </div>
            </div>
          )}

          {!!props?.jobQlft && (
            <div className="sm:hidden flex items-center flex-wrap gap-2">
              <span>
                <GraduationCap className="size-5 text-primary-500" />
              </span>
              <span className="flex items-center space-x-2 text-gray-500 text-sm">
                {props?.jobQlft || ""}
              </span>
            </div>
          )}

          <div className="flex items-center flex-wrap gap-4">
            <div className="flex items-center flex-wrap gap-2">
              <span>
                <User className="size-5 text-primary-500" />
              </span>
              <span className="text-sm text-gray-500 ">
                {props?.jobType || ""}
              </span>
            </div>

            <div className="max-sm:hidden h-full w-1 text-primary-400 shrink-0">
              -
            </div>

            <div className="max-sm:hidden flex items-center flex-wrap gap-2">
              <span>
                <GraduationCap className="size-5 text-primary-500" />
              </span>
              <span className="text-sm flex items-center space-x-2 text-gray-500">
                {props?.jobQlft || ""}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-1">
            {!!props?.jobExp && (
              <div className="flex items-center space-x-1.5 bg-green-100/60 px-2.5 py-1.5 rounded-2xl">
                <Zap className="size-3.5 text-green-500" />
                <span className="text-xs text-green-600">
                  {props?.jobExp || ""}
                </span>
              </div>
            )}

            {!!props?.jobLocate && (
              <div className="flex items-center space-x-1.5 bg-primary-100/60 px-2.5 py-1.5 rounded-2xl">
                <MapPin className="size-3.5 text-primary-500" />
                <span className="text-xs text-gray-600">
                  {props?.jobLocate || ""}
                </span>
              </div>
            )}

            {!!props?.isUrgent && (
              <div className="flex items-center space-x-1.5 bg-red-100/60 px-2.5 py-1.5 rounded-2xl">
                <Flame className="size-3.5 text-red-500" />
                <span className="text-xs text-red-600">
                  {t("job-card.urgent")}
                </span>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center border-t border-t-gray-200/80 border-dashed mt-2.5 pt-4">
            {!!props?.jobExpiryAt && (
              <div className="flex items-center space-x-2">
                <Megaphone className="size-5 text-primary-400 fill-primary-100/45" />
                <span className="text-xs text-gray-600 font-bold">
                  {t("job-card.close-label")}
                </span>
                {!!props?.jobExpiryAt && (
                  <p className="text-xs text-gray-600">
                    {getFormatDate(new Date(props.jobExpiryAt), locale)}
                  </p>
                )}
              </div>
            )}

            <Button
              variant="ghost"
              className="group text-primary-500 shadow-none hover:bg-primary-100/35 duration-500 transition-colors"
              asChild
            >
              <div
                role="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (props?.onClick) {
                    props?.onClick();
                  }
                }}
              >
                <span className="p-1 bg-white rounded-2xl">
                  <ArrowUpRight className="size-3 group-hover:rotate-45 duration-500 transition-all group-hover:text-primary-400" />
                </span>
                <span className="group-hover:text-primary-400 font-normal duration-500 transition-colors">
                  {t("job-card.view-label")}
                </span>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
