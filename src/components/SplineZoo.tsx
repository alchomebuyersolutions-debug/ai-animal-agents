import { SplineScene } from "@/components/ui/spline";

export default function SplineZoo() {
  return (
    <div className="w-full h-full relative overflow-hidden bg-bg-primary">
      {/* Animated gradient background with your color scheme */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-primary/5 to-secondary/5" />
      
      {/* Glowing orbs in brand colors */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000" />
      
      {/* Grid overlay */}
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

      {/* 3D Spline Scene */}
      <div className="absolute inset-0 z-0">
        <SplineScene 
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="w-full h-full opacity-80"
        />
      </div>

      {/* Instruction overlay */}
      <div className="absolute bottom-8 right-8 z-10 glass rounded-xl p-4 max-w-xs border-2 border-primary/20">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <p className="text-xs font-semibold text-primary">3D Zoo Active</p>
        </div>
        <p className="text-sm text-gray-300">
          Interactive 3D environment. Create custom animals at{' '}
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
