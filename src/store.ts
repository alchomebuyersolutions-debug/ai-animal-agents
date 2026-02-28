import { create } from 'zustand';
import type { Agent, Mission } from './types';

interface AgentStore {
  agents: Agent[];
  selectedAgent: Agent | null;
  missions: Mission[];
  
  addAgent: (agent: Agent) => void;
  updateAgent: (id: string, updates: Partial<Agent>) => void;
  deleteAgent: (id: string) => void;
  selectAgent: (agent: Agent | null) => void;
  toggleAgentStatus: (id: string) => void;
  
  addMission: (mission: Mission) => void;
  updateMission: (id: string, updates: Partial<Mission>) => void;
}

export const useAgentStore = create<AgentStore>((set) => ({
  agents: [
    // Demo agents
    {
      id: '1',
      name: 'Buddy',
      type: 'dog',
      avatar: '🐕',
      color: '#06B6D4',
      skills: [
        {
          id: 's1',
          name: 'Blog Writing',
          description: 'Write engaging blog posts',
          category: 'writing',
          level: 4,
          costPerUse: 2,
        },
        {
          id: 's2',
          name: 'Social Media Content',
          description: 'Create social media posts',
          category: 'writing',
          level: 5,
          costPerUse: 1,
        },
      ],
      specialization: 'content-creation',
      apiKeys: [],
      budget: {
        allocated: 100,
        spent: 23,
        currency: 'USD',
      },
      status: 'idle',
      isActive: false,
      activeMission: null,
      missionHistory: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'Rex',
      type: 'tiger',
      avatar: '🐯',
      color: '#EF4444',
      skills: [
        {
          id: 's3',
          name: 'Deep Web Scraping',
          description: 'Extract data from complex websites',
          category: 'scraping',
          level: 5,
          costPerUse: 5,
        },
        {
          id: 's4',
          name: 'Competitive Analysis',
          description: 'Monitor competitor websites',
          category: 'analysis',
          level: 4,
          costPerUse: 3,
        },
      ],
      specialization: 'web-scraping',
      apiKeys: [],
      budget: {
        allocated: 200,
        spent: 87,
        currency: 'USD',
      },
      status: 'working',
      isActive: true,
      activeMission: {
        id: 'm1',
        agentId: '2',
        title: 'Scrape Competitor Pricing',
        description: 'Extract pricing data from top 10 competitors',
        status: 'in-progress',
        progress: 64,
        startedAt: new Date(Date.now() - 3600000),
        completedAt: null,
        result: null,
        budgetUsed: 12,
        logs: [
          {
            timestamp: new Date(),
            message: 'Starting scraping process...',
            type: 'info',
          },
          {
            timestamp: new Date(),
            message: 'Extracted data from 6/10 sites',
            type: 'success',
          },
        ],
      },
      missionHistory: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  selectedAgent: null,
  missions: [],
  
  addAgent: (agent) => set((state) => ({
    agents: [...state.agents, agent],
  })),
  
  updateAgent: (id, updates) => set((state) => ({
    agents: state.agents.map((agent) =>
      agent.id === id ? { ...agent, ...updates } : agent
    ),
  })),
  
  deleteAgent: (id) => set((state) => ({
    agents: state.agents.filter((agent) => agent.id !== id),
  })),
  
  selectAgent: (agent) => set({ selectedAgent: agent }),
  
  toggleAgentStatus: (id) => set((state) => ({
    agents: state.agents.map((agent) =>
      agent.id === id
        ? { ...agent, isActive: !agent.isActive, status: !agent.isActive ? 'active' : 'idle' }
        : agent
    ),
  })),
  
  addMission: (mission) => set((state) => ({
    missions: [...state.missions, mission],
  })),
  
  updateMission: (id, updates) => set((state) => ({
    missions: state.missions.map((mission) =>
      mission.id === id ? { ...mission, ...updates } : mission
    ),
  })),
}));
