import { motion } from 'framer-motion';
import { useAgentStore } from '../store';
import { X, Rocket, TrendingUp, Key, DollarSign } from 'lucide-react';

export default function SidePanel() {
  const { selectedAgent, selectAgent } = useAgentStore();

  if (!selectedAgent) return null;

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="absolute right-0 top-0 h-full w-full md:w-[480px] glass border-l border-white/10 overflow-y-auto"
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="text-6xl">{selectedAgent.avatar}</div>
            <div>
              <h2 className="text-2xl font-space font-bold text-white">
                {selectedAgent.name}
              </h2>
              <p className="text-sm text-gray-400 capitalize">
                {selectedAgent.specialization.replace('-', ' ')}
              </p>
            </div>
          </div>
          <button
            onClick={() => selectAgent(null)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Status Badge */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <div
              className="w-2 h-2 rounded-full"
              style={{ 
                backgroundColor: selectedAgent.isActive ? '#10B981' : '#6B7280'
              }}
            />
            <span className="text-sm font-medium capitalize">
              {selectedAgent.status}
            </span>
          </div>
        </div>

        {/* Budget Section */}
        <div className="glass rounded-xl p-4 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <DollarSign className="w-5 h-5 text-success" />
            <h3 className="text-lg font-space font-bold">Budget</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Allocated</span>
              <span className="font-mono text-white">
                ${selectedAgent.budget.allocated} {selectedAgent.budget.currency}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Spent</span>
              <span className="font-mono text-warning">
                ${selectedAgent.budget.spent}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Remaining</span>
              <span className="font-mono text-success">
                ${selectedAgent.budget.allocated - selectedAgent.budget.spent}
              </span>
            </div>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mt-3">
            <div
              className="h-full bg-gradient-to-r from-success to-warning transition-all"
              style={{ 
                width: `${Math.min((selectedAgent.budget.spent / selectedAgent.budget.allocated) * 100, 100)}%` 
              }}
            />
          </div>
        </div>

        {/* Skills Section */}
        <div className="glass rounded-xl p-4 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-space font-bold">Skills</h3>
          </div>
          <div className="space-y-3">
            {selectedAgent.skills.map((skill) => (
              <div key={skill.id} className="p-3 bg-white/5 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-white">{skill.name}</h4>
                  <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">
                    Level {skill.level}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mb-2">{skill.description}</p>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500 capitalize">{skill.category}</span>
                  <span className="text-warning font-mono">${skill.costPerUse}/use</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* API Keys Section */}
        <div className="glass rounded-xl p-4 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Key className="w-5 h-5 text-secondary" />
            <h3 className="text-lg font-space font-bold">API Keys</h3>
          </div>
          {selectedAgent.apiKeys.length > 0 ? (
            <div className="space-y-2">
              {selectedAgent.apiKeys.map((apiKey) => (
                <div key={apiKey.id} className="p-3 bg-white/5 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold capitalize">{apiKey.service}</span>
                    <span className="text-xs text-gray-400 font-mono">
                      {apiKey.usageCurrent}/{apiKey.usageLimit}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-sm text-gray-400">No API keys configured</p>
              <button className="mt-2 text-sm text-primary hover:underline">
                + Add API Key
              </button>
            </div>
          )}
        </div>

        {/* New Mission Button */}
        <button
          className="w-full bg-primary hover:bg-primary/80 text-white py-3 px-4 rounded-lg font-semibold transition-all hover:scale-105 flex items-center justify-center gap-2"
        >
          <Rocket className="w-5 h-5" />
          Deploy New Mission
        </button>
      </div>
    </motion.div>
  );
}
