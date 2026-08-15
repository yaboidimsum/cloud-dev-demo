import Link from "next/link";
import { notFound } from "next/navigation";
import { X } from "lucide-react";
import { ART_ITEMS } from "@/data/art-items";

interface PageProps {
  params: Promise<{ id: string }>;
}

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
