import { useScrollProgress } from "../hooks/useScrollProgress";

export default function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div className="fixed top-[72px] left-0 w-full h-1 z-50">
      <div 
        className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
