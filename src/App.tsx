import { useAgentStore } from './store';
import TopBar from './components/TopBar';
import AgentZone from './components/AgentZone';
import SidePanel from './components/SidePanel';
import BottomDock from './components/BottomDock';

function App() {
  const selectedAgent = useAgentStore((state) => state.selectedAgent);

  return (
    <div className="w-full h-full flex flex-col bg-bg-primary">
      {/* Top HUD */}
      <TopBar />

      {/* Main 3D Scene Area */}
      <div className="flex-1 relative">
        <AgentZone />
        
        {/* Side Panel (slides in when agent selected) */}
        {selectedAgent && <SidePanel />}
      </div>

      {/* Bottom Dock */}
      <BottomDock />
    </div>
  );
}

export default App;
