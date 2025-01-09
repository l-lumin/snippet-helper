import { getSnippetById } from "@/app/lib/snippet-store";
import SnippetsDetail from "@/app/ui/snippets/snippet-detail";
import { notFound } from "next/navigation";

export default async function SnippetDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const snippet = await getSnippetById(parseInt(id));

  if (!snippet) {
    notFound();
  }

  return <SnippetsDetail {...snippet} />;
}
