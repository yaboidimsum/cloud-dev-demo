import "@/app/clip-path.css";

interface DivClipPathProps {
  text: string;
  variant?: "primary" | "secondary" | "warning" | "danger";
}

const variantStyles: Record<
  NonNullable<DivClipPathProps["variant"]>,
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

export default function DivClipPathButton({
  text,
  variant = "primary",
}: DivClipPathProps) {
  const { bg, text: textColor } = variantStyles[variant];

  return (
    <div
      className={`image-reveal relative flex h-10 w-fit items-center gap-2 rounded-md ${bg} ${textColor} px-6 font-medium `}
    >
      {text}
    </div>
  );
}
