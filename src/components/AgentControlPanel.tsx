import ReactorKnob from "./ui/control-knob";
import IndustrialSwitch from "./ui/toggle-switch";
import { useAgentStore } from "@/store";
import { ArrowLeft, Sliders } from "lucide-react";
import { useState } from "react";

interface AgentControlPanelProps {
  agentId: string;
  onBack: () => void;
}

export default function AgentControlPanel({ agentId, onBack }: AgentControlPanelProps) {
  const { agents, updateAgent, toggleAgentStatus } = useAgentStore();
  const agent = agents.find(a => a.id === agentId);
  const [controlMode, setControlMode] = useState<'budget' | 'power'>('budget');

  if (!agent) return null;

  const handleBudgetChange = (value: number) => {
    // Convert 0-100 to actual budget amount (0-500)
    const newBudget = (value / 100) * 500;
    updateAgent(agent.id, {
      budget: {
        ...agent.budget,
        allocated: Math.round(newBudget),
      }
    });
  };

  const currentPercentage = (agent.budget.allocated / 500) * 100;

  const handlePowerToggle = (_isOn: boolean) => {
    toggleAgentStatus(agent.id);
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-neutral-950 flex flex-col items-center justify-center overflow-hidden z-50">
     
      {/* BACKGROUND TEXTURE */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ 
          backgroundImage: "linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }}
      />
      
      {/* VIGNETTE SHADOW */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />

      {/* Back Button */}
      <button
        onClick={onBack}
        className="absolute top-8 left-8 z-50 glass px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-white/10 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Agents</span>
      </button>

      {/* Control Mode Toggle */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-50 glass rounded-lg p-1 flex gap-1">
        <button
          onClick={() => setControlMode('budget')}
          className={`
            px-4 py-2 rounded transition-all flex items-center gap-2
            ${controlMode === 'budget' 
              ? 'bg-primary text-white' 
              : 'text-gray-400 hover:text-white hover:bg-white/10'
            }
          `}
        >
          <Sliders className="w-4 h-4" />
          Budget Control
        </button>
        <button
          onClick={() => setControlMode('power')}
          className={`
            px-4 py-2 rounded transition-all flex items-center gap-2
            ${controlMode === 'power' 
              ? 'bg-success text-white' 
              : 'text-gray-400 hover:text-white hover:bg-white/10'
            }
          `}
        >
          <ArrowLeft className="w-4 h-4 rotate-90" />
          Power Switch
        </button>
      </div>

      {/* Agent Info */}
      <div className="absolute top-8 right-8 z-50 glass rounded-xl p-4 border-2" style={{ borderColor: agent.color }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="text-4xl">{agent.avatar}</div>
          <div>
            <h3 className="text-xl font-bold text-white">{agent.name}</h3>
            <p className="text-sm text-gray-400 capitalize">{agent.type}</p>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-white/10">
          <p className="text-xs text-gray-400">Current Budget</p>
          <p className="text-2xl font-bold" style={{ color: agent.color }}>
            ${agent.budget.allocated}
          </p>
        </div>
      </div>

      {/* CONTROL DISPLAY */}
      {controlMode === 'budget' ? (
        <>
          {/* REACTOR KNOB */}
          <div className="relative z-10 scale-125 md:scale-150">
            <ReactorKnob
              initialValue={currentPercentage}
              onChange={handleBudgetChange}
              color={agent.color}
              label="BUDGET"
            />
          </div>

          {/* Budget Range Indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 glass rounded-lg px-6 py-3 z-10">
            <p className="text-xs text-gray-400 text-center mb-1">Budget Range</p>
            <p className="text-sm text-white font-mono">$0 - $500</p>
          </div>
        </>
      ) : (
        <>
          {/* INDUSTRIAL SWITCH */}
          <div className="relative z-10 scale-125 md:scale-150">
            <IndustrialSwitch
              initialValue={agent.isActive}
              onToggle={handlePowerToggle}
              color={agent.color}
            />
          </div>

          {/* Power Status Indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 glass rounded-lg px-6 py-3 z-10">
            <p className="text-xs text-gray-400 text-center mb-1">Agent Status</p>
            <p className="text-sm font-mono" style={{ color: agent.isActive ? agent.color : '#666' }}>
              {agent.isActive ? 'ONLINE' : 'STANDBY'}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
