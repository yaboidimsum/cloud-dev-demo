import Link from "next/link";
import { notFound } from "next/navigation";
import { X, Trash } from "lucide-react";
import {
  ClipPathButton,
  DivClipPathButton,
  TextReveal,
  CardPopHover,
  SmoothButton,
  Toaster,
  DynamicDrawer,
  FeedbackPopOver,
  MultiStepCard,
  InteractiveGraphAlt,
  TrashAnimation,
  VaulDrawer,
  DynamicIsland,
  FireField,
} from "@/components/arts";
import NavSearchBar from "@/components/arts/NavSearchBar/nav-search-bar";
import CopyablePre from "@/components/copyable-pre";

interface PageProps {
  params: Promise<{ id: string }>;
}

interface ArtItem {
  title: string;
  component: React.ReactNode;
  tags: string[];
  publishedOn: string;
  explanation: React.ReactNode;
}

const MINECRAFT_FIRE_PROMPT = `Build this: Minecraft fire on a 2D canvas: a 16x16, 32-frame flipbook drawn as crisp blocks, with a live mutable pixel buffer the cursor can physically edit (shoving lit pixels around and heating them) that heals back toward the animation over time.

The complete, self-contained implementation follows, one file per block. It is framework-agnostic core logic — wire it into your own component and mount it on an element.

### fire-field/engine.ts
\`\`\`ts
import { isMuted } from "../../lib/sound";

const N = 16;
const FRAMES = 32;
const FPS = 18;

const BURN_RADIUS = 2.8;
const HEAL_RATE = 6.0;
const SWAY_MAX = 2.0;

const FIRE_FRAC = 0.6;

function decodeSheet(img: HTMLImageElement): ImageData[] {
  const c = document.createElement("canvas");
  c.width = N;
  c.height = N * FRAMES;
  const ctx = c.getContext("2d")!;
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(img, 0, 0);
  const out: ImageData[] = [];
  for (let f = 0; f < FRAMES; f++) out.push(ctx.getImageData(0, f * N, N, N));
  return out;
}

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

export type FireFieldOptions = {
  reduced?: boolean;
};

export class FireField {
  private stage: HTMLElement;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private reduced: boolean;

  private fireSnd: HTMLAudioElement | null = null;
  private fizzSnd: HTMLAudioElement | null = null;
  private fireWanted = false;
  private lastFizz = 0;

  private off: HTMLCanvasElement;
  private offCtx: CanvasRenderingContext2D;
  private buf: ImageData;

  private grid = new Float32Array(N * N * 4);
  private scratch = new Float32Array(N * N * 4);

  private dist = new Float32Array(N * N);
  private primed = false;

  private swayX = 0;
  private swayTarget = 0;

  private vel = { x: 0, y: 0 };
  private blobPhase = 0;

  private frames: ImageData[] | null = null;
  private netherrack: HTMLImageElement | null = null;

  private box = { x: 0, y: 0, size: 0, dpr: 1 };

  private pcell: { x: number; y: number } | null = null;
  private prevP: { x: number; y: number } | null = null;

  private hovering = false;
  private raf = 0;
  private wantRun = false;
  private last = 0;
  private acc = 0;
  private dead = false;

  constructor(stage: HTMLElement, opts: FireFieldOptions = {}) {
    this.stage = stage;
    this.reduced = !!opts.reduced;

    this.canvas = document.createElement("canvas");
    this.canvas.style.imageRendering = "pixelated";
    this.canvas.className = "pointer-events-none absolute inset-0 block h-full w-full";
    this.ctx = this.canvas.getContext("2d")!;
    this.stage.appendChild(this.canvas);

    try {
      this.fireSnd = new Audio("/vault/fire/fire.ogg");
      this.fireSnd.loop = true;
      this.fireSnd.volume = 0;
      this.fizzSnd = new Audio("/vault/fire/fizz.ogg");
      this.fizzSnd.volume = 0.18;
    } catch {}

    this.off = document.createElement("canvas");
    this.off.width = N;
    this.off.height = N;
    this.offCtx = this.off.getContext("2d")!;
    this.buf = this.offCtx.createImageData(N, N);

    this.resize();

    this.stage.addEventListener("pointermove", this.onMove, { passive: true });
    this.stage.addEventListener("pointerenter", this.onEnter);
    this.stage.addEventListener("pointerleave", this.onCardLeave);
    this.stage.addEventListener("pointerdown", this.onTap, { passive: true });

    loadImage("/vault/fire/netterack.png")
      .then((img) => { if (!this.dead) this.netherrack = img; })
      .catch(() => {});
    loadImage("/vault/fire/fire_sheet.png")
      .then((img) => {
        if (this.dead) return;
        this.frames = decodeSheet(img);
        this.kick();
      })
      .catch((e) => console.warn("fire texture:", e));
  }

  destroy() {
    this.dead = true;
    this.stage.removeEventListener("pointermove", this.onMove);
    this.stage.removeEventListener("pointerenter", this.onEnter);
    this.stage.removeEventListener("pointerleave", this.onCardLeave);
    this.stage.removeEventListener("pointerdown", this.onTap);
    if (this.fireSnd) this.fireSnd.src = "";
    if (this.fizzSnd) this.fizzSnd.src = "";
    this.canvas.remove();
  }
}
\`\`\`
`;

