import Link from "next/link";
import React from "react";
import { getBlogPostList } from "@/app/helpers/file-helpers";
import { ArrowLeft } from "lucide-react";
import CertificateCard from "@/components/certificate-card";

export default async function Certificates() {
  const route = `certificate`;
  const certificatePost = await getBlogPostList(route);

  // console.log(certificatePost);

  return (
    <div className="mx-auto max-w-4xl pt-8">
      <Link
        href="/"
        className="mb-8 inline-flex items-center tracking-tighter text-zinc-400 transition duration-150 ease-in-out hover:text-zinc-600 dark:hover:text-white"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
      </Link>
      <div className="mb-8 flex items-center gap-2">
        <h1 className="text-3xl font-medium tracking-tighter">Certificates</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* <CertificateCard />
        <CertificateCard />
        <CertificateCard />
        <CertificateCard /> */}

        {certificatePost.map(({ slug, ...delegated }) => (
          <CertificateCard
            key={slug}
            slug={slug}
            route={route}
            {...delegated}
          />
        ))}
      </div>
    </div>
  );
}
