export type AgentPersona = 'growth-strategist' | 'content-architect' | 'community-ops';

export type ChannelSnapshot = {
  name: string;
  handle: string;
  niche: string;
  description: string;
  formats: string[];
  metrics: {
    subscribers: number;
    views30d: number;
    avgViewDuration: number;
    ctr: number;
    uploadCadence: number;
  };
  recentVideos: {
    title: string;
    publishedFromNow: string;
    performance: 'above' | 'average' | 'below';
    retention: number;
    clickThroughRate: number;
  }[];
};

export type AgentMessage = {
  role: 'agent' | 'commander';
  content: string;
  timestamp: number;
};

export type AgentRequestPayload = {
  persona: AgentPersona;
  goal: string;
  message: string;
  history: AgentMessage[];
  channel: ChannelSnapshot;
};

export type AgentResponse = {
  conversation: AgentMessage[];
  playbook: { focus: string; detail: string }[];
  runway: { label: string; outcome: string; timeline: string }[];
  experiments: {
    title: string;
    description: string;
    category: string;
    impact: 'Low' | 'Medium' | 'High';
    effort: 'Low' | 'Medium' | 'High';
  }[];
  scores: Record<'retention' | 'velocity' | 'discoverability' | 'monetization' | 'loyalty', number>;
  insights: Partial<Record<'retention' | 'velocity' | 'discoverability' | 'monetization' | 'loyalty', string>>;
};
