"use client";

import { Container } from "@/components/molecules/container";
import { JobList } from "./job-list";
import InfiniteScroll from "react-infinite-scroll-component";
import { Loader } from "@/components/molecules/loader";
import { useSearch } from "@/hooks/use-search";
import { EmptyState } from "@/components/molecules/empty-state";
import { useTranslations } from "next-intl";
import { useQueryParamsV2 } from "@/hooks/use-query-params-v2";

export const JobSection = () => {
  const queryParams = useQueryParamsV2();
  const t = useTranslations();

  const { isLoading, hasNextPage, fetchNextPage, data, total } = useSearch({
    search: queryParams?.search,
    parentFieldId: queryParams?.parentFieldId,
    subFieldId: queryParams?.subFieldId,
    parentFieldValues: queryParams?.parentFieldValues,
    subFieldValues: queryParams?.subFieldValues,
  });

  if (!queryParams?.search && !isLoading && !data?.length)
    return (
      <div>
        <div className="bg-white rounded-xl max-md:my-4">
          <EmptyState
            type="default"
            title={t("components.list-empty-state.title")}
            subtitle={t("components.list-empty-state.subtitle")}
          />
        </div>
      </div>
    );

  if (queryParams?.search && !isLoading && !data?.length)
    return (
      <div>
        <div className="bg-white rounded-xl max-md:my-4">
          <EmptyState
            type="search"
            title={t("components.search-empty-state.title")}
            subtitle={t("components.search-empty-state.subtitle")}
          />
        </div>
      </div>
    );

  return (
    <Container className="flex flex-col space-y-5 md:space-y-8 py-6">
      <HeaderTagSection total={total} />
      <InfiniteScroll
        scrollThreshold={0.9}
        dataLength={data?.length}
        next={fetchNextPage}
        hasMore={hasNextPage}
        className="contents"
        loader={
          <div className="flex justify-center pb-2 pt-6 items-center">
            <Loader className="text-primary-400" />
          </div>
        }
      >
        <JobList isLoading={isLoading} items={data as never} />
      </InfiniteScroll>
    </Container>
  );
};

const HeaderTagSection: React.FC<{ total: number }> = ({ total: jobTotal }) => {
  const t = useTranslations();

  return (
    <div className="flex items-center space-x-4 px-1.5">
      <div
        data-aos="fade-right"
        className="flex items-center space-x-2.5 md:space-x-4"
      >
        <div className="w-1.5 h-6 md:h-7 shrink-0 border border-primary-400 bg-primary-400 rounded-xs"></div>
        <div className="font-bold text-gray-600 text-lg md:text-xl uppercase py-1 rounded-sm">
          {t("common.job-label")}
        </div>
      </div>

      <div data-aos="fade-up" className="grow h-[1px] bg-gray-200/70" />

      <div data-aos="fade-left" className="flex items-center space-x-2.5">
        <span className="text-gray-500 text-sm md:text-base">
          {t("common.search-result", {
            total: `${jobTotal > 0 ? jobTotal : 0}`,
          })}
        </span>
      </div>
    </div>
  );
};
