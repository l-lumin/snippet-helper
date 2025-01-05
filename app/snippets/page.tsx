import { createSnippet, deleteSnippet, getSnippets } from "@/lib/snippetStore";
import Form from "next/form";
import Link from "next/link";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic'

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
    <div className="p-6 max-w-4xl mx-auto">
      {/* Create Snippet Form */}
      <Form action={handleSubmit} className="mb-6">
        <textarea
          name="content"
          placeholder="Enter your snippet"
          className="w-full max-w-full p-4 mb-4 border border-gray-300 rounded-lg text-gray-900 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
        <button
          type="submit"
          className="w-full px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Create
        </button>
      </Form>

      {/* Snippets List */}
      <div className="grid grid-cols-1 gap-4">
        {snippets.map((snippet) => (
          <div
            key={snippet.id}
            className="w-full p-4 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 hover:bg-gray-100 transition-shadow shadow-sm hover:shadow-md"
          >
            {/* Snippet Content */}
            <div className="flex-1">
              <Link href={`/snippets/${snippet.id}`}>
                <pre className="whitespace-pre-wrap text-sm text-gray-700">
                  {snippet.content}
                </pre>
              </Link>
            </div>

            {/* Delete Button */}
            <div className="mt-4 flex items-center justify-end">
              <Form action={handleDelete}>
                <input type="hidden" name="id" value={snippet.id} />
                <button className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400">
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
