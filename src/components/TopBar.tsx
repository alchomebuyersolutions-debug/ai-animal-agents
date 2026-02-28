import { useAgentStore } from '../store';
import { Plus, Zap, DollarSign } from 'lucide-react';

export default function TopBar() {
  const agents = useAgentStore((state) => state.agents);
  
  const totalBudget = agents.reduce((sum, agent) => sum + agent.budget.allocated, 0);
  const totalSpent = agents.reduce((sum, agent) => sum + agent.budget.spent, 0);
  const activeCount = agents.filter((agent) => agent.isActive).length;

  return (
    <div className="glass border-b border-white/10 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo/Title */}
        <div className="flex items-center gap-3">
          <div className="text-3xl">🦁</div>
          <div>
            <h1 className="text-xl font-space font-bold text-white">
              AI Animal Agents
            </h1>
            <p className="text-xs text-gray-400">Mission Control Center</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6">
          {/* Active Agents */}
          <div className="glass px-4 py-2 rounded-lg">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-warning" />
              <div>
                <p className="text-xs text-gray-400">Active</p>
                <p className="text-lg font-bold text-white">{activeCount}/{agents.length}</p>
              </div>
            </div>
          </div>

          {/* Budget */}
          <div className="glass px-4 py-2 rounded-lg">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-success" />
              <div>
                <p className="text-xs text-gray-400">Budget</p>
                <p className="text-lg font-bold text-white">
                  ${totalSpent}/${totalBudget}
                </p>
              </div>
            </div>
          </div>

          {/* Add Agent Button */}
          <button className="bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-lg font-semibold transition-all hover:scale-105 flex items-center gap-2">
            <Plus className="w-5 h-5" />
            New Agent
          </button>
        </div>
      </div>
    </div>
  );
}
