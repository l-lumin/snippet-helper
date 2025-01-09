import { Snippet } from "@/app/models/snippet";
import prisma from "@/app/lib/prisma";

export const getSnippets = async (): Promise<Snippet[]> => {
  try {
    return await prisma.snippet.findMany();
  } catch (e) {
    console.error("Database error", e);
    throw new Error("Unable to fetch snippets");
  }
};

export const getSnippetById = async (id: number): Promise<Snippet | null> => {
  try {
    return await prisma.snippet.findUnique({
      where: { id },
    });
  } catch (e) {
    console.error("Database error", e);
    throw new Error("Unable to fetch snippet");
  }
};

export const createSnippet = async (content: string): Promise<Snippet> => {
  try {
    return await prisma.snippet.create({
      data: {
        content: content,
      },
    });
  } catch (e) {
    console.error("Database error", e);
    throw new Error("Unable to create snippet");
  }
};

export const updateSnippet = (
  id: number,
  snippet: Snippet
): Promise<Snippet | null> => {
  try {
    return prisma.snippet.update({
      where: { id },
      data: snippet,
    });
  } catch (e) {
    console.error("Database error", e);
    throw new Error("Unable to update snippet");
  }
};

export const deleteSnippet = async (id: number): Promise<boolean> => {
  try {
    const snippet = await prisma.snippet.delete({
      where: { id },
    });
    return !!snippet;
  } catch (e) {
    console.error("Database error", e);
    throw new Error("Unable to delete snippet");
  }
};
