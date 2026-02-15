// Contains AI-generated edits for kubekub.com - 2026-02-15
import React, { useState } from 'react';
import architectureData from '~/data/blueprint/architecture.json';
import { 
  Cloud, 
  Server, 
  Shield, 
  Activity, 
  Database, 
  Globe, 
  Cpu, 
  Layers, 
  Lock, 
  Eye, 
  Network, 
  Box, 
  Zap,
  LayoutGrid,
  Search,
  Key,
  FileText,
  Radio,
  Share2,
  GitBranch,
  RefreshCw,
  FileCheck,
  UserCheck,
  ShieldCheck,
  AlertTriangle,
  Bell,
  HardDrive,
  Wrench,
  Plug
} from 'lucide-react';

const iconMap = {
  Cloud,
  Server,
  Shield,
  Activity,
  Database,
  Globe,
  Cpu,
  Layers,
  Lock,
  Eye,
  Network,
  Box,
  Zap,
  LayoutGrid,
  Search,
  Key,
  FileText,
  Radio,
  Share2,
  GitBranch,
  RefreshCw,
  FileCheck,
  UserCheck,
  ShieldCheck,
  AlertTriangle,
  Bell,
  HardDrive,
  Wrench,
  Plug
};

const resolveIcon = (name) => iconMap[name] || Box;

