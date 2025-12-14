"use client";

import { useEffect, useRef } from "react";
import { useScreen } from "usehooks-ts";
import { Input } from "@/components/ui/input";
import { useGlobalSearchStore } from "@/hooks/use-global-search";
import { cn } from "@/lib/utils";
import { useQueryParamsV2 } from "@/hooks/use-query-params-v2";

interface Props {
  type?: "mobile" | "desktop";
  placeholder?: string;
  defaultValue?: string;
  className?: string;
}

export const SearchInput: React.FC<Props> = ({
  placeholder = "搜索工作标题 ...",
  className,
}) => {
  const { search: keywords, updateSearch } = useQueryParamsV2();
  const { search, setSearch } = useGlobalSearchStore();
  const screen = useScreen();

  const inputRef = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (!screen?.width) return;
    inputRef.current.value = search || keywords;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen?.width]);

  //-- This function trigger when no keywords to search for
  useEffect(() => {
    if (!!!keywords && inputRef.current) {
      inputRef.current.value = "";
      updateSearch("");
      setSearch("");
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keywords]);

  return (
    <Input
      type="search"
      ref={inputRef}
      placeholder={placeholder}
      maxLength={50}
      className={cn(
        "border-none shadow-none focus-visible:ring-0 text-[15px]",
        className
      )}
      onChange={(event) => {
        if (!event.target.value) {
          updateSearch("");
          setSearch("");
        }
        setSearch(event.target.value);
      }}
    />
  );
};
