import { Mdx } from "@/src/features/main/docs/ui/MdxComponents";
import { DocsPager } from "@/src/features/main/docs/ui/Pager";
import { DashboardTableOfContents } from "@/src/features/main/docs/ui/Toc";
import { getTableOfContents } from "@/src/features/main/docs/utils/toc";
import { cn } from "@/src/shared/lib/utils";
import { allDocs } from "contentlayer/generated";
import { notFound } from "next/navigation";

interface DocPageProps {
  params: {
    slug: string[];
  };
}

async function getDocFromParams(params: { slug: string[] }) {
  const slug = params.slug?.join("/") || "";
  const doc = allDocs.find((doc) => doc.slugAsParams === slug);

  if (!doc) {
    null;
  }

  return doc;
}

const DocsPage = async ({ params }: DocPageProps) => {
  const doc = await getDocFromParams(params);

  if (!doc) {
    notFound();
  }

  const toc = await getTableOfContents(doc.body.raw);

  return (
    <main className="relative py-6 lg:gap-10 lg:py-10 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0">
        <div className={cn("space-y-4")}>
          <h1 className="inline-block font-heading text-4xl lg:text-5xl">
            {doc.title}
          </h1>
          {doc.description && (
            <p className="text-xl text-muted-foreground">{doc.description}</p>
          )}
        </div>
        <hr className="my-4" />
        <Mdx code={doc.body.code} />
        <hr className="my-4 md:my-6" />
        <DocsPager doc={doc} />
      </div>
      <div className="hidden text-sm xl:block">
        <div className="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-10">
          <DashboardTableOfContents toc={toc} />
        </div>
      </div>
    </main>
  );
};

export default DocsPage;
