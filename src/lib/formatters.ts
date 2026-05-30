/** rerank_score is 0–100 from the backend */
export function formatMatchPercent(rerankScore: number): string {
  return `${Math.round(rerankScore)}% Match`;
}

export function formatSemanticScore(score: number): string {
  return score.toFixed(2);
}

export function formatKeywordRank(rank: number): string {
  return rank.toFixed(2);
}

export function formatRank(rank: number): string {
  return `Semantic Rank #${rank}`;
}
