"use client";

import React from "react";
import { format } from "date-fns";
import Image from "next/image";
import { Eye, Clock, Heart } from "lucide-react";
import { useViewCounter } from "@/hooks/useViewCounter";

interface BlogHeaderProps {
  title: string;
  publishedOn: string;
  abstract: string;
  authorPict: string;
  slug: string;
  type: "project" | "blog";
}

function BlogHeader({
  title,
  publishedOn,
  abstract,
  authorPict,
  slug,
  type,
}: BlogHeaderProps) {
  const humanizedDate = format(new Date(publishedOn), "MMMM do, yyyy");
  const { views } = useViewCounter(slug, type);

  return (
    <header>
      <div>
        <h1 className="mb-4 mt-6 text-2xl font-bold tracking-tighter  lg:text-5xl">
          {title}
        </h1>
        <div className="flex flex-col">
          <p className="mb-4 text-justify tracking-tighter  text-gray-500">
            {abstract}
          </p>
          <div className="my-6 flex gap-4">
            <div className="h-12 w-12 object-fill">
              <Image
                src={authorPict}
                width={192}
                height={192}
                alt="Author Profile"
              />
            </div>
            <div className="flex flex-col ">
              <p className="text-lg font-semibold tracking-tighter text-zinc-500 dark:text-zinc-50">
                Kumo
              </p>
              <time
                className="text-base font-medium tracking-tighter text-zinc-500"
                dateTime={publishedOn}
              >
                {humanizedDate}
              </time>
            </div>
          </div>
          <div className="flex flex-col gap-4 tracking-tighter">
            <hr className="text-zinc-800 dark:text-zinc-50" />
            <div className="flex justify-between">
              <div className="flex items-center gap-2  ">
                <Eye size={16} />
                <span> {views !== null ? views : "..."} Views</span>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 ">
                  <Clock size={16} />
                  <span> ~10 Minutes</span>
                </div>
                <div className="flex items-center gap-2 ">
                  <Heart size={16} />
                  <span> 0 Likes</span>
                </div>
              </div>
            </div>
            <hr className="text-zinc-800 dark:text-zinc-50" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default BlogHeader;
