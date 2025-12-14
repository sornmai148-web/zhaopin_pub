import { FilterOptions } from "@/components/organisms/filter";
import { JobSection } from "@/components/organisms/jobs";
import { NextPage } from "next";

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

const Page: NextPage<PageProps> = async ({ params }) => {
  const queryParams = await params;
  const locale = queryParams?.locale || "en";

  return (
    <div className="relative bg-primary-100/40 min-h-[calc(100dvh-300px)] !overflow-x-hidden">
      <FilterOptions locale={locale} />
      <JobSection />
    </div>
  );
};

export default Page;
