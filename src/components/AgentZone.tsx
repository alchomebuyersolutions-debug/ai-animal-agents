import { useState } from 'react';
import { useAgentStore } from '../store';
import AgentCard from './AgentCard';
import SplineZoo from './SplineZoo';
import AgentGlobe from './AgentGlobe';
import { Globe2, Box } from 'lucide-react';

export default function AgentZone() {
  const agents = useAgentStore((state) => state.agents);
  const [viewMode, setViewMode] = useState<'spline' | 'globe'>('spline');

  return (
    <div className="w-full h-full relative">
      {/* 3D Background (Spline or Globe) */}
      <div className="absolute inset-0">
        {viewMode === 'spline' ? <SplineZoo /> : <AgentGlobe />}
      </div>

      {/* View Toggle */}
      <div className="absolute top-4 right-4 z-20 glass rounded-lg p-1 flex gap-1">
        <button
          onClick={() => setViewMode('spline')}
          className={`
            p-2 rounded transition-all
            ${viewMode === 'spline' 
              ? 'bg-primary text-white' 
              : 'text-gray-400 hover:text-white hover:bg-white/10'
            }
          `}
          title="3D Zoo View"
        >
          <Box className="w-5 h-5" />
        </button>
        <button
          onClick={() => setViewMode('globe')}
          className={`
            p-2 rounded transition-all
            ${viewMode === 'globe' 
              ? 'bg-secondary text-white' 
              : 'text-gray-400 hover:text-white hover:bg-white/10'
            }
          `}
          title="Global Network View"
        >
          <Globe2 className="w-5 h-5" />
        </button>
      </div>

      {/* Agent Cards Overlay */}
      <div className="absolute inset-0 p-8 pt-20 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl">
          {agents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </div>
    </div>
  );
}
