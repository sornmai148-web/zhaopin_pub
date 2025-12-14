import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const selectStyleClassName = `cursor-pointer w-full text-gray-600 !h-full text-[15px] [&_small]:hidden border-none shadow-none focus-visible:ring-0 [&_>svg]:bg-primary-100 [&_>svg]:text-primary-600 [&_>svg]:size-6 [&_>svg]:p-1 [&_>svg]:rounded-md [&_span]:font-normal`;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
