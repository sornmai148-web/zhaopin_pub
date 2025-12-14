import { JobFiltersProps } from "./interface";

export const getTransformFilters = (data: JobFiltersProps) => {
  const jobLocation = data?.find((x) =>
    ["Location", "地区"]?.includes(x?.selfDisplayName)
  );

  const jobPosition = data?.find((x) =>
    ["Job Position", "岗位"]?.includes(x?.selfDisplayName)
  );

  const jobType = data?.find((x) =>
    ["Job Type", "招聘类型"]?.includes(x?.selfDisplayName)
  );

  const jobLevel = data?.find((x) =>
    ["Job Level", "岗位职级"]?.includes(x?.selfDisplayName)
  );

  const jobQualification = data?.find((x) =>
    ["Education", "学历"]?.includes(x?.selfDisplayName)
  );

  const jobExperience = data?.find((x) =>
    ["Experience", "经验"]?.includes(x?.selfDisplayName)
  );

  //-- This approach is manually get each select value , if there is more , follow the same structure.
  return {
    jobLocation,
    jobExperience,
    jobPosition,
    jobLevel,
    jobType,
    jobQualification,
  };
};
