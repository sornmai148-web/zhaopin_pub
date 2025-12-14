import { JobsBreadcrumb } from "@/components/molecules/jobs-breadcrumb";
import { Button } from "@/components/ui/button";
import { getFormatDate, getFormatHumanReadable } from "@/config/dayjs";
import { enFont } from "@/config/font";
import { cn } from "@/lib/utils";
import {
  BriefcaseBusiness,
  CalendarClock,
  CircleCheckBig,
  Clock,
  Clock3,
  Clock8,
  GraduationCap,
  MapPin,
  Mars,
  Megaphone,
  Send,
  Timer,
  Transgender,
  User,
  Users,
  UserStar,
  Venus,
} from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";

interface Props {
  Job_title: string;
  applicant_gender: string;
  job_description: string;
  job_requirement: string;
  job_responsibility: string;
  job_benefits: string;
  job_type: string;
  job_location: string;
  job_salary: string;
  job_experience: string;
  job_position: string;
  job_qlft: string;
  job_pos_level: string;
  job_hire_nums: number;
  job_tag: string;
  working_hours: string;
  working_time: string;
  company_intro: string;
  job_exp_date: string;
  job_created_date: string;
  jobTage: string;
  link?: string;
}

export const JobDetail: React.FC<Props> = async (props) => {
  const t = await getTranslations("components.detail");
  const locale = await getLocale();

  return (
    <div className="relative overflow-x-hidden grid gap-5">
      <div className="flex flex-col space-y-2">
        {/*-- BreakCrumb & Tag --*/}
        <div
          data-aos="fade-down"
          className="flex items-center justify-between pr-2"
        >
          <JobsBreadcrumb />
          {!!props?.jobTage && (
            <div className="max-w-[60%] flex items-center space-x-2.5">
              <span className="py-1.5 px-2 md:px-3 bg-gradient-to-r from-orange-100/75 to-transparent rounded-l-full">
                <Megaphone className="xl:size-7 max-sm:size-5 md:size-6 stroke-1 text-orange-500" />
              </span>
              <p className="font-semibold max-sm:text-base text-xl text-orange-400 capitalize line-clamp-1 break-words">
                {props?.jobTage}
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col space-y-2 max-sm:mt-8 mt-4 sm:py-4">
          {/*-- Tittle Section --*/}
          <div className="flex items-center justify-between">
            <div className="sm:basis-3/5 pr-4">
              <h1
                data-aos="fade-right"
                className="font-bold text-2xl sm:text-4xl leading-tight text-gray-800 wrap-break-word"
              >
                {props?.Job_title}
              </h1>
            </div>

            <div
              data-aos="fade-left"
              className="sm:basis-2/5 max-sm:hidden shrink-0 flex items-center justify-end py-2"
            >
              <span
                style={{
                  fontFamily: enFont.style.fontFamily,
                }}
                className={`text-xl font-bold bg-gradient-to-r from-transparent via-primary-100/60 to-transparent text-primary-400 py-2.5 px-3 $`}
              >
                {props?.job_salary}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            {/*-- Metadata Under Tittle Section --*/}
            <div
              data-aos="fade-right"
              className="flex items-center max-lg:gap-4 flex-wrap mt-2"
            >
              <div className="flex items-center space-x-2 text-gray-500 lg:pr-6 lg:border-r lg:border-dashed">
                <span className="max-sm:p-1 p-1.5 bg-green-100/70 rounded-full">
                  <User className="size-4 text-green-400" />
                </span>
                <p className="max-sm:text-xs">{props?.job_pos_level}</p>
              </div>

              <div className="flex items-center space-x-2 text-gray-500 lg:px-6 lg:border-r lg:border-dashed">
                <span className="max-sm:p-1 p-1.5 bg-orange-100/55 rounded-full">
                  <MapPin className="size-4 text-orange-400" />
                </span>
                <p className="max-sm:text-xs">{props?.job_location}</p>
              </div>

              <div className="shrink-0 flex items-center space-x-2 lg:px-6">
                <span className="max-sm:p-1 p-1.5 bg-primary-100/65 rounded-full">
                  <Clock3 className="size-4 text-primary-500" />
                </span>
                <p className="text-primary-400 font-bold max-sm:text-xs text-sm">
                  {getFormatHumanReadable(
                    new Date(props?.job_created_date),
                    locale
                  )}
                </p>
              </div>
            </div>

            {/*-- Expiry Recruite Date For Large Screen --*/}
            <div
              data-aos="fade-left"
              className="max-sm:hidden w-2/5 flex items-start justify-end space-x-2"
            >
              <div className="flex shrink-0 flex-nowrap items-center space-x-2">
                <CalendarClock className="size-4 text-primary-400" />
                <span className="font-medium text-gray-700">
                  {t("exp-date")}
                </span>
              </div>
              <p className="text-sm text-nowrap text-gray-500">
                {getFormatDate(new Date(props?.job_exp_date), locale)}
              </p>
            </div>
          </div>

          <ContactButton
            btnLabel={t("btn")}
            salary={props?.job_salary}
            url={props?.link}
          />

          {/*-- Expiry Recruite Date For Small Screen --*/}
          <div
            data-aos="fade-left"
            className="sm:hidden flex items-center space-x-2 px-1 mt-2"
          >
            <div className="flex items-center space-x-2">
              <CalendarClock className="size-4 text-primary-400" />
              <span className="font-medium text-gray-800 max-sm:text-sm">
                {t("exp-date")}
              </span>
            </div>
            <p className="max-sm:text-[13px] text-sm text-gray-500">
              {getFormatDate(new Date(props?.job_exp_date), locale)}
            </p>
          </div>
        </div>

        <JobSeparator />

        {/*-- Company Introduction --*/}
        {props?.company_intro && (
          <div className="flex flex-col space-y-3.5 pl-2 pt-6 sm:my-8">
            <HeadingHighlight title={t("company-intro")} />
            <p
              data-aos="fade-right"
              className={cn("text-gray-500 max-sm:text-[15px]", {
                "max-sm:text-[13px] !leading-relaxed": locale == "zh-cn",
              })}
            >
              {props?.company_intro}
            </p>
          </div>
        )}

        {/*-- Job Description --*/}
        <div className="flex flex-col space-y-3.5 pl-2 py-6 sm:my-8">
          <HeadingHighlight title={t("job-desc")} />
          <p
            data-aos="fade-right"
            className={cn("text-gray-500 max-sm:text-[15px]", {
              "max-sm:text-[13px] !leading-relaxed": locale == "zh-cn",
            })}
          >
            {props?.job_description}
          </p>
        </div>

        {/*-- Job Feature List --*/}
        <div
          data-aos="fade-up"
          className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6"
        >
          {/*-- Job Position --*/}
          <FeatureItem
            icon={
              <BriefcaseBusiness className="text-primary-400 size-7 max-sm:size-5" />
            }
            label={t("features.job-position")}
            value={props?.job_position}
          />

          {/*-- Job Type --*/}
          <FeatureItem
            icon={<Clock className="text-primary-400 size-7 max-sm:size-5" />}
            label={t("features.job-type")}
            value={props?.job_type}
          />

          {/*-- Recruit Gender --*/}
          <FeatureItem
            icon={getGenderIcon(props?.applicant_gender)}
            label={t("features.recruit-gender")}
            value={props?.applicant_gender}
          />

          {/*-- Qualification --*/}
          <FeatureItem
            icon={
              <GraduationCap className="text-primary-400 size-7 max-sm:size-5" />
            }
            label={t("features.qualification")}
            value={props?.job_qlft}
          />

          {/*-- Job Experience --*/}
          <FeatureItem
            icon={
              <UserStar className="text-primary-400 size-7 max-sm:size-5" />
            }
            label={t("features.job-exp")}
            value={props?.job_experience}
          />

          {/*-- Working Hours --*/}
          <FeatureItem
            icon={<Timer className="text-primary-400 size-7 max-sm:size-5" />}
            label={t("features.working-hours")}
            value={props?.working_hours}
          />

          {/*-- Open Positions --*/}
          <FeatureItem
            icon={<Users className="text-primary-400 size-7 max-sm:size-5" />}
            label={t("features.open-positions")}
            value={props?.job_hire_nums.toString()}
          />

          {/*-- Working Time --*/}
          <FeatureItem
            icon={<Clock8 className="text-primary-400 size-7 max-sm:size-5" />}
            label={t("features.working-time")}
            value={props?.working_time}
          />
        </div>

        <JobSeparator />

        {/*-- Job Requirement --*/}
        <JobRenderList
          type="others"
          label={t("job-requirement")}
          itemsWithComma={props?.job_requirement}
        />

        {/*-- Job Responsibility --*/}
        <JobRenderList
          type="others"
          label={t("job-responsibility")}
          itemsWithComma={props?.job_responsibility}
        />

        {/*-- Job Benefits --*/}
        <JobRenderList
          type="benefit"
          label={t("job-benefit")}
          itemsWithComma={props?.job_benefits}
        />
      </div>
    </div>
  );
};

const ContactButton: React.FC<{
  btnLabel: string;
  salary: string;
  url?: string;
}> = ({ btnLabel, salary, url }) => (
  <div
    data-aos="fade-up"
    className="flex items-center justify-between mt-2.5 max-sm:mt-5"
  >
    <Button
      className="group bg-primary-100/70 hover:bg-primary-400 hover:text-white shadow-none border-none text-primary-400 h-10 duration-500 transition-colors max-sm:h-8 sm:px-6"
      asChild
    >
      <Link href={url || "#"} target="_blank">
        <span className="p-1.5 bg-white rounded-full">
          <Send className="size-3 max-sm:size-2.5 group-hover:text-primary-400 duration-500 transition-colors" />
        </span>
        {btnLabel}
      </Link>
    </Button>

    <div data-aos="fade-left" className="sm:hidden flex items-center py-2">
      <span
        style={{
          fontFamily: enFont.style.fontFamily,
        }}
        className="max-sm:text-base text-xl font-bold bg-gradient-to-r from-transparent via-primary-100/60 to-transparent text-primary-400 py-2.5 max-sm:px-3 px-4"
      >
        {salary}
      </span>
    </div>
  </div>
);

//-- Job Feature List
interface FeatureItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const FeatureItem: React.FC<FeatureItemProps> = (props) => {
  const { icon: Icon, label, value } = props;
  return (
    <div className="relative flex max-sm:flex-col items-center max-sm:space-x-2 sm:space-x-4 bg-primary-100/30 p-1.5 max-sm:p-2.5 border border-primary-100/80 rounded-md hover:-translate-y-1 transition-transform duration-500">
      <div className="!shrink-0 max-sm:h-11 sm:h-full flex justify-center rounded-lg items-center max-sm:w-11 sm:w-1/4 bg-white border border-primary-100/80">
        {Icon}
      </div>
      <div className="py-1 space-y-1 max-sm:py-2">
        <p className="max-sm:text-sm max-sm:text-center font-bold text-gray-800">
          {label}
        </p>
        <p className="max-sm:text-xs max-sm:text-center text-sm text-gray-500">
          {value}
        </p>
      </div>
    </div>
  );
};

//-- Job separator line
const JobSeparator = () => (
  <div data-aos="fade-right" className="w-full h-[1px] bg-gray-100/80 mt-3" />
);

//-- Job render list used in, Job Requirement, Job Responsibility , and Job Benefit
interface JobRenderListProps {
  type: "benefit" | "others";
  label: string;
  itemsWithComma: string;
}

const JobRenderList: React.FC<JobRenderListProps> = (props) => {
  const { type = "others", label, itemsWithComma } = props;
  const commaSeparatedList = itemsWithComma || "";

  if (type == "benefit")
    return (
      <div className="flex flex-col space-y-2 pl-2 py-4 mt-3">
        <HeadingHighlight title={label} />

        <ul
          // data-aos="fade-up"
          className="border border-primary-100/80 rounded-lg list-none pl-5 py-6 leading-snug text-gray-500 mt-3 max-sm:text-[15px] space-y-3  md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-2.5"
        >
          {commaSeparatedList?.split(/,|，|、\/n/)?.map((r, i) => (
            <li key={i} className="flex items-center space-x-2.5">
              <span className="shrink-0">
                <CircleCheckBig className="size-5 text-primary-400" />
              </span>
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>
    );

  return (
    <div className="flex flex-col space-y-2 pl-2 py-4 mt-3">
      <HeadingHighlight title={label} />

      <ul
        data-aos="fade-up"
        className="border border-primary-100/80 rounded-lg list-disc marker:text-primary-400 marker:text-xl max-sm:pr-4 max-sm:py-4 pl-10 py-6 leading-snug text-gray-500 mt-3 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-2"
      >
        {commaSeparatedList?.split(/,|，|、|\n/)?.map((r, i) => (
          <li key={i} className="max-sm:text-[15px] break-words">
            <span></span>
            <span>{r}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const HeadingHighlight: React.FC<{ title: string }> = ({ title }) => (
  <div data-aos="fade-right" className="flex items-center space-x-2.5">
    <div className="w-1.5 h-3/4 bg-primary-400 rounded-xs" />
    <h2 className="font-bold text-xl sm:text-2xl text-gray-700 mt-1 capitalize">
      {title}
    </h2>
  </div>
);

//--  Render iconm base on gender
function getGenderIcon(type: string) {
  switch (type) {
    case "Male":
    case "male":
    case "男":
      return <Mars className="text-primary-400 size-7 max-sm:size-6" />;

    case "Female":
    case "male":
    case "女":
      return <Venus className="text-primary-400 size-7 max-sm:size-6" />;

    default:
      return <Transgender className="text-primary-400 size-7 max-sm:size-6" />;
  }
}
