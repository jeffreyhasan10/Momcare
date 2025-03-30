
import { cva } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button";

export const extendedButtonVariants = cva(
  buttonVariants({ variant: "default", size: "default" }),
  {
    variants: {
      variant: {
        pink: "bg-pink-500 text-white hover:bg-pink-600",
        "outline-pink": "border-2 border-pink-300 text-pink-600 hover:bg-pink-50 bg-white",
        "ghost-pink": "hover:bg-pink-100 text-pink-600 hover:text-pink-700"
      },
    },
  }
);
