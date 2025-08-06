"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { format } from "date-fns";

interface CertificateCardProps {
  title: string;
  publishedOn: string;
  src: string;
  tags: Array<string>;
}

interface TextWithEllipsisProps {
  text: string;
  maxLength?: number;
}

export const TextWithEllipsis = ({
  text,
  maxLength,
}: TextWithEllipsisProps) => {
  const textStyle = {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    maxWidth: maxLength ? `${maxLength}px` : "100%", // Optional: limit text width
  };
  return (
    <p style={textStyle} title={text}>
      {text}
    </p>
  );
};

export default function CertificateCard({
  title,
  publishedOn,
  src,
  tags,
}: CertificateCardProps) {

  let humanizedDate = "Unknown date";
  const parsedDate = new Date(publishedOn);
  if (!isNaN(parsedDate.getTime())) {
    humanizedDate = format(parsedDate, "MMMM do, yyyy");
  }

  return (
    <motion.div
      whileHover={{
        y: -10,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
        transition: { type: "spring", stiffness: 300, damping: 15 },
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div>
        <div className=" overflow-hidden rounded-lg border border-gray-200 transition duration-150 ease-in-out hover:border-gray-300 active:scale-[0.97] dark:border-zinc-800 dark:hover:border-zinc-700">
          <div className=" relative aspect-video bg-gray-100 dark:bg-zinc-900">
            <Image
              src={src}
              alt="Project thumbnail"
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <div className="flex flex-col">
              {tags ? (
                <div className="mb-4 flex flex-wrap gap-2">
                  {tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700 dark:bg-zinc-800 dark:text-gray-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : (
                <></>
              )}
              <h3 className="mb-1 font-medium">{title}</h3>
            </div>
            <div className="">
              <time className="text-sm font-semibold" dateTime={publishedOn}>
                {" "}
                {humanizedDate}{" "}
              </time>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