const App = () => {
  const [activeLayer, setActiveLayer] = useState(null);
  const [isCompact, setIsCompact] = useState(false);
  const layers = architectureData?.layers || [];
  const getLayer = (id) => layers.find((layer) => layer.id === id) || {};
  const agenticLayer = getLayer('agentic');
  const identityLayer = getLayer('identity');
  const opsLayer = getLayer('ops');
  const infraLayer = getLayer('infra');
  const gitops = opsLayer?.gitops || {};
  const opsGroups = opsLayer?.groups || [];
  const networkingGroup = opsGroups.find((group) => group.id === 'networking') || {};
  const observabilityGroup = opsGroups.find((group) => group.id === 'observability') || {};
  const backupGroup = opsGroups.find((group) => group.id === 'backup') || {};

  const LayerHeader = ({ title, icon: Icon, color }) => (
    <div className={`flex items-center space-x-3 ${isCompact ? 'mb-2' : 'mb-4'} ${color} ${isCompact ? 'p-2' : 'p-3'} rounded-lg bg-opacity-10 border border-opacity-20 border-current`}>
      <Icon className={isCompact ? 'w-4 h-4' : 'w-6 h-6'} />
      <h2 className={`${isCompact ? 'text-base' : 'text-xl'} font-bold tracking-tight uppercase`}>{title}</h2>
    </div>
  );

  const TechCard = ({ title, icon: Icon, subtext, type = "default" }) => {
    let typeClasses = "bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500";
    if (type === "cloud") typeClasses = "bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-800 text-blue-900 dark:text-blue-100 hover:border-blue-400 dark:hover:border-blue-500";
    if (type === "security") typeClasses = "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100 hover:border-emerald-400 dark:hover:border-emerald-500";
    if (type === "obs") typeClasses = "bg-purple-50 dark:bg-purple-900/20 border-purple-300 dark:border-purple-800 text-purple-900 dark:text-purple-100 hover:border-purple-400 dark:hover:border-purple-500";
    if (type === "agent") typeClasses = "bg-rose-50 dark:bg-rose-900/20 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-100 hover:border-rose-400 dark:hover:border-rose-500";

    return (
      <div className={`flex flex-col items-center justify-center ${isCompact ? 'p-2' : 'p-4'} rounded-xl border transition-all duration-300 ${isCompact ? 'shadow hover:shadow-md' : 'shadow-lg hover:shadow-xl hover:-translate-y-1'} ${typeClasses}`}>
        <Icon className={`${isCompact ? 'w-4 h-4 mb-1' : 'w-8 h-8 mb-3'} opacity-80`} />
        <span className={`font-semibold ${isCompact ? 'text-xs' : 'text-sm'} text-center`}>{title}</span>
        {subtext && !isCompact && <span className="text-xs opacity-60 mt-1 text-center">{subtext}</span>}
      </div>
    );
  };

  return (
    <div className={`min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-200 ${isCompact ? 'p-4' : 'p-8'} font-sans selection:bg-indigo-500/30`}>
      <div className={`max-w-7xl mx-auto ${isCompact ? 'space-y-4' : 'space-y-12'}`}>
        
        {/* Header */}
        <div className={`text-center ${isCompact ? 'space-y-2 mb-4' : 'space-y-4 mb-12'}`}>
          <div className="flex items-center justify-between">
            <div className="flex-1"></div>
            <h1 className={`${isCompact ? 'text-2xl md:text-3xl' : 'text-4xl md:text-5xl'} font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent flex-1`}>
              Kubekub Architecture
            </h1>
            <div className="flex-1 flex justify-end">
              <button
                onClick={() => setIsCompact(!isCompact)}
                className={`${isCompact ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm'} rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors font-medium`}
              >
                {isCompact ? 'Detailed View' : 'Compact View'}
              </button>
            </div>
          </div>
          {!isCompact && (
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
              A multi-cloud, agentic Kubernetes platform stack.
            </p>
          )}
        </div>

        {/* Layer 3: Agentic */}
        <div 
          className="relative group"
          onMouseEnter={() => !isCompact && setActiveLayer('agentic')}
          onMouseLeave={() => setActiveLayer(null)}
        >
          {!isCompact && <div className={`absolute -inset-4 bg-gradient-to-r from-rose-500/10 to-orange-500/10 rounded-3xl blur-xl transition-opacity duration-500 ${activeLayer === 'agentic' ? 'opacity-100' : 'opacity-0'}`} />}
          <div className={`relative bg-slate-50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-2xl ${isCompact ? 'p-3 md:p-4' : 'p-6 md:p-8'}`}>
            <LayerHeader title={agenticLayer.title} icon={resolveIcon(agenticLayer.icon)} color={agenticLayer.color} />
            
            <div className={`grid grid-cols-1 md:grid-cols-${agenticLayer?.layout?.columns || 3} ${isCompact ? 'gap-3' : 'gap-6'}`}>
              {(agenticLayer?.items || []).map((item) => (
                <TechCard key={item.title} title={item.title} icon={resolveIcon(item.icon)} subtext={item.subtext} type={item.type} />
              ))}
            </div>
            
            <div className={`absolute left-1/2 bottom-0 w-0.5 ${isCompact ? 'h-6' : 'h-12'} bg-gradient-to-b from-slate-300 dark:from-slate-700 to-transparent translate-y-full -translate-x-1/2 hidden md:block`} />
          </div>
        </div>

        {/* Authentication & Authorization Layer */}
        <div 
          className="relative group"
          onMouseEnter={() => !isCompact && setActiveLayer('auth')}
          onMouseLeave={() => setActiveLayer(null)}
        >
          {!isCompact && <div className={`absolute -inset-4 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 rounded-3xl blur-xl transition-opacity duration-500 ${activeLayer === 'auth' ? 'opacity-100' : 'opacity-0'}`} />}
          <div className={`relative bg-slate-50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-2xl ${isCompact ? 'p-3 md:p-4' : 'p-6 md:p-8'}`}>
            <LayerHeader title={identityLayer.title} icon={resolveIcon(identityLayer.icon)} color={identityLayer.color} />
            
            <div className={`grid grid-cols-1 md:grid-cols-${identityLayer?.layout?.columns || 2} ${isCompact ? 'gap-3' : 'gap-6'}`}>
              {(identityLayer?.items || []).map((item) => (
                <TechCard key={item.title} title={item.title} icon={resolveIcon(item.icon)} subtext={item.subtext} type={item.type} />
              ))}
            </div>
            
            <div className={`absolute left-1/2 bottom-0 w-0.5 ${isCompact ? 'h-6' : 'h-12'} bg-gradient-to-b from-slate-300 dark:from-slate-700 to-transparent translate-y-full -translate-x-1/2 hidden md:block`} />
          </div>
        </div>

        {/* Layer 2: Ops */}
        <div 
          className="relative group"
          onMouseEnter={() => !isCompact && setActiveLayer('ops')}
          onMouseLeave={() => setActiveLayer(null)}
        >
          {!isCompact && <div className={`absolute -inset-4 bg-gradient-to-r from-emerald-500/10 to-purple-500/10 rounded-3xl blur-xl transition-opacity duration-500 ${activeLayer === 'ops' ? 'opacity-100' : 'opacity-0'}`} />}
          <div className={`relative bg-slate-50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-2xl ${isCompact ? 'p-3 md:p-4' : 'p-6 md:p-8'}`}>
            <LayerHeader title={opsLayer.title} icon={resolveIcon(opsLayer.icon)} color={opsLayer.color} />
            
            {/* GitOps Section - Platform Management */}
            <div className={`bg-gradient-to-r from-indigo-100 dark:from-indigo-900/40 to-purple-100 dark:to-purple-900/40 rounded-xl ${isCompact ? 'p-3' : 'p-5'} border-2 border-indigo-300 dark:border-indigo-500/40 ${isCompact ? 'mb-3' : 'mb-6'}`}>
              <h3 className={`${isCompact ? 'text-xs' : 'text-sm'} font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider ${isCompact ? 'mb-1' : 'mb-2'} flex items-center gap-2`}>
                {React.createElement(resolveIcon(gitops.icon), { className: isCompact ? 'w-3 h-3' : 'w-5 h-5' })} {gitops.title}
              </h3>
              {!isCompact && <p className="text-indigo-600 dark:text-indigo-200/70 text-xs mb-4">{gitops.description}</p>}
              <div className={`grid grid-cols-2 sm:grid-cols-4 ${isCompact ? 'gap-2' : 'gap-4'}`}>
                {(gitops?.items || []).map((item) => (
                  <TechCard key={item.title} title={item.title} icon={resolveIcon(item.icon)} subtext={item.subtext} type={item.type} />
                ))}
              </div>
            </div>

            <div className={`grid grid-cols-1 lg:grid-cols-2 ${isCompact ? 'gap-4' : 'gap-8'}`}>
              
              {/* Networking & Security Sub-group */}
              <div className={`bg-slate-100 dark:bg-slate-900/60 rounded-xl ${isCompact ? 'p-3' : 'p-5'} border border-slate-300 dark:border-slate-700/50`}>
                <h3 className={`${isCompact ? 'text-xs' : 'text-sm'} font-bold text-slate-700 dark:text-slate-400 uppercase tracking-wider ${isCompact ? 'mb-2' : 'mb-4'} flex items-center gap-2`}>
                  {React.createElement(resolveIcon(networkingGroup.icon), { className: isCompact ? 'w-3 h-3' : 'w-4 h-4' })} {networkingGroup.title}
                </h3>
                <div className={`grid grid-cols-2 sm:grid-cols-3 ${isCompact ? 'gap-2' : 'gap-4'}`}>
                  {(networkingGroup?.items || []).map((item) => (
                    <TechCard key={item.title} title={item.title} icon={resolveIcon(item.icon)} subtext={item.subtext} type={item.type} />
                  ))}
                </div>
              </div>

              {/* Observability Sub-group */}
              <div className={`bg-slate-100 dark:bg-slate-900/60 rounded-xl ${isCompact ? 'p-3' : 'p-5'} border border-slate-300 dark:border-slate-700/50`}>
                <h3 className={`${isCompact ? 'text-xs' : 'text-sm'} font-bold text-slate-700 dark:text-slate-400 uppercase tracking-wider ${isCompact ? 'mb-2' : 'mb-4'} flex items-center gap-2`}>
                  {React.createElement(resolveIcon(observabilityGroup.icon), { className: isCompact ? 'w-3 h-3' : 'w-4 h-4' })} {observabilityGroup.title}
                </h3>
                <div className={`grid grid-cols-2 sm:grid-cols-3 ${isCompact ? 'gap-2' : 'gap-4'}`}>
                  {(observabilityGroup?.items || []).map((item) => (
                    <TechCard key={item.title} title={item.title} icon={resolveIcon(item.icon)} subtext={item.subtext} type={item.type} />
                  ))}
                </div>
              </div>

              {/* Backup & DR Sub-group */}
              <div className={`bg-slate-100 dark:bg-slate-900/60 rounded-xl ${isCompact ? 'p-3' : 'p-5'} border border-slate-300 dark:border-slate-700/50 lg:col-span-2`}>
                <h3 className={`${isCompact ? 'text-xs' : 'text-sm'} font-bold text-slate-700 dark:text-slate-400 uppercase tracking-wider ${isCompact ? 'mb-2' : 'mb-4'} flex items-center gap-2`}>
                  {React.createElement(resolveIcon(backupGroup.icon), { className: isCompact ? 'w-3 h-3' : 'w-4 h-4' })} {backupGroup.title}
                </h3>
                <div className={`grid grid-cols-2 sm:grid-cols-3 ${isCompact ? 'gap-2' : 'gap-4'}`}>
                  {(backupGroup?.items || []).map((item) => (
                    <TechCard key={item.title} title={item.title} icon={resolveIcon(item.icon)} subtext={item.subtext} type={item.type} />
                  ))}
                </div>
              </div>

            </div>
            <div className={`absolute left-1/2 bottom-0 w-0.5 ${isCompact ? 'h-6' : 'h-12'} bg-gradient-to-b from-slate-300 dark:from-slate-700 to-transparent translate-y-full -translate-x-1/2 hidden md:block`} />
          </div>
        </div>

        {/* Layer 1: Infrastructure */}
        <div 
          className="relative group"
          onMouseEnter={() => !isCompact && setActiveLayer('infra')}
          onMouseLeave={() => setActiveLayer(null)}
        >
          {!isCompact && <div className={`absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-3xl blur-xl transition-opacity duration-500 ${activeLayer === 'infra' ? 'opacity-100' : 'opacity-0'}`} />}
          <div className={`relative bg-slate-50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-2xl ${isCompact ? 'p-3 md:p-4' : 'p-6 md:p-8'}`}>
            <LayerHeader title={infraLayer.title} icon={resolveIcon(infraLayer.icon)} color={infraLayer.color} />
            
            <div className={`flex flex-col ${isCompact ? 'gap-3' : 'gap-6'}`}>
              
              {/* The Unifying Layer */}
              <div className={`bg-indigo-100 dark:bg-indigo-900/20 border border-indigo-300 dark:border-indigo-500/30 rounded-lg ${isCompact ? 'p-2' : 'p-4'} text-center`}>
                <h3 className={`${isCompact ? 'text-sm' : 'text-lg'} font-bold text-indigo-700 dark:text-indigo-300 flex items-center justify-center gap-2`}>
                  {React.createElement(resolveIcon(infraLayer?.core?.icon), { className: isCompact ? 'w-3 h-3' : 'w-5 h-5' })} {infraLayer?.core?.title}
                </h3>
                {!isCompact && <p className="text-indigo-600 dark:text-indigo-200/60 text-sm mt-1">{infraLayer?.core?.description}</p>}
              </div>

              {/* Multi-Cloud & On-Prem Grid */}
              <div className={`grid grid-cols-2 md:grid-cols-5 ${isCompact ? 'gap-2' : 'gap-4'}`}>
                {(infraLayer?.items || []).map((item, index) => (
                  <div key={item.title} className={index === 4 ? 'col-span-2 md:col-span-1' : undefined}>
                    <TechCard title={item.title} icon={resolveIcon(item.icon)} subtext={item.subtext} type={item.type} />
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default App;
