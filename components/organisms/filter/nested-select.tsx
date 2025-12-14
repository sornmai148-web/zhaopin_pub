"use client";

import { useEffect, useId, useState } from "react";
import { useBoolean } from "usehooks-ts";
import { useGlobalSelectIdStore } from "@/hooks/use-global-select-id";
import _ from "lodash";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Check, ChevronDown, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { JobFilterProps, JobFiltersProps } from "./interface";
import { useQueryParamsV2 } from "@/hooks/use-query-params-v2";
import { isEmpty } from "radash";

interface Props {
  id: number;
  parentId: number;
  className?: string;
  placeholder?: string;
  level2: JobFiltersProps;
  level3: JobFiltersProps;
}

const finalActiveItemDefaultState = {
  parentId: null,
  selfId: -1,
  selfFieldId: -1,
  selfFieldValue: "",
  selfDisplayName: "",
};

export const NestedSelect: React.FC<Props> = (props) => {
  const [finalActiveItem, setFinalActiveItem] = useState<JobFilterProps>(
    finalActiveItemDefaultState
  );

  const selectId = useId();
  const [subActiveId, setSubActiveId] = useState(-1);
  const { value: open, toggle } = useBoolean();
  const { activeId, setActiveId } = useGlobalSelectIdStore();

  const {
    parentFieldId,
    subFieldId,
    subFieldValues,
    parentFieldValues,
    updateParentFieldValues,
    removeParentFieldValues,
    removeSubFieldValue,
    updateSubFieldValues,
  } = useQueryParamsV2();

  const filterLevel2 = (props?.level2 || [])?.filter(
    (f) => f.parentId == props.parentId
  );

  useEffect(() => {
    const defaultFromQs = _.intersection(
      parentFieldValues?.split(","),
      filterLevel2?.map((y) => y?.selfFieldValue)
    );

    if (isEmpty(defaultFromQs)) return;

    const defaultActiveItem = filterLevel2?.find(
      (x) => x?.selfFieldValue == defaultFromQs?.[0]
    );

    setFinalActiveItem(defaultActiveItem || finalActiveItemDefaultState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      !parentFieldId &&
      !subFieldId &&
      !subFieldValues &&
      !parentFieldValues
    ) {
      setFinalActiveItem(finalActiveItemDefaultState);
    }
  }, [parentFieldId, subFieldId, subFieldValues, parentFieldValues]);

  return (
    <Select
      key={selectId}
      value={finalActiveItem.selfFieldValue}
      open={props.id == activeId && open}
      onOpenChange={() => {
        toggle();
        setActiveId(props.id);
      }}
      onValueChange={(v) => {
        if (!Boolean(v) || !props?.level2?.length) return;
        const selectedValue = props?.level2?.find(
          (x) => x?.selfFieldValue == v
        );

        removeSubFieldValue(finalActiveItem?.selfFieldValue);

        updateParentFieldValues({
          fieldId: `${selectedValue?.selfFieldId}`,
          fieldValue: selectedValue?.selfFieldValue as string,
          preFieldValue: finalActiveItem?.selfFieldValue,
        });

        setFinalActiveItem(selectedValue as JobFilterProps);
      }}
    >
      <div className="relative w-full">
        <SelectTrigger
          defaultValue={finalActiveItem.selfFieldValue}
          className={cn(
            "bg-white focus-visible:outline-0 cursor-pointer w-full text-gray-600 xl:h-10 text-sm [&_small]:hidden border-none shadow-none focus-visible:ring-0 [&_>svg]:bg-primary-100 [&_>svg]:text-primary-600 [&_>svg]:size-6 [&_>svg]:p-1 [&_>svg]:rounded-md [&_span]:font-normal",
            props.className
          )}
        >
          <span>
            {!finalActiveItem?.selfDisplayName
              ? props?.placeholder || "请选择选项"
              : finalActiveItem?.selfDisplayName?.trim()}
          </span>
        </SelectTrigger>

        {!!finalActiveItem?.selfFieldValue && (
          <div
            role="button"
            className="cursor-pointer absolute top-1/2 -translate-y-1/2 right-10 z-10"
            onClick={() => {
              removeParentFieldValues(finalActiveItem?.selfFieldValue);
              removeSubFieldValue(finalActiveItem?.selfFieldValue);
              setFinalActiveItem(finalActiveItemDefaultState);
            }}
          >
            <X className="size-3.5 text-red-500" />
          </div>
        )}
      </div>

      <SelectContent position="popper" className="!overflow-x-hidden">
        {(filterLevel2 || [])?.map((x, i) => (
          <div key={i}>
            <SubSelect
              id={i}
              mainActiveId={subActiveId}
              activeSelectItem={finalActiveItem}
              autoOpenSubLevel={filterLevel2?.length == 1}
              mainSelectItem={
                <div className="relative w-full">
                  <SelectItem
                    className={
                      x?.selfFieldValue == finalActiveItem?.selfFieldValue
                        ? "bg-gray-50"
                        : "!bg-transparent hover:!bg-gray-100 duration-200 !px-4 ransition-colors"
                    }
                    value={x?.selfFieldValue}
                  >
                    {x?.selfDisplayName?.trim()}
                  </SelectItem>

                  {x?.selfId == finalActiveItem?.selfId && (
                    <span className="absolute top-1/2 -translate-y-1/2 right-2 p-1 bg-primary-400 rounded-2xl">
                      <Check className="size-2.5 text-white" />
                    </span>
                  )}
                </div>
              }
              items={(props?.level3 || {})?.filter(
                (y) => y.parentId == x?.selfId
              )}
              onPropagateActive={(activeId) => setSubActiveId(activeId)}
              onValueSelect={(item) => {
                removeParentFieldValues(finalActiveItem?.selfFieldValue);
                updateSubFieldValues({
                  fieldId: `${item?.selfFieldId}`,
                  fieldValue: item?.selfFieldValue as string,
                  preFieldValue: finalActiveItem?.selfFieldValue,
                });
                setFinalActiveItem(item);
                toggle();
              }}
            />
          </div>
        ))}
      </SelectContent>
    </Select>
  );
};

