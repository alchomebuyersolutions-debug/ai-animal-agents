import { Component as Globe } from "@/components/ui/interactive-globe";
import { useAgentStore } from "@/store";

export default function AgentGlobe() {
  const agents = useAgentStore((state) => state.agents);
  
  // Custom markers based on active agents
  const agentMarkers = [
    { lat: 37.78, lng: -122.42, label: "🐕 Buddy - SF" },
    { lat: 51.51, lng: -0.13, label: "🐯 Rex - London" },
    { lat: 35.68, lng: 139.69, label: "Tokyo Hub" },
    { lat: -33.87, lng: 151.21, label: "Sydney" },
    { lat: 1.35, lng: 103.82, label: "Singapore" },
  ];

  const agentConnections: { from: [number, number]; to: [number, number] }[] = [
    { from: [37.78, -122.42], to: [51.51, -0.13] }, // Buddy → Rex
    { from: [51.51, -0.13], to: [35.68, 139.69] },
    { from: [35.68, 139.69], to: [-33.87, 151.21] },
    { from: [37.78, -122.42], to: [1.35, 103.82] },
  ];

  return (
    <div className="w-full h-full relative overflow-hidden bg-bg-primary">
      {/* Gradient background with brand colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-bg-primary to-secondary/10" />
      
      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      {/* Globe */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Globe 
          size={600}
          dotColor="rgba(236, 72, 153, ALPHA)" // Pink dots
          arcColor="rgba(6, 182, 212, 0.6)" // Cyan arcs
          markerColor="rgba(236, 72, 153, 1)" // Pink markers
          autoRotateSpeed={0.001}
          markers={agentMarkers}
          connections={agentConnections}
        />
      </div>

      {/* Stats overlay */}
      <div className="absolute top-8 left-8 glass rounded-xl p-4 border-2 border-primary/20">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <p className="text-xs font-semibold text-primary">Global Network</p>
        </div>
        <div className="space-y-2">
          <div>
            <p className="text-2xl font-bold text-white">{agents.filter(a => a.isActive).length}</p>
            <p className="text-xs text-gray-400">Agents Active</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-secondary">{agentMarkers.length}</p>
            <p className="text-xs text-gray-400">Deployment Zones</p>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-8 right-8 glass rounded-xl p-4 border-2 border-secondary/20">
        <p className="text-xs font-semibold text-secondary mb-2">Agent Locations</p>
        <div className="space-y-1 text-xs text-gray-300">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full" />
            <span>Content Agents</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-error rounded-full" />
            <span>Scraping Agents</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-warning rounded-full" />
            <span>Analysis Agents</span>
          </div>
        </div>
      </div>
    </div>
  );
}
