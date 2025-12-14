"use client";

import {
  Select,
  SelectContent,
  SelectIndicator,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGlobalSelectIdStore } from "@/hooks/use-global-select-id";
import { cn } from "@/lib/utils";
import { CircleCheck, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useBoolean } from "usehooks-ts";
import { SelectItemType } from "./interface";

interface Props {
  id: number;
  defaultValue?: string;
  className?: string;
  placeholder?: string;
  items: Array<SelectItemType>;
  onValueChange?: (item: SelectItemType) => void;
  onRemoveSelecedValue?: () => void;
}

export const FilterSelectWithoutStyle: React.FC<Props> = (props) => {
  const [selected, setSelected] = useState(props.defaultValue || "");
  const { value: open, toggle, setFalse } = useBoolean();
  const { activeId, setActiveId } = useGlobalSelectIdStore();
  const { className, placeholder, items, onValueChange, onRemoveSelecedValue } =
    props;

  useEffect(() => {
    if (activeId != props.id) {
      setFalse();
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId]);

  useEffect(() => {
    if (!!!props.defaultValue) {
      setSelected("");
    }
  }, [props.defaultValue]);

  return (
    <Select
      value={selected}
      open={props.id == activeId && open}
      indicatorPosition="right"
      onValueChange={(v) => {
        if (!Boolean(v) || !items?.length) return;
        const selectedValue = items?.find((x) => x?.value == v);
        onValueChange?.(selectedValue as SelectItemType);
        setSelected(v);
      }}
      onOpenChange={() => {
        toggle();
        setActiveId(props.id);
      }}
      indicator={
        <SelectIndicator>
          <CircleCheck className="fill-primary-500 size-5 text-white" />
        </SelectIndicator>
      }
    >
      <div className="relative w-full">
        <SelectTrigger
          defaultValue="read_only"
          className={cn(
            "cursor-pointer w-full text-gray-600 !h-full text-[15px] [&_small]:hidden border-none shadow-none focus-visible:ring-0 [&_>svg]:bg-primary-100 [&_>svg]:text-primary-600 [&_>svg]:size-6 [&_>svg]:p-1 [&_>svg]:rounded-md [&_span]:font-normal",
            className
          )}
        >
          <SelectValue placeholder={placeholder || ""} />
        </SelectTrigger>
        {!!selected && (
          <div
            role="button"
            className="cursor-pointer absolute top-1/2 -translate-y-1/2 right-11 z-10"
            onClick={() => {
              setSelected("");
              onRemoveSelecedValue?.();
            }}
          >
            <X className="size-3.5 text-red-500" />
          </div>
        )}
      </div>
      <SelectContent className="w-full mt-4">
        {(items || [])?.map((x, i) => (
          <SelectItem key={i} value={x?.value}>
            {x?.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export const FilterSelect: React.FC<Props> = (props) => {
  const [selected, setSelected] = useState(props.defaultValue || "");
  const { value: open, toggle, setFalse } = useBoolean();
  const { activeId, setActiveId } = useGlobalSelectIdStore();
  const {
    defaultValue,
    className,
    placeholder,
    items,
    onValueChange,
    onRemoveSelecedValue,
  } = props;

  useEffect(() => {
    if (activeId != props.id) {
      setFalse();
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId]);

  useEffect(() => {
    if (!!!props.defaultValue) {
      setSelected("");
    }
  }, [props.defaultValue]);

  return (
    <Select
      value={selected}
      open={props.id == activeId && open}
      indicatorPosition="right"
      onValueChange={(v) => {
        if (!Boolean(v) || !items?.length) return;
        const selectedValue = items?.find((x) => x?.value == v);
        onValueChange?.(selectedValue as SelectItemType);
        setSelected(v);
      }}
      onOpenChange={() => {
        toggle();
        setActiveId(props.id);
      }}
      indicator={
        <SelectIndicator>
          <CircleCheck className="fill-primary-500 size-5 text-white" />
        </SelectIndicator>
      }
    >
      <div className="relative w-full">
        <SelectTrigger
          defaultValue={selected || defaultValue}
          className={cn(
            "cursor-pointer w-full text-gray-600 xl:h-10 text-sm [&_small]:hidden border-none shadow-none focus-visible:ring-0 [&_>svg]:bg-primary-100 [&_>svg]:text-primary-600 [&_>svg]:size-6 [&_>svg]:p-1 [&_>svg]:rounded-md [&_span]:font-normal",
            className
          )}
        >
          <SelectValue placeholder={placeholder || "请选择选项"} />
        </SelectTrigger>

        {!!selected && (
          <div
            role="button"
            className="max-lg:hidden cursor-pointer absolute top-1/2 -translate-y-1/2 right-10 z-10"
            onClick={() => {
              setSelected("");
              onRemoveSelecedValue?.();
            }}
          >
            <X className="size-3.5 text-red-500" />
          </div>
        )}
      </div>
      <SelectContent className="w-full">
        {(items || [])?.map((x, i) => (
          <SelectItem key={i} value={x?.value}>
            {x?.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
