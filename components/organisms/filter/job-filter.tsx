import { FilterSelect, FilterSelectWithoutStyle } from "./filter-select";
import { JobFilterProps, SelectItemType } from "./interface";

interface Props {
  id: number;
  type?: "style" | "normal";
  parentId: number;
  placeholder: string;
  defaultValue?: string;
  secondLevel: Array<JobFilterProps>;
  thirdLevel: Array<JobFilterProps>;
  onValueChange: (item: SelectItemType) => void;
  onRemoveSelecedValue?: () => void;
  className?: string;
}

export const JobFilter: React.FC<Props> = (props) => {
  const {
    id,
    type = "normal",
    parentId,
    placeholder,
    secondLevel,
    thirdLevel,
    defaultValue,
    className,
    onValueChange,
    onRemoveSelecedValue,
  } = props;

  const secondLevels = (secondLevel || [])?.filter(
    (x) => x?.parentId == parentId
  );

  const options = (secondLevels || [])
    ?.map((y) => thirdLevel?.filter((z) => z?.parentId == y?.selfId))
    ?.flatMap((f) =>
      f?.map((w) => ({
        label: w?.selfDisplayName,
        value: w?.selfFieldValue,
        fieldId: w?.selfFieldId,
      }))
    );

  if (type == "style")
    return (
      <FilterSelectWithoutStyle
        id={id}
        defaultValue={defaultValue}
        placeholder={placeholder}
        items={options}
        onValueChange={onValueChange}
        onRemoveSelecedValue={onRemoveSelecedValue}
        className={className}
      />
    );

  return (
    <FilterSelect
      id={id}
      placeholder={placeholder}
      defaultValue={defaultValue}
      items={options}
      onValueChange={onValueChange}
      onRemoveSelecedValue={onRemoveSelecedValue}
      className={className}
    />
  );
};
