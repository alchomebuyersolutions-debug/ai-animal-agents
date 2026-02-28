import { useAgentStore } from '../store';
import { Activity, Pause, Play } from 'lucide-react';

export default function BottomDock() {
  const agents = useAgentStore((state) => state.agents);
  const activeMissions = agents.filter((agent) => agent.activeMission);

  return (
    <div className="glass border-t border-white/10 px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Active Missions */}
        <div className="flex-1 flex items-center gap-4 overflow-x-auto">
          {activeMissions.length > 0 ? (
            activeMissions.map((agent) => (
              <div
                key={agent.id}
                className="flex items-center gap-3 bg-white/5 rounded-lg px-4 py-2 min-w-[280px]"
              >
                <div className="text-2xl">{agent.avatar}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-semibold text-white">
                      {agent.activeMission?.title}
                    </h4>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-warning/20 text-warning">
                      {agent.activeMission?.progress}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-warning to-success transition-all"
                      style={{ width: `${agent.activeMission?.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center gap-2 text-gray-400">
              <Activity className="w-4 h-4" />
              <span className="text-sm">No active missions</span>
            </div>
          )}
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-2 ml-4">
          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <Play className="w-5 h-5 text-success" />
          </button>
          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <Pause className="w-5 h-5 text-warning" />
          </button>
        </div>
      </div>
    </div>
  );
}
