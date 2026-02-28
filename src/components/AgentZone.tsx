import { useAgentStore } from '../store';
import AgentCard from './AgentCard';

export default function AgentZone() {
  const agents = useAgentStore((state) => state.agents);

  return (
    <div className="w-full h-full relative">
      {/* Placeholder 3D Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-surface to-bg-primary">
        {/* Grid overlay */}
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
        
        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-white/30 text-sm font-mono mb-2">
              3D Environment Placeholder
            </p>
            <p className="text-white/20 text-xs font-mono">
              Add Spline scene here → app.spline.design
            </p>
          </div>
        </div>
      </div>

      {/* Agent Cards Overlay */}
      <div className="absolute inset-0 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl">
          {agents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </div>
    </div>
  );
}
