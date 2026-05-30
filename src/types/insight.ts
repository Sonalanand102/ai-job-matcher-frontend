export interface MatchInsight {
  vector_proximity: number;
  keyword_alignment: number;
  narrative: string;
  focus_areas: string[];
}

export interface JobModelSuggestion {
  id: string;
  title: string;
  match_count: number;
  accent: "primary" | "secondary" | "muted";
}
