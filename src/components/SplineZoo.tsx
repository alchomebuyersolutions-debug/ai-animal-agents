import NeuralBackground from "@/components/ui/flow-field-background";
import SplineAnimals from "./SplineAnimals";

export default function SplineZoo() {
  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* Neural Flow Field Background - Layer 1 */}
      <div className="absolute inset-0">
        <NeuralBackground 
          color="#EC4899" // Pink particles
          trailOpacity={0.08}
          particleCount={800}
          speed={0.6}
          className="opacity-40"
        />
      </div>

      {/* Glowing orbs in brand colors - Layer 2 */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      {/* Grid overlay - Layer 3 */}
      <div 
        className="absolute inset-0 opacity-10" 
        style={{
          backgroundImage: `
            linear-gradient(rgba(236,72,153,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6,182,212,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* 3D Animal Grid - Layer 4 */}
      <SplineAnimals />

      {/* Instruction overlay - Layer 5 */}
      <div className="absolute bottom-8 right-8 z-10 glass rounded-xl p-4 max-w-xs border-2 border-primary/20">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <p className="text-xs font-semibold text-primary">3D Zoo Active</p>
        </div>
        <p className="text-sm text-gray-300">
          Activate agents to see them appear in 3D! Create your own at{' '}
          <a 
            href="https://app.spline.design" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-secondary hover:text-primary transition-colors font-semibold"
          >
            spline.design
          </a>
        </p>
      </div>
    </div>
  );
}