interface SubSelectProps {
  id: number;
  mainActiveId?: number;
  mainSelectItem: React.ReactNode;
  activeSelectItem: JobFilterProps;
  items: JobFiltersProps;
  autoOpenSubLevel?: boolean;
  onValueSelect?: (item: JobFilterProps) => void;
  onPropagateActive: (activeId: number) => void;
}

const defaultSubSelectState = {
  open: false,
  activeId: -1,

  //--
  parentId: -1,
  selfId: -1,
  selfFieldId: -1,
  selfFieldValue: "",
  selfDisplayName: "",
};

const SubSelect: React.FC<SubSelectProps> = (props) => {
  const {
    id,
    mainActiveId,
    mainSelectItem,
    activeSelectItem,
    items,
    onValueSelect,
    onPropagateActive,
  } = props;

  const [activeItem, setActiveItem] = useState(defaultSubSelectState);
  const { subFieldValues } = useQueryParamsV2();

  const shouldOpen = mainActiveId == id && activeItem.open;

  useEffect(() => {
    const hasSomeExist = items?.some(
      (i) => i?.selfFieldValue == activeSelectItem?.selfFieldValue
    );

    if (hasSomeExist) {
      setActiveItem((pre) => ({ ...pre, open: true }));
      return;
    }

    //-- Find active item from QS
    const defaultFromQs = _.intersection(
      subFieldValues?.split(","),
      items?.map((y) => y?.selfFieldValue)
    );

    if (isEmpty(defaultFromQs)) return;

    const defaultActiveItem = items?.find(
      (x) => x?.selfFieldValue == defaultFromQs?.[0]
    );

    onValueSelect?.(defaultActiveItem || defaultSubSelectState);
    setActiveItem((pre) => ({ ...pre, open: true }));
    onPropagateActive(id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (mainActiveId != id) {
      setActiveItem(defaultSubSelectState);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainActiveId]);

  useEffect(() => {
    if (Boolean(props?.autoOpenSubLevel)) {
      setActiveItem((pre) => ({ ...pre, open: true }));
      onPropagateActive(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Collapsible
      open={shouldOpen}
      onOpenChange={() =>
        setActiveItem((pre) => ({
          ...pre,
          open: !activeItem.open,
        }))
      }
    >
      <div className="w-full flex items-center justify-between mt-1">
        {mainSelectItem}
        <CollapsibleTrigger asChild>
          {items?.length > 0 && (
            <button
              className="p-1 cursor-pointer"
              onClick={() => onPropagateActive(id)}
            >
              {shouldOpen ? (
                <ChevronDown className="size-4 text-primary-400" />
              ) : (
                <ChevronRight className="size-4 text-primary-400" />
              )}
            </button>
          )}
        </CollapsibleTrigger>
      </div>

      {items?.length > 0 && (
        <CollapsibleContent>
          <div className="w-full py-2 px-4 flex flex-col space-y-1">
            {(items || [])?.map((s, i) => {
              const active =
                s.selfFieldValue == activeItem.selfFieldValue ||
                s.selfFieldValue == activeSelectItem?.selfFieldValue;

              return (
                <div
                  role="button"
                  key={i}
                  className={cn(
                    "px-2.5 py-1.5 hover:bg-gray-100 rounded-sm flex items-center justify-between",
                    {
                      "bg-gray-100": active,
                    }
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    onValueSelect?.(s);
                  }}
                >
                  <p className="text-sm text-gray-500">{s.selfDisplayName}</p>
                  {active && (
                    <span className="p-1 bg-primary-400 rounded-2xl">
                      <Check className="size-2.5 text-white" />
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </CollapsibleContent>
      )}
    </Collapsible>
  );
};
