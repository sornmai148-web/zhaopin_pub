import { cn } from "@/lib/utils";
import { ArrowDownWideNarrow, List } from "lucide-react";

interface Props {
  label: string;
  className?: string;
  total: string;
}

export const TitleTagline: React.FC<Props> = ({ label, className, total }) => (
  <div
    className={cn(
      "max-lg:pt-2 max-lg:px-1.5 max-lg:pb-4 lg:pb-6 flex items-center justify-between space-x-4",
      className
    )}
  >
    <div className="flex items-center space-x-2">
      <button>
        <List className="size-6 text-primary-500" />
      </button>
      <h4 className="text-sm sm:text-lg font-bold text-quaternary">{label}</h4>
    </div>
    <div className="grow h-[1px] bg-gray-100 rounded-2xl" />
    <div className="flex items-center space-x-1.5">
      <button className="cursor-pointer hover:scale-105 duration-300 transition-transform">
        <ArrowDownWideNarrow className="size-4 text-primary-500" />
      </button>
      <span className="text-sm">{total}</span>
    </div>
  </div>
);
