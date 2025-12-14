import { cn } from "@/lib/utils";

interface Props extends React.PropsWithChildren {
  className?: string;
}

export const Container: React.FC<Props> = ({ children, className }) => (
  <div
    className={cn(
      "px-3 sm:px-14 md:px-8 lg:px-12 xl:px-16 2xl:max-w-[95rem] 2xl:mx-auto",
      className
    )}
  >
    {children}
  </div>
);