const ART_ITEMS: Record<string, ArtItem> = {
  "minecraft-fire": {
    title: "Minecraft Fire Canvas",
    component: <FireField />,
    tags: ["2d-physics", "canvas", "interactive"],
    publishedOn: "2026-08-01",
    explanation: (
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <p className="text-pretty text-zinc-800 dark:text-zinc-200">
            Minecraft fire on a 2D canvas: a 16x16, 32-frame flipbook drawn as crisp blocks, with a live mutable pixel buffer the cursor can physically edit (shoving lit pixels around and heating them) that heals back toward the animation over time.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 text-sm">
            Prompt:
          </h3>
          <CopyablePre language="markdown">
            {MINECRAFT_FIRE_PROMPT}
          </CopyablePre>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 text-sm">
            How to use this code:
          </h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
            <li>Framework-agnostic core logic — wire it into your own component and mount it on an element.</li>
            <li>Pass sprite sheet and netherrack base assets into the public asset pipeline.</li>
          </ul>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <h4 className="text-xs font-mono font-medium text-zinc-500 dark:text-zinc-400 mb-2">
              ### fire-field/fire-field.tsx
            </h4>
            <CopyablePre>
{`"use client";

import { useEffect, useRef } from "react";
import { FireField as FireEngine } from "./engine";

export function FireField() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const engine = new FireEngine(containerRef.current);
    return () => {
      engine.destroy();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[220px] bg-zinc-950 flex items-center justify-center overflow-hidden cursor-crosshair"
    />
  );
}`}
            </CopyablePre>
          </div>

          <div>
            <h4 className="text-xs font-mono font-medium text-zinc-500 dark:text-zinc-400 mb-2">
              ### fire-field/engine.ts
            </h4>
            <CopyablePre>
{`import { isMuted } from "@/lib/sound";

const N = 16;
const FRAMES = 32;
const FPS = 18;

const BURN_RADIUS = 2.8;
const HEAL_RATE = 6.0;
const SWAY_MAX = 2.0;

const FIRE_FRAC = 0.6;

function decodeSheet(img: HTMLImageElement): ImageData[] {
  const c = document.createElement("canvas");
  c.width = N;
  c.height = N * FRAMES;
  const ctx = c.getContext("2d")!;
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(img, 0, 0);
  const out: ImageData[] = [];
  for (let f = 0; f < FRAMES; f++) out.push(ctx.getImageData(0, f * N, N, N));
  return out;
}

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

export type FireFieldOptions = {
  reduced?: boolean;
};

export class FireField {
  private stage: HTMLElement;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private reduced: boolean;

  private fireSnd: HTMLAudioElement | null = null;
  private fizzSnd: HTMLAudioElement | null = null;
  private fireWanted = false;
  private lastFizz = 0;

  private off: HTMLCanvasElement;
  private offCtx: CanvasRenderingContext2D;
  private buf: ImageData;

  private grid = new Float32Array(N * N * 4);
  private scratch = new Float32Array(N * N * 4);

  private dist = new Float32Array(N * N);
  private primed = false;

  private swayX = 0;
  private swayTarget = 0;

  private vel = { x: 0, y: 0 };
  private blobPhase = 0;

  private frames: ImageData[] | null = null;
  private netherrack: HTMLImageElement | null = null;

  private box = { x: 0, y: 0, size: 0, dpr: 1 };

  private pcell: { x: number; y: number } | null = null;
  private prevP: { x: number; y: number } | null = null;

  private hovering = false;
  private raf = 0;
  private wantRun = false;
  private last = 0;
  private acc = 0;
  private dead = false;

  constructor(stage: HTMLElement, opts: FireFieldOptions = {}) {
    this.stage = stage;
    this.reduced = !!opts.reduced;

    this.canvas = document.createElement("canvas");
    this.canvas.style.imageRendering = "pixelated";
    this.canvas.className = "pointer-events-none absolute inset-0 block h-full w-full";
    this.ctx = this.canvas.getContext("2d")!;
    this.stage.appendChild(this.canvas);

    try {
      this.fireSnd = new Audio("/vault/fire/fire.ogg");
      this.fireSnd.loop = true;
      this.fireSnd.volume = 0;
      this.fizzSnd = new Audio("/vault/fire/fizz.ogg");
      this.fizzSnd.volume = 0.18;
    } catch {}

    this.off = document.createElement("canvas");
    this.off.width = N;
    this.off.height = N;
    this.offCtx = this.off.getContext("2d")!;
    this.buf = this.offCtx.createImageData(N, N);

    this.resize();

    this.stage.addEventListener("pointermove", this.onMove, { passive: true });
    this.stage.addEventListener("pointerenter", this.onEnter);
    this.stage.addEventListener("pointerleave", this.onCardLeave);
    this.stage.addEventListener("pointerdown", this.onTap, { passive: true });

    loadImage("/vault/fire/netterack.png")
      .then((img) => { if (!this.dead) this.netherrack = img; })
      .catch(() => {});
    loadImage("/vault/fire/fire_sheet.png")
      .then((img) => {
        if (this.dead) return;
        this.frames = decodeSheet(img);
        this.kick();
      })
      .catch((e) => console.warn("fire texture:", e));
  }

  destroy() {
    this.dead = true;
    this.stage.removeEventListener("pointermove", this.onMove);
    this.stage.removeEventListener("pointerenter", this.onEnter);
    this.stage.removeEventListener("pointerleave", this.onCardLeave);
    this.stage.removeEventListener("pointerdown", this.onTap);
    if (this.fireSnd) this.fireSnd.src = "";
    if (this.fizzSnd) this.fizzSnd.src = "";
    this.canvas.remove();
  }
}`}
            </CopyablePre>
          </div>
        </div>
      </div>
    ),
  },
  "clip-path-delete": {
    title: "Hold to Delete Button",
    component: (
      <ClipPathButton
        textBefore="Hold to Delete"
        textAfter="Deleting Stuffs!"
        logo={<Trash size={16} />}
        variant="danger"
      />
    ),
    tags: ["css", "clip-path"],
    publishedOn: "2025-09-18",
    explanation: (
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <p className="text-pretty text-zinc-800 dark:text-zinc-200">
            CSS Masking confirmation logic demonstrating how CSS clipping paths can build hold-to-confirm progress indicators without heavy event loops or JavaScript progress managers.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 text-sm">
            How to use this code:
          </h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
            <li>Drop the TSX component and CSS module into your project under the same directory.</li>
            <li>Customize the variant parameter (&quot;primary&quot;, &quot;danger&quot;, etc.) and hover durations.</li>
          </ul>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <h4 className="text-xs font-mono font-medium text-zinc-500 dark:text-zinc-400 mb-2">
              ### clip-path-button/clip-path-button.tsx
            </h4>
            <CopyablePre>
{`import clipPath from "./clip-path.module.css";
import { ReactNode } from "react";

interface ClipPathProps {
  textBefore: string;
  textAfter?: string;
  logo?: ReactNode;
  variant?: "primary" | "secondary" | "warning" | "danger";
}

const variantStyles = {
  primary: { bg: "bg-blue-600/100", text: "text-blue-50" },
  secondary: { bg: "bg-zinc-300", text: "text-zinc-800" },
  warning: { bg: "bg-amber-500", text: "text-amber-50" },
  danger: { bg: "bg-rose-500", text: "text-rose-50" },
};

export default function ClipPathButton({
  textBefore,
  textAfter,
  logo,
  variant = "primary",
}: ClipPathProps) {
  const { bg, text: textColor } = variantStyles[variant];

  return (
    <div
      className={\`\${clipPath.button} relative flex h-10 w-fit items-center gap-2 rounded-full bg-[#f6f5f5] px-6 font-medium text-[#21201c] transition-transform duration-150 hover:cursor-pointer\`\}
    >
      <div
        className={\`\${clipPath.holdOverlay} absolute inset-0 flex items-center justify-center gap-2 rounded-full \${bg} \${textColor} active:duration-[2000ms]\`\}
      >
        {logo}
        {textAfter ? textAfter : textBefore}
      </div>
      {logo}
      {textBefore}
    </div>
  );
}`}
            </CopyablePre>
          </div>

          <div>
            <h4 className="text-xs font-mono font-medium text-zinc-500 dark:text-zinc-400 mb-2">
              ### clip-path-button/clip-path.module.css
            </h4>
            <CopyablePre>
{`.button {
  transition: transform 0.15s ease-out;
}

.holdOverlay {
  clip-path: inset(0px 100% 0px 0px);
  transition: clip-path 0.2s ease-out;
}

.button:active {
  transform: scale(0.97);
}

.button:active .holdOverlay {
  clip-path: inset(0px 0px 0px 0px);
  transition: clip-path 2s linear;
}`}
            </CopyablePre>
          </div>
        </div>
      </div>
    ),
  },
  "text-reveal": {
    title: "Staggered Text Reveal",
    component: <TextReveal text="tvcarchase94" placeholder="Animation" />,
    tags: ["css", "keyframes", "stagger"],
    publishedOn: "2025-09-23",
    explanation: (
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <p className="text-pretty text-zinc-800 dark:text-zinc-200">
            Dynamic character reveal using CSS custom properties (--index) to stagger inline vertical translate keyframes across character spans.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 text-sm">
            How to use this code:
          </h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
            <li>Splits text prop into individual character spans.</li>
            <li>Applies CSS animation-delay calculated from calc(0.03s * var(--index)).</li>
          </ul>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <h4 className="text-xs font-mono font-medium text-zinc-500 dark:text-zinc-400 mb-2">
              ### text-reveal/text-reveal.tsx
            </h4>
            <CopyablePre>
{`"use client";
import textReveal from "./text-reveal.module.css";

interface TextRevealProp {
  text?: string;
  placeholder?: string;
}

export default function TextReveal({ text, placeholder = "Placeholder text" }: TextRevealProp) {
  const displayText = text && text.trim().length > 0 ? text : placeholder;

  return (
    <div>
      <div className={textReveal.box}>
        <h1 className={textReveal.h1}>
          {displayText.split("").map((char, index) => (
            <span key={index} style={{ "--index": index } as React.CSSProperties}>
              {char}
            </span>
          ))}
        </h1>
      </div>
    </div>
  );
}`}
            </CopyablePre>
          </div>

          <div>
            <h4 className="text-xs font-mono font-medium text-zinc-500 dark:text-zinc-400 mb-2">
              ### text-reveal/text-reveal.module.css
            </h4>
            <CopyablePre>
{`.h1 {
  font-size: 32px;
  font-weight: 600;
  letter-spacing: -0.05em;
}

.box {
  overflow: hidden;
}

.h1 span {
  display: inline-block;
  animation: Fadein 3s cubic-bezier(0.19, 1, 0.22, 1) backwards;
  animation-delay: calc(0.03s * var(--index));
  animation-iteration-count: infinite;
}

@keyframes Fadein {
  0% { transform: translateY(100%); }
  50% { transform: translateY(0%); }
  100% { transform: translateY(100%); }
}`}
            </CopyablePre>
          </div>
        </div>
      </div>
    ),
  },
  "clip-path-transform": {
    title: "Clip-Path with Transform",
    component: <DivClipPathButton text="Peek a Boo! 👻" variant="primary" />,
    tags: ["clip-path", "css"],
    publishedOn: "2025-09-23",
    explanation: (
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <p className="text-pretty text-zinc-800 dark:text-zinc-200">
            A continuous mask reveal transition that scales coordinates and clips inset boundaries simultaneously inside a single CSS keyframe loop.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 text-sm">
            How to use this code:
          </h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
            <li>Combines clip-path: inset() with transform: scale() keyframes.</li>
            <li>Keeps text aligned without layout distortion during scaling loops.</li>
          </ul>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <h4 className="text-xs font-mono font-medium text-zinc-500 dark:text-zinc-400 mb-2">
              ### div-transition/div-transition.tsx
            </h4>
            <CopyablePre>
{`import clipPath from "./clip-path.module.css";

interface DivClipPathProps {
  text: string;
  variant?: "primary" | "secondary" | "warning" | "danger";
}

export default function DivClipPathButton({ text, variant = "primary" }: DivClipPathProps) {
  return (
    <div className={\`\${clipPath.imageReveal} relative flex h-10 w-fit items-center gap-2 rounded-md bg-blue-600 text-blue-50 px-6 font-medium\`\}>
      {text}
    </div>
  );
}`}
            </CopyablePre>
          </div>
        </div>
      </div>
    ),
  },
  "card-hover": {
    title: "Card Hover Pop-Up",
    component: <CardPopHover />,
    tags: ["css", "transitions"],
    publishedOn: "2025-09-24",
    explanation: (
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <p className="text-pretty text-zinc-800 dark:text-zinc-200">
            Card hover effect that slides detailed descriptions dynamically upwards without affecting document layout boundaries.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 text-sm">
            How to use this code:
          </h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
            <li>Uses CSS translate Y matrices offset by card height margins.</li>
            <li>Smoothly transitions on hover and focus-visible triggers.</li>
          </ul>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <h4 className="text-xs font-mono font-medium text-zinc-500 dark:text-zinc-400 mb-2">
              ### card-pop-hover/card-pop-hover.tsx
            </h4>
            <CopyablePre>
{`import cardPopHover from "./card-pop-hover.module.css";

export default function CardPopHover() {
  return (
    <div className={\`\${cardPopHover.card}\`\}>
      <h1 className="pt-2 font-medium text-zinc-800">Hover Me!</h1>
      <div className={\`\${cardPopHover.cardDescription}\`\}>
        <h3 className={\`\${cardPopHover.cardTitle}\`\}>Project Title</h3>
        <p className={\`\${cardPopHover.cardSubtitle}\`\}>Hire me please!</p>
      </div>
    </div>
  );
}`}
            </CopyablePre>
          </div>

          <div>
            <h4 className="text-xs font-mono font-medium text-zinc-500 dark:text-zinc-400 mb-2">
              ### card-pop-hover/card-pop-hover.module.css
            </h4>
            <CopyablePre>
{`.card {
  width: 340px;
  height: 120px;
  border-radius: 16px;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}

.card:hover .cardDescription {
  transform: translateY(0%);
}

.cardDescription {
  --margin: 20px;
  border-radius: 12px;
  background: #fafafa;
  width: 100%;
  padding: 10px 14px 20px;
  transform: translateY(calc(100% + var(--margin) + 1px));
  transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
}`}
            </CopyablePre>
          </div>
        </div>
      </div>
    ),
  },
  "smooth-toast": {
    title: "Smooth Toast Toaster",
    component: <Toaster />,
    tags: ["css", "transitions"],
    publishedOn: "2025-09-25",
    explanation: (
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <p className="text-pretty text-zinc-800 dark:text-zinc-200">
            A modular popup notification engine utilizing local state queues and CSS transitions to shift cards dynamically in and out of view.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 text-sm">
            How to use this code:
          </h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
            <li>Tracks notification instances in React component state queues.</li>
            <li>Transforms vertical offsets dynamically per active stack index.</li>
          </ul>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <h4 className="text-xs font-mono font-medium text-zinc-500 dark:text-zinc-400 mb-2">
              ### toast-pop/toast-pop.tsx
            </h4>
            <CopyablePre>
{`"use client";
import { useState } from "react";
import ToastPop from "./toast-pop.module.css";

export default function Toaster() {
  const [toasts, setToasts] = useState(0);

  return (
    <div className={\`\${ToastPop.wrapper} mt-32\`\}>
      <div className={\`\${ToastPop.toaster}\`\}>
        {Array.from({ length: toasts }).map((_, i) => (
          <div key={i} className={\`\${ToastPop.toast} bg-zinc-50\`\}>
            <span>Timestamp Created</span>
          </div>
        ))}
      </div>
      <button onClick={() => setToasts(toasts + 1)}>Add toast</button>
    </div>
  );
}`}
            </CopyablePre>
          </div>
        </div>
      </div>
    ),
  },
  "smooth-button": {
    title: "Smooth Motion Button",
    component: <SmoothButton />,
    tags: ["spring-animation", "framer-motion"],
    publishedOn: "2025-09-26",
    explanation: (
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <p className="text-pretty text-zinc-800 dark:text-zinc-200">
            Interactive button utilizing Framer Motion spring physics to deliver fluid, elastic tactile feedback between idle, loading, and success states.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 text-sm">
            How to use this code:
          </h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
            <li>Uses AnimatePresence mode=&quot;popLayout&quot; to animate label transitions.</li>
            <li>Configured with high-stiffness spring bounds (stiffness: 400, damping: 15).</li>
          </ul>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <h4 className="text-xs font-mono font-medium text-zinc-500 dark:text-zinc-400 mb-2">
              ### basic-framer-button/basic-framer-button.tsx
            </h4>
            <CopyablePre>
{`"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function SmoothButton() {
  const [buttonState, setButtonState] = useState("idle");

  return (
    <button
      onClick={() => {
        setButtonState("loading");
        setTimeout(() => setButtonState("success"), 1500);
        setTimeout(() => setButtonState("idle"), 3000);
      }}
      className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={buttonState}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ type: "spring", duration: 0.3, bounce: 0.1 }}
        >
          {buttonState === "idle" ? "Cancel Subscription" : buttonState}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}`}
            </CopyablePre>
          </div>
        </div>
      </div>
    ),
  },
  "dynamic-drawer": {
    title: "Dynamic Swipe Drawer",
    component: <DynamicDrawer />,
    tags: ["spring-animation", "framer-motion"],
    publishedOn: "2025-09-27",
    explanation: (
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <p className="text-pretty text-zinc-800 dark:text-zinc-200">
            Dynamic height drawer container that spring-animates its container dimensions seamlessly whenever internal text elements are toggled.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 text-sm">
            How to use this code:
          </h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
            <li>Uses react-use-measure to observe real-time DOM element height.</li>
            <li>Applies Framer Motion spring layout bounds to container height.</li>
          </ul>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <h4 className="text-xs font-mono font-medium text-zinc-500 dark:text-zinc-400 mb-2">
              ### dynamic-drawer/dynamic-drawer.tsx
            </h4>
            <CopyablePre>
{`"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import useMeasure from "react-use-measure";

export default function DynamicDrawer() {
  const [showExtraContent, setShowExtraContent] = useState(false);
  const [ref, bounds] = useMeasure();

  return (
    <div className="flex flex-col items-center gap-4 text-zinc-800">
      <button onClick={() => setShowExtraContent((b) => !b)}>
        {showExtraContent ? "Hide Extra" : "Show Extra"}
      </button>
      <motion.div
        animate={{ height: bounds.height ? bounds.height : "auto" }}
        transition={{ type: "spring", duration: 0.25, bounce: 0.2 }}
        className="overflow-hidden border rounded-xl p-4"
      >
        <div ref={ref}>
          <h1>Blonde (Sunday 1994)</h1>
          {showExtraContent && (
            <AnimatePresence>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                You knew me and all my friends...
              </motion.p>
            </AnimatePresence>
          )}
        </div>
      </motion.div>
    </div>
  );
}`}
            </CopyablePre>
          </div>
        </div>
      </div>
    ),
  },
  "feedback-popover": {
    title: "Feedback Pop Over",
    component: <FeedbackPopOver />,
    tags: ["spring-animation", "framer-motion", "animate-presence"],
    publishedOn: "2025-09-29",
    explanation: (
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <p className="text-pretty text-zinc-800 dark:text-zinc-200">
            A popover menu displaying smooth spring scaling and exit transitions when users click to submit feedback.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 text-sm">
            How to use this code:
          </h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
            <li>Uses layoutId for shared element transitions between button and modal.</li>
            <li>Hooks click-outside handlers for accessibility dismissals.</li>
          </ul>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <h4 className="text-xs font-mono font-medium text-zinc-500 dark:text-zinc-400 mb-2">
              ### feedback-pop-over/feedback-pop-over.tsx
            </h4>
            <CopyablePre>
{`"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function FeedbackPopOver() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <motion.button layoutId="wrapper" onClick={() => setOpen(true)}>
        <motion.span layoutId="title">Message</motion.span>
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div layoutId="wrapper" className="p-4 border rounded-xl">
            <motion.span layoutId="title">Message</motion.span>
            <button onClick={() => setOpen(false)}>Close</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}`}
            </CopyablePre>
          </div>
        </div>
      </div>
    ),
  },
  "multi-step-card": {
    title: "Dynamic Multi-Step Card",
    component: <MultiStepCard />,
    tags: ["spring-animation", "framer-motion"],
    publishedOn: "2025-09-30",
    explanation: (
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <p className="text-pretty text-zinc-800 dark:text-zinc-200">
            A multi-step card onboarding container that dynamically resizes container width and height to fit step contents seamlessly.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 text-sm">
            How to use this code:
          </h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
            <li>Uses MotionConfig to set global spring transitions across steps.</li>
            <li>Measures DOM height bounds automatically on step changes.</li>
          </ul>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <h4 className="text-xs font-mono font-medium text-zinc-500 dark:text-zinc-400 mb-2">
              ### multi-step-card/multi-step-card.tsx
            </h4>
            <CopyablePre>
{`"use client";
import { useMemo, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import useMeasure from "react-use-measure";

export default function MultiStepComponent() {
  const [currentStep, setCurrentStep] = useState(0);
  const [ref, bounds] = useMeasure();

  return (
    <MotionConfig transition={{ type: "spring", duration: 0.45, bounce: 0.1 }}>
      <motion.div animate={{ height: bounds.height ? bounds.height : "auto" }} className="overflow-hidden border rounded-xl p-4">
        <div ref={ref}>
          <h2>Step {currentStep + 1}</h2>
          <button onClick={() => setCurrentStep((s) => (s + 1) % 3)}>Next Step</button>
        </div>
      </motion.div>
    </MotionConfig>
  );
}`}
            </CopyablePre>
          </div>
        </div>
      </div>
    ),
  },
  "interactive-graph": {
    title: "Interactive Path Graph",
    component: <InteractiveGraphAlt />,
    tags: ["clip-path", "framer-motion"],
    publishedOn: "2025-10-01",
    explanation: (
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <p className="text-pretty text-zinc-800 dark:text-zinc-200">
            An interactive analytics chart demonstrating fluid SVG path morphing transitions, dynamic gradients, and coordinate calculation.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 text-sm">
            How to use this code:
          </h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
            <li>Uses useSpring physics hooks to smooth pointer position tracking.</li>
            <li>Generates dynamic clip-path inset templates dynamically.</li>
          </ul>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <h4 className="text-xs font-mono font-medium text-zinc-500 dark:text-zinc-400 mb-2">
              ### interactive-graph/interactive-graph-alt.tsx
            </h4>
            <CopyablePre>
{`"use client";
import { motion, useSpring, useMotionTemplate } from "framer-motion";
import { useState } from "react";

export default function InteractiveGraph() {
  const [width, setWidth] = useState(1);
  const percentage = useSpring(0, { mass: 0.1, damping: 16, stiffness: 71 });
  const clipPathTemplate = useMotionTemplate\`inset(0px \${percentage}% 0px 0px)\`;

  return (
    <div
      ref={(el) => { if (el) setWidth(el.offsetWidth); }}
      onPointerMove={(e) => {
        const bounds = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - bounds.left;
        percentage.set((1 - x / width) * 100);
      }}
    >
      <motion.svg style={{ clipPath: clipPathTemplate }} viewBox="0 0 644 188">
        <path stroke="#0090FF" strokeWidth="2" d="M1 118.5s82.308-15.501 113.735-29..." />
      </motion.svg>
    </div>
  );
}`}
            </CopyablePre>
          </div>
        </div>
      </div>
    ),
  },
  "interactable-trash": {
    title: "Interactable Trash bin",
    component: <TrashAnimation />,
    tags: ["spring-animation", "framer-motion"],
    publishedOn: "2025-10-07",
    explanation: (
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <p className="text-pretty text-zinc-800 dark:text-zinc-200">
            A delete confirmation bin utilizing drag-to-delete mouse bindings and scale collision spring triggers.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 text-sm">
            How to use this code:
          </h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
            <li>Coordinates AnimatePresence list exit transitions with trash bin lid opening.</li>
            <li>Smoothly resets state queues on item deletion completion.</li>
          </ul>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <h4 className="text-xs font-mono font-medium text-zinc-500 dark:text-zinc-400 mb-2">
              ### trash-animation/trash-animation.tsx
            </h4>
            <CopyablePre>
{`"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function TrashAnimation() {
  const [items, setItems] = useState(["item-1", "item-2", "item-3"]);

  return (
    <div className="flex flex-col items-center gap-4">
      <AnimatePresence>
        {items.map((item) => (
          <motion.div key={item} exit={{ opacity: 0, scale: 0.8 }}>
            {item}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}`}
            </CopyablePre>
          </div>
        </div>
      </div>
    ),
  },
  "vaul-drawer": {
    title: "Dynamic Drawer (Vaul)",
    component: <VaulDrawer />,
    tags: ["spring-animation", "framer-motion"],
    publishedOn: "2025-10-08",
    explanation: (
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <p className="text-pretty text-zinc-800 dark:text-zinc-200">
            A mobile-optimized drawer overlay powered by Radix UI primitives and Vaul swipe hooks.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 text-sm">
            How to use this code:
          </h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
            <li>Uses Vaul Drawer primitives for native iOS touch gestures.</li>
            <li>Smoothly dismisses on down-drag swipe threshold completion.</li>
          </ul>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <h4 className="text-xs font-mono font-medium text-zinc-500 dark:text-zinc-400 mb-2">
              ### vaul-drawer/vaul-drawer.tsx
            </h4>
            <CopyablePre>
{`"use client";
import { Drawer } from "vaul";

export default function VaulDrawer() {
  return (
    <Drawer.Root>
      <Drawer.Trigger className="px-4 py-2 bg-zinc-900 text-white rounded-md">
        Open Drawer
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-white flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0 p-4">
          <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />
          <Drawer.Title className="font-medium text-zinc-900">Vaul Drawer Title</Drawer.Title>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}`}
            </CopyablePre>
          </div>
        </div>
      </div>
    ),
  },
  "dynamic-island": {
    title: "Interactive Dynamic Island",
    component: <DynamicIsland />,
    tags: ["spring-animation", "framer-motion"],
    publishedOn: "2025-10-29",
    explanation: (
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <p className="text-pretty text-zinc-800 dark:text-zinc-200">
            An interactive pill component that spring-animates coordinates, dimensions, border-radius, and interior contents to mimic Apple&apos;s dynamic island alerts.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 text-sm">
            How to use this code:
          </h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
            <li>Uses Framer Motion layoutId for smooth capsule morphing.</li>
            <li>Supports multiple notification state presets (Call, Charging, Music).</li>
          </ul>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <h4 className="text-xs font-mono font-medium text-zinc-500 dark:text-zinc-400 mb-2">
              ### dynamic-island/dynamic-island.tsx
            </h4>
            <CopyablePre>
{`"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function DynamicIsland() {
  const [state, setState] = useState("compact");

  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className="bg-black text-white rounded-full px-4 py-2 flex items-center justify-between min-w-[180px]"
    >
      <motion.span layout="position">Dynamic Island</motion.span>
    </motion.div>
  );
}`}
            </CopyablePre>
          </div>
        </div>
      </div>
    ),
  },
  "nav-searchbar": {
    title: "Nav Search Bar",
    component: <NavSearchBar />,
    tags: ["spring-animation", "framer-motion"],
    publishedOn: "2025-10-29",
    explanation: (
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <p className="text-pretty text-zinc-800 dark:text-zinc-200">
            A navigation search input field that spring-reveals tags, categories, lists, and keyboard inputs upon click activation.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 text-sm">
            How to use this code:
          </h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
            <li>Spring-expands search container on focus.</li>
            <li>Supports hotkey shortcuts (Cmd + K) for quick keyboard focus.</li>
          </ul>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <h4 className="text-xs font-mono font-medium text-zinc-500 dark:text-zinc-400 mb-2">
              ### nav-search-bar/nav-search-bar.tsx
            </h4>
            <CopyablePre>
{`"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function NavSearchBar() {
  const [focused, setFocused] = useState(false);

  return (
    <motion.div
      animate={{ width: focused ? 320 : 200 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="border rounded-full px-3 py-1.5 bg-zinc-50 dark:bg-zinc-900 flex items-center"
    >
      <input
        type="text"
        placeholder="Search..."
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="bg-transparent outline-none text-sm w-full"
      />
    </motion.div>
  );
}`}
            </CopyablePre>
          </div>
        </div>
      </div>
    ),
  },
};

export default async function ArtDetailPage({ params }: PageProps) {
  const { id } = await params;
  const item = ART_ITEMS[id];

  if (!item) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl px-6 sm:px-4 pt-12 pb-24 animate-fade-in">
      {/* Detail Header */}
      <header className="flex items-center justify-between gap-4 mb-10">
        <h1 className="font-semibold text-[15px] text-zinc-900 dark:text-zinc-50">
          {item.title}
        </h1>
        <Link
          href="/art"
          aria-label="Close"
          className="relative flex items-center justify-center rounded-md p-1.5 transition-[background-color,color,transform] duration-150 ease-out hover:bg-zinc-100 dark:hover:bg-zinc-900 active:scale-[0.96] text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          <X className="h-4 w-4" />
        </Link>
      </header>

      {/* Focus Showcase Preview Area (Aspect ratio matching arlan.me/vault/emboss) */}
      <div className="relative mx-auto w-full overflow-hidden rounded-[12px] border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 aspect-[1344/620] flex items-center justify-center select-none mb-10">
        {item.component}
      </div>

      {/* Breakdown Details Copy */}
      <article className="flex min-w-0 flex-col gap-10 text-[15px] leading-[1.7]">
        {item.explanation}
      </article>
    </div>
  );
}
