import { createSnippet, deleteSnippet, getSnippets } from "@/app/lib/snippet-store";
import Form from "next/form";
import Link from "next/link";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function SnippetsPage() {
  const snippets = await getSnippets();

  const handleSubmit = async (formData: FormData) => {
    "use server";
    createSnippet(formData.get("content") as string);
    redirect("/snippets");
  };

  const handleDelete = async (formData: FormData) => {
    "use server";
    const id = formData.get("id") as string;
    deleteSnippet(parseInt(id));
    redirect("/snippets");
  };

  return (
    <div>
      {/* Create Snippet Form */}
      <Form action={handleSubmit}>
        <textarea
          name="content"
          placeholder="Enter your snippet"
          className="textarea"
        />
        <button type="submit" className="btn">
          Create
        </button>
      </Form>

      {/* Snippets List */}
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
              <Form action={handleDelete}>
                <input type="hidden" name="id" value={snippet.id} />
                <button type="submit" className="btn">
                  Delete
                </button>
              </Form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
