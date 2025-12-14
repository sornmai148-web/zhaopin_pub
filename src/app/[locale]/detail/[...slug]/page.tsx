import { getJobDetail } from "@/api/resource";
import { Container } from "@/components/molecules/container";
import { JobDetail } from "@/components/organisms/detail";
import { ROUTES } from "@/config/routes";
import { siteConfig } from "@/config/site";

import { Metadata, NextPage } from "next";
import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ locale: Locale; slug: string[] }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const routerParams = await params;
  const jobId = routerParams?.slug[0];
  const locale = routerParams?.locale || "en";

  const response = await getJobDetail({ id: +jobId });
  const seoImages = response?.data?.medias?.map((x) => x.url);

  if (response?.code == 500) return redirect(ROUTES.SERVER_ERROR);

  return {
    title: response?.data?.seoTitle || siteConfig?.siteTitle,
    description: response?.data?.seoDescription || siteConfig?.siteDescription,
    keywords: siteConfig.keywords,
    authors: [{ name: siteConfig.siteName }],
    openGraph: {
      title: response?.data?.seoTitle || siteConfig?.siteTitle,
      description:
        response?.data?.seoDescription || siteConfig?.siteDescription,
      url: response?.data?.medias?.[0]?.url || siteConfig?.siteUrl,
      type: "website",
      images: [
        {
          url: seoImages?.[0] || siteConfig?.imgUrl,
          width: 1200,
          height: 630,
          alt: "banner.jpg",
        },
      ],
      siteName: siteConfig.siteName,
    },
    twitter: {
      card: "summary_large_image",
      title: response?.data?.seoTitle || siteConfig?.siteTitle,
      description:
        response?.data?.seoDescription || siteConfig?.siteDescription,
      images: seoImages,
    },
    icons: {
      icon: siteConfig.icon,
      apple: siteConfig.logo,
    },
    other: {
      "application/ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Company",
        name: siteConfig.siteName,
        url: `${siteConfig.siteUrl}/${locale}/detail/${jobId}`,
        location: response?.data?.meta?.job_location,
        description:
          response?.data?.seoDescription || siteConfig?.siteDescription,
      }),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

const Page: NextPage<PageProps> = async ({ params }) => {
  const jobId = (await params)?.slug[0];
  const response = await getJobDetail({ id: +jobId });

  if (response?.code == 500) return redirect(ROUTES.SERVER_ERROR);

  const data = response?.data?.meta;

  return (
    <div className="relative bg-white min-h-[calc(100dvh-390px)]">
      <Container className="max-sm:py-6 py-10">
        <JobDetail
          company_intro={data?.company_intro || ""}
          Job_title={data?.Job_title || ""}
          applicant_gender={data?.applicant_gender || ""}
          jobTage={data?.job_tag || ""}
          job_benefits={data?.job_benefits || ""}
          job_created_date={
            data?.job_created_date || new Date().toLocaleTimeString()
          }
          job_description={data?.job_description || ""}
          job_exp_date={data?.job_exp_date || new Date().toLocaleTimeString()}
          job_experience={data?.job_experience || ""}
          job_hire_nums={data?.job_hire_nums || 0}
          job_location={data?.job_location || ""}
          job_pos_level={data?.job_position || ""}
          job_position={data?.job_position || ""}
          job_qlft={data?.job_qlft || ""}
          job_requirement={data?.job_requirement || ""}
          job_responsibility={data?.job_responsibility || ""}
          job_salary={data?.job_salary || ""}
          job_tag={data?.job_tag || ""}
          job_type={data?.job_type || ""}
          working_time={data?.working_time || ""}
          working_hours={data?.working_hours || ""}
          link={response?.data?.url || response?.data?.actionTarget?.url || "#"}
        />
      </Container>
    </div>
  );
};

export default Page;
