import { createSnippet, deleteSnippet } from "@/app/lib/snippet-store";
import { SnippetsSkeleton } from "@/app/ui/skeletons";
import SnippetsCard from "@/app/ui/snippets/snippets-card";
import { revalidatePath } from "next/cache";
import Form from "next/form";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function SnippetsPage() {
  const handleSubmit = async (formData: FormData) => {
    "use server";
    createSnippet(formData.get("content") as string);
    revalidatePath("/snippets");
    redirect("/snippets");
  };

  const handleDelete = async (formData: FormData) => {
    "use server";
    const id = formData.get("id") as string;
    deleteSnippet(parseInt(id));
    revalidatePath("/snippets");
  };

  return (
    <div>
      {/* Create Snippet Form */}
      <Form action={handleSubmit}>
        <textarea
          name="content"
          placeholder="Enter your snippet"
          className="textarea"
          required
        />
        <button type="submit" className="btn">
          Create
        </button>
      </Form>

      {/* Snippets List */}
      <Suspense fallback={<SnippetsSkeleton />}>
        <SnippetsCard onDelete={handleDelete} />
      </Suspense>
    </div>
  );
}
