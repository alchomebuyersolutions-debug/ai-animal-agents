import { motion } from 'framer-motion';
import { useAgentStore } from '../store';
import type { Agent } from '../types';
import { Power, Circle } from 'lucide-react';

interface AgentCardProps {
  agent: Agent;
}

export default function AgentCard({ agent }: AgentCardProps) {
  const { selectAgent, toggleAgentStatus } = useAgentStore();

  const statusColors = {
    idle: 'bg-gray-500',
    active: 'bg-success',
    working: 'bg-warning animate-pulse',
    paused: 'bg-gray-400',
    error: 'bg-error',
  };

  const budgetPercentage = (agent.budget.spent / agent.budget.allocated) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="glass rounded-2xl p-6 cursor-pointer relative overflow-hidden group"
      onClick={() => selectAgent(agent)}
      style={{
        borderColor: agent.isActive ? agent.color : 'rgba(255,255,255,0.1)',
        borderWidth: '2px',
      }}
    >
      {/* Glow effect when active */}
      {agent.isActive && (
        <div 
          className="absolute inset-0 opacity-20 blur-xl"
          style={{ background: agent.color }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="text-5xl">{agent.avatar}</div>
            <div>
              <h3 className="text-lg font-space font-bold text-white">
                {agent.name}
              </h3>
              <p className="text-xs text-gray-400 capitalize">{agent.type}</p>
            </div>
          </div>

          {/* Status indicator */}
          <div className="flex items-center gap-2">
            <Circle className={`w-3 h-3 fill-current ${statusColors[agent.status]}`} />
          </div>
        </div>

        {/* Specialization */}
        <div className="mb-4">
          <p className="text-xs text-gray-400 mb-1">Specialization</p>
          <p className="text-sm font-semibold text-white capitalize">
            {agent.specialization.replace('-', ' ')}
          </p>
        </div>

        {/* Skills */}
        <div className="mb-4">
          <p className="text-xs text-gray-400 mb-2">Skills ({agent.skills.length})</p>
          <div className="flex flex-wrap gap-1">
            {agent.skills.slice(0, 2).map((skill) => (
              <span
                key={skill.id}
                className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-300"
              >
                {skill.name}
              </span>
            ))}
            {agent.skills.length > 2 && (
              <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-300">
                +{agent.skills.length - 2} more
              </span>
            )}
          </div>
        </div>

        {/* Budget */}
        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-400">Budget</span>
            <span className="text-white font-mono">
              ${agent.budget.spent}/${agent.budget.allocated}
            </span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-success to-warning transition-all"
              style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
            />
          </div>
        </div>

        {/* Toggle Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleAgentStatus(agent.id);
          }}
          className={`
            w-full py-2 px-4 rounded-lg font-semibold text-sm
            transition-all flex items-center justify-center gap-2
            ${agent.isActive 
              ? 'bg-error/20 text-error hover:bg-error/30' 
              : 'bg-success/20 text-success hover:bg-success/30'
            }
          `}
        >
          <Power className="w-4 h-4" />
          {agent.isActive ? 'Deactivate' : 'Activate'}
        </button>

        {/* Active mission indicator */}
        {agent.activeMission && (
          <div className="mt-3 p-2 bg-warning/10 border border-warning/30 rounded-lg">
            <p className="text-xs text-warning font-semibold mb-1">
              {agent.activeMission.title}
            </p>
            <div className="w-full h-1 bg-warning/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-warning transition-all"
                style={{ width: `${agent.activeMission.progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
