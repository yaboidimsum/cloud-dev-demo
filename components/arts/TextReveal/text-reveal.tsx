"use client";
import textReveal from "./text-reveal.module.css";

interface CustomCSSProperties extends React.CSSProperties {
  [key: `--${string}`]: string | number;
}

interface TextRevealProp {
  text?: string;
  placeholder?: string;
}

export default function TextReveal({
  text,
  placeholder = "Placeholder text",
}: TextRevealProp) {
  // Use placeholder if text is empty/undefined
  const displayText = text && text.trim().length > 0 ? text : placeholder;

  return (
    <div>
      <div className={textReveal.box}>
        <h1 className={textReveal.h1}>
          {displayText.split("").map((char, index) => (
            <span
              key={index}
              style={{ "--index": index } as CustomCSSProperties}
            >
              {char}
            </span>
          ))}
        </h1>
      </div>

      {/* Optional: Replay animation */}
      {/* <button
        className={textReveal.button}
        onClick={() => setReset(reset + 1)}
      >
        Replay animation
      </button> */}
    </div>
  );
}
