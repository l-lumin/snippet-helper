import { Snippet } from "@/models/snippet";
import prisma from "@/lib/prisma";

export const getSnippets = async (): Promise<Snippet[]> => {
  return await prisma.snippet.findMany();
};

export const getSnippetById = async (id: number): Promise<Snippet | null> => {
  return await prisma.snippet.findUnique({
    where: { id },
  });
};

export const createSnippet = async (content: string): Promise<Snippet> => {
  return await prisma.snippet.create({
    data: {
      content: content,
    },
  });
};

export const updateSnippet = (
  id: number,
  snippet: Snippet
): Promise<Snippet | null> => {
  return prisma.snippet.update({
    where: { id },
    data: snippet,
  });
};

export const deleteSnippet = async (id: number): Promise<boolean> => {
  const snippet = await prisma.snippet.delete({
    where: { id },
  });
  return !!snippet;
};
