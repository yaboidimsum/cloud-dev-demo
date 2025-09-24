import { clsx } from "clsx";
import BasicFrammerButton from "./basic-frammer-button.module.css";

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
      className={clsx(BasicFrammerButton.wrapper)}
      style={
        {
          ["--spinner-size"]: `${size}px`,
          ["--spinner-color"]: color,
        } as CustomCSSProperties
      }
    >
      <div className={`${BasicFrammerButton.spinner}`}>
        {bars.map((_, i) => (
          <div
            className={`${BasicFrammerButton.bar}`}
            key={`spinner-bar-${i}`}
          />
        ))}
      </div>
    </div>
  );
}
