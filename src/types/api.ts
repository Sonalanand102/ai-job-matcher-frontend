/** Raw match object returned by POST /match-resume */
export interface BackendJobMatch {
  id: number;
  company_name: string;
  job_title: string;
  location: string;
  experience_level: string;
  employment_type: string;
  job_description: string;
  semantic_score: number;
  keyword_rank: number;
  rerank_score: number;
}

export interface MatchResumeResponse {
  matches: BackendJobMatch[];
}

export interface MatchResumeParams {
  location?: string;
  experience_level?: string;
  employment_type?: string;
}

export interface ApiErrorBody {
  detail?: string | { msg: string }[];
}
