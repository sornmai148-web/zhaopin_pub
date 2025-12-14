export interface JobFilterProps {
  parentId: number | null;
  selfId: number;
  selfFieldId: number;
  selfFieldValue: string;
  selfDisplayName: string;
}

export type JobFiltersProps = Array<JobFilterProps>;

export type SelectItemType = { label: string; value: string; fieldId: number };
