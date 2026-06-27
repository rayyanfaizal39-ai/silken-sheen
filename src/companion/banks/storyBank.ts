/** Future hook into the Story Bank database. Phase 1 returns mock data only. */
export interface DiscoveryStory {
  id: string;
  topic: string;
  body: string;
}

export function getDiscoveryStory(_topicId: string): DiscoveryStory | null {
  return null;
}
