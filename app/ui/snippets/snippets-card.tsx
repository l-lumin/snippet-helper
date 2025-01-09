import { getSnippets } from "@/app/lib/snippet-store";
import Form from "next/form";
import Link from "next/link";

interface SnippetsCardProps {
  onDelete: (event: FormData) => void;
}

export default async function SnippetsCard({ onDelete }: SnippetsCardProps) {
  const snippets = await getSnippets();

  return (
    <div>
      {snippets.map((snippet) => (
        <div key={snippet.id}>
          {/* Snippet Content */}
          <Link href={`/snippets/${snippet.id}`}>
            <article className="prose">
              <pre>{snippet.content}</pre>
            </article>
          </Link>

          {/* Delete Button */}
          <div>
            <Form action={onDelete}>
              <input type="hidden" name="id" value={snippet.id} />
              <button type="submit" className="btn">
                Delete
              </button>
            </Form>
          </div>
        </div>
      ))}
    </div>
  );
}
