type IResponseWrapper<T> = {
  msg: string;
  code: number;
  data: T;
};

type CMSType = "news" | "job" | "rental" | "feibo";

export interface IFilterOptions {
  platType: CMSType;
  langCode: Locale;
}

interface SearchInnerFilter {
  fieldId?: number;
  values?: string[];
  fieldName?: "searchText";
  inputText?: string;
}

export interface ISearchOptions {
  contentType: CMSType;
  langCode: Locale;
  pageNum: number;
  pageSize: number;
  filters: Array<SearchInnerFilter>;
}

export interface IDetailFilterOptions {
  id: number;
}

export interface IFilterValue {
  id: number;
  createTime: string;
  updateTime: string;
  fieldId: number;
  fieldValue: string;
  valueText: string;
  sort: number;
  status: number;
  parentId: number | null;
}

//-- Filter Option
export interface IFilter {
  id: number;
  createTime: string;
  updateTime: string;
  platType: CMSType;
  langCode: string;
  sort: number;
  fullSort: string;
  parentId: number;
  fieldName: string;
  displayName: string;
  fieldType: string;
  operator: string;
  status: number;
  code: string;
  parentCode: string;
  parentName: string;
  parentDisplay: string;
  level: number;
  childId: string | number | null;
  values: Array<IFilterValue>;
}

export interface IMedia {
  id: number;
  createTime: string;
  updateTime: string;
  contentId: number;
  mediaType: string;
  url: string;
  sort: number;
  altText: string;
}

interface Metadata {
  Job_title: string;
  job_tag: string;
  job_qlft: string;
  job_type: string;
  job_salary: string;
  job_benefits: string;
  job_exp_date: string;
  job_location: string;
  job_position: string;
  working_time: string;
  company_intro: string;
  job_hire_nums: number;
  job_pos_level: string;
  working_hours: string;
  job_experience: string;
  job_description: string;
  job_requirement: string;
  applicant_gender: string;
  job_created_date: string;
  job_responsibility: string;
}

export interface IJob {
  id: number;
  createTime: string;
  updateTime: string;
  contentId: number;
  platType: CMSType;
  status: number;
  code: string;
  regionCode: string;
  isFeatured: number;
  publishTime: string;
  langCode: Locale;
  langId: number;
  title: string;
  body: string;
  summary: string;
  seoTitle: string;
  seoDescription: string;
  searchText: string;
  url: string | null;
  categoryCodes: string[] | null;
  meta: Metadata;
  medias: IMedia[];
  actionTarget: { id: number; url: string | null };
}

//--- All export responses
export type IFilterResponse = IResponseWrapper<Array<IFilter>>;
export type IJobDetailResponse = IResponseWrapper<IJob>;
export type IJobListResponses = IResponseWrapper<{
  total: number;
  data: Array<IJob>;
}>;
