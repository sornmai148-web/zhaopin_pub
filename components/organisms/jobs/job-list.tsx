"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { JobCard, CardProps } from "./job-card";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/config/routes";

interface Props {
  isLoading: boolean;
  items: Array<CardProps>;
}

export const JobList: React.FC<Props> = ({ isLoading = false, items }) => {
  const router = useRouter();

  if (isLoading)
    return (
      <div className="grid md:grid-cols-2 2xl:grid-cols-3 max-md:gap-2 gap-5">
        {Array.from({ length: 9 }).map((_, i) => (
          <Skeleton
            key={i}
            className="p-3 flex flex-col space-y-2.5 bg-white rounded-xl"
          >
            <div className="flex flex-col space-y-3 pt-3 pb-2">
              <Skeleton className="max-lg:w-26 w-20 h-5 rounded-lg" />
              <Skeleton className="w-3/4 h-4.5 rounded-lg" />
              <Skeleton className="w-full h-[1px] rounded-lg mt-1" />
            </div>

            <div className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <Skeleton className="size-6 rounded-full" />
                <Skeleton className="max-lg:w-32 w-44 h-4 rounded-lg" />
              </div>
              <Skeleton className="max-lg:w-28 w-32 h-4 rounded-lg" />
            </div>

            <div className="flex items-center space-x-2">
              <Skeleton className="size-6 rounded-full" />
              <Skeleton className="max-lg:w-44 w-52 h-4 rounded-lg" />
            </div>

            <div className="flex items-center space-x-2">
              <Skeleton className="size-6 rounded-full" />
              <Skeleton className="max-lg:w-44 w-60 h-4 rounded-lg" />
            </div>

            <div className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <Skeleton className="size-6 rounded-full" />
                <Skeleton className="max-lg:w-32 w-44 h-4 rounded-lg" />
              </div>

              <div className="flex items-center space-x-2">
                <Skeleton className="size-6 rounded-full" />
                <Skeleton className="max-lg:w-28 w-32 h-4 rounded-lg" />
              </div>
            </div>

            <Skeleton className="w-full h-[1px] rounded-lg mt-2" />

            <div className="flex justify-between space-x-4 py-3">
              <Skeleton className="max-lg:w-32 w-44 h-5 rounded-lg" />
              <Skeleton className="max-lg:w-28 w-32 h-5 rounded-lg" />
            </div>
          </Skeleton>
        ))}
      </div>
    );

  return (
    <div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-5 md:gap-6">
      {(items || [])?.map((x, i) => (
        <div key={i} data-aos="fade-up">
          <JobCard
            {...x}
            onClick={() => router.push(ROUTES.$RECRUITMENT({ id: `${x.id}` }))}
          />
        </div>
      ))}
    </div>
  );
};
