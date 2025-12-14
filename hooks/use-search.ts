import { getJobList } from "@/api/resource";
import { ROUTES } from "@/config/routes";
import { useInfiniteQuery } from "@tanstack/react-query";
import { isEmpty } from "lodash";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { sleep } from "radash";
import { useState } from "react";

export const useSearch = (queryParams: QueryParams) => {
  const {
    search,
    parentFieldId,
    subFieldId,
    parentFieldValues,
    subFieldValues,
  } = queryParams || {};
  const [total, setTotal] = useState(0);

  const router = useRouter();
  const locale = useLocale();

  const PAGE_LIMIT = 20;

  const validSearchKeyword =
    (search || "")?.length > 50 ? search?.slice(0, 50) : search;

  const searchByKeyword = {
    fieldName: "searchText",
    inputText: validSearchKeyword,
  };

  //-- Filter second level
  // const filterByParentId = {
  //   fieldId: parentFieldId,
  //   values: parentFieldValues?.split(",") || [],
  //   ...(validSearchKeyword
  //     ? { fieldName: "searchText", inputText: validSearchKeyword }
  //     : {}),
  // };

  const parentFieldValueSlpit = parentFieldValues?.split(",") || [];
  const filterByParentId = !parentFieldValueSlpit?.length
    ? []
    : parentFieldValueSlpit?.map((x) => ({
        fieldId: parentFieldId,
        values: [x],
      }));

  //-- Filter third level
  // const filterBySubId = {
  //   fieldId: subFieldId,
  //   values: subFieldValues?.split(",") || [],
  //   ...(validSearchKeyword
  //     ? { fieldName: "searchText", inputText: validSearchKeyword }
  //     : {}),
  // };

  const subFieldValueSlpit = subFieldValues?.split(",") || [];
  const filterBySubId = !subFieldValueSlpit?.length
    ? []
    : subFieldValueSlpit?.map((x) => ({
        fieldId: subFieldId,
        values: [x],
      }));

  //-- Combine parent & sub filter
  const secondLevelFilter = Boolean(parentFieldId) ? filterByParentId : [{}];
  const thirdLevelFilter = Boolean(subFieldId) ? filterBySubId : [{}];

  const searchFilter = [
    ...[
      validSearchKeyword
        ? { fieldName: "searchText", inputText: validSearchKeyword }
        : {},
    ],
    ...secondLevelFilter,
    ...thirdLevelFilter,
  ]?.filter((f) => !isEmpty(f));

  // const searchFilter = [secondLevelFilter, thirdLevelFilter]?.filter(
  //   (f) => !isEmpty(f)
  // );

  const {
    isFetching,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    data,
  } = useInfiniteQuery({
    queryKey: [
      "job-search",
      locale,
      validSearchKeyword,
      parentFieldId,
      subFieldId,
      parentFieldValues,
      subFieldValues,
    ],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const response = await getJobList({
        contentType: "job",
        langCode: locale || "en",
        pageNum: pageParam || 1,
        pageSize: PAGE_LIMIT,
        filters:
          !parentFieldId && !subFieldId && search
            ? [searchByKeyword]
            : searchFilter,
      });

      if (response?.code != 200) {
        return router.replace(ROUTES.SERVER_ERROR);
      }

      setTotal(response?.data?.total || 0);
      await sleep(1000);

      return response;
    },

    getNextPageParam: (lastPage, __, lastPageParam) => {
      const page =
        (lastPage?.data?.data?.length || 0) < PAGE_LIMIT
          ? undefined
          : lastPageParam + 1;

      return page;
    },
  });

  const flatData =
    data?.pages
      .flatMap((x) => x?.data?.data)
      ?.map((j) => {
        const jProps = j?.meta;

        return {
          id: j?.id,
          jobTitle: jProps?.Job_title || "",
          jobType: jProps?.job_type || "",
          jobPos: jProps?.job_pos_level || "",
          jobExp: jProps?.job_experience || "",
          jobQlft: jProps?.job_qlft || "",
          jobSalary: jProps?.job_salary || "",
          jobCate: jProps?.job_position,
          jobRecruitPosNums: jProps?.job_hire_nums || 0,
          jobLocate: jProps?.job_location || "",
          jobTag: jProps?.job_tag,
          jobCreatedAt: jProps?.job_created_date || "",
          jobExpiryAt: jProps?.job_exp_date || "",
        };
      }) || [];

  return {
    isFetching,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    data: flatData,
    total,
  };
};
