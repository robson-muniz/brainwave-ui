import api from "@/lib/axios";
import type { Idea } from "@/types";

export const getIdeas = async (): Promise<Idea[]> => {
  const response = await api.get("/ideas");
  return response.data;
}

export const fetchIdea = async (ideaId: string): Promise<Idea> => {
  const res = await api.get(`/ideas/${ideaId}`)
  return res.data
}