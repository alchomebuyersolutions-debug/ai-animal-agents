export interface Agent {
  id: string;
  name: string;
  type: 'dog' | 'tiger' | 'eagle' | 'dolphin' | string;
  avatar: string;
  color: string;
  
  // Skills & Capabilities
  skills: Skill[];
  specialization: 'content-creation' | 'web-scraping' | 'research' | 'coding' | 'analysis';
  
  // API & Resources
  apiKeys: ApiKey[];
  budget: {
    allocated: number;
    spent: number;
    currency: 'USD' | 'credits';
  };
  
  // Status
  status: 'idle' | 'active' | 'working' | 'paused' | 'error';
  isActive: boolean;
  
  // Mission tracking
  activeMission: Mission | null;
  missionHistory: Mission[];
  
  // Created/Updated
  createdAt: Date;
  updatedAt: Date;
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  category: 'scraping' | 'writing' | 'research' | 'coding' | 'analysis';
  level: 1 | 2 | 3 | 4 | 5;
  costPerUse: number;
}

export interface ApiKey {
  id: string;
  service: 'openai' | 'anthropic' | 'google' | 'custom';
  key: string;
  usageLimit: number;
  usageCurrent: number;
}

export interface Mission {
  id: string;
  agentId: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  progress: number;
  startedAt: Date;
  completedAt: Date | null;
  result: any;
  budgetUsed: number;
  logs: MissionLog[];
}

export interface MissionLog {
  timestamp: Date;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
}
