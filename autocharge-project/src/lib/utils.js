import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// This is required for shadcn components to work
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}