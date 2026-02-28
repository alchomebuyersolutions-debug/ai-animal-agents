import { SplineScene } from "@/components/ui/spline";
import { useAgentStore } from "@/store";

export default function SplineAnimals() {
  const agents = useAgentStore((state) => state.agents);
  const activeAgents = agents.filter(a => a.isActive);

  // Map of animal type to Spline scene URLs
  const animalScenes: Record<string, string> = {
    // Dog scenes (Buddy - Content Creator)
    dog: "https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode", // Cute animated dog
    
    // Tiger scenes (Rex - Web Scraper)
    tiger: "https://prod.spline.design/pvM5aSqYwJEpP6Es/scene.splinecode", // 3D Cat (closest to tiger)
    
    // Future animals
    eagle: "https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode",
    dolphin: "https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode",
  };

  return (
    <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-4 p-8">
      {activeAgents.slice(0, 4).map((agent) => (
        <div key={agent.id} className="relative">
          {/* Agent 3D Model */}
          <div className="w-full h-full relative">
            <SplineScene 
              scene={animalScenes[agent.type] || animalScenes.dog}
              className="w-full h-full"
            />
            
            {/* Agent Name Tag */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 glass rounded-lg px-4 py-2 border-2" style={{ borderColor: agent.color }}>
              <div className="flex items-center gap-2">
                <div className="text-2xl">{agent.avatar}</div>
                <div>
                  <p className="text-sm font-bold text-white">{agent.name}</p>
                  <p className="text-xs text-gray-400 capitalize">{agent.specialization.replace('-', ' ')}</p>
                </div>
              </div>
            </div>

            {/* Status Indicator */}
            {agent.activeMission && (
              <div className="absolute top-4 right-4 glass rounded-lg px-3 py-2 border-2 border-warning/30">
                <p className="text-xs text-warning font-semibold">WORKING</p>
                <p className="text-xs text-gray-400 mt-1">{agent.activeMission.progress}%</p>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Instructions for inactive agents */}
      {activeAgents.length === 0 && (
        <div className="col-span-2 row-span-2 flex items-center justify-center">
          <div className="glass rounded-xl p-8 max-w-md text-center border-2 border-primary/20">
            <p className="text-2xl mb-4">🐾</p>
            <h3 className="text-xl font-bold text-white mb-2">No Active Agents</h3>
            <p className="text-gray-400">Activate agents from their cards to see them in the 3D zoo!</p>
          </div>
        </div>
      )}
    </div>
  );
}
