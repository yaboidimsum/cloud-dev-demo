import { clsx } from "clsx";
import FeedbackPopOverStyle from "./feedback-pop-over.module.css";

const bars = Array(12).fill(0);

interface CustomCSSProperties extends React.CSSProperties {
  [key: `--${string}`]: string | number;
}

interface SpinnerProps {
  color: string;
  size?: number;
}

export function Spinner({ color, size = 20 }: SpinnerProps) {
  return (
    <div
      className={clsx(FeedbackPopOverStyle.wrapper)}
      style={
        {
          ["--spinner-size"]: `${size}px`,
          ["--spinner-color"]: color,
        } as CustomCSSProperties
      }
    >
      <div className={`${FeedbackPopOverStyle.spinner}`}>
        {bars.map((_, i) => (
          <div
            className={`${FeedbackPopOverStyle.bar}`}
            key={`spinner-bar-${i}`}
          />
        ))}
      </div>
    </div>
  );
}
