import { getSnippetById } from "@/app/lib/snippet-store";
import SnippetsDetail from "@/app/ui/snippets/snippet-detail";

export default async function SnippetDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const snippet = await getSnippetById(parseInt(id));

  if (!snippet) {
    return <div>Snippet not found</div>;
  }
  return <SnippetsDetail {...snippet} />;
}
