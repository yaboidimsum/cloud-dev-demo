import "@/app/clip-path.css";
import { ReactNode } from "react";

interface ClipPathProps {
  textBefore: string;
  textAfter?: string;
  logo?: ReactNode;
  variant?: "primary" | "secondary" | "warning" | "danger";
}

const variantStyles: Record<
  NonNullable<ClipPathProps["variant"]>,
  { bg: string; text: string }
> = {
  primary: {
    bg: "bg-blue-600/100",
    text: "text-blue-50",
  },
  secondary: {
    bg: "bg-zinc-300",
    text: "text-zinc-800",
  },
  warning: {
    bg: "bg-amber-500",
    text: "text-amber-50",
  },
  danger: {
    bg: "bg-rose-500",
    text: "text-rose-50",
  },
};

export default function ClipPathButton({
  textBefore,
  textAfter,
  logo,
  variant = "primary",
}: ClipPathProps) {
  const { bg, text: textColor } = variantStyles[variant];

  return (
    <button className="button relative flex h-10 w-fit items-center gap-2 rounded-full bg-[#f6f5f5] px-6 font-medium text-[#21201c] transition-transform duration-150 hover:cursor-pointer">
      <div
        className={`active:duration-[2000ms] hold-overlay absolute inset-0 flex items-center justify-center gap-2 rounded-full ${bg} ${textColor}`}
      >
        {logo}
        {textAfter ? textAfter : textBefore}
      </div>
      {logo}
      {textBefore}
    </button>
  );
}
