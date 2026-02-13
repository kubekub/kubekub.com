import React, { useState } from 'react';
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
  HardDrive
} from 'lucide-react';

const App = () => {
  const [activeLayer, setActiveLayer] = useState(null);

  const LayerHeader = ({ title, icon: Icon, color }) => (
    <div className={`flex items-center space-x-3 mb-4 ${color} p-3 rounded-lg bg-opacity-10 border border-opacity-20 border-current`}>
      <Icon className="w-6 h-6" />
      <h2 className="text-xl font-bold tracking-tight uppercase">{title}</h2>
    </div>
  );

  const TechCard = ({ title, icon: Icon, subtext, type = "default" }) => {
    let typeClasses = "bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500";
    if (type === "cloud") typeClasses = "bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-800 text-blue-900 dark:text-blue-100 hover:border-blue-400 dark:hover:border-blue-500";
    if (type === "security") typeClasses = "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100 hover:border-emerald-400 dark:hover:border-emerald-500";
    if (type === "obs") typeClasses = "bg-purple-50 dark:bg-purple-900/20 border-purple-300 dark:border-purple-800 text-purple-900 dark:text-purple-100 hover:border-purple-400 dark:hover:border-purple-500";
    if (type === "agent") typeClasses = "bg-rose-50 dark:bg-rose-900/20 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-100 hover:border-rose-400 dark:hover:border-rose-500";

    return (
      <div className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 ${typeClasses}`}>
        <Icon className="w-8 h-8 mb-3 opacity-80" />
        <span className="font-semibold text-sm text-center">{title}</span>
        {subtext && <span className="text-xs opacity-60 mt-1 text-center">{subtext}</span>}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-200 p-8 font-sans selection:bg-indigo-500/30">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            KubeKub Architecture
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            A multi-cloud, agentic Kubernetes platform stack.
          </p>
        </div>

        {/* Layer 3: Agentic */}
        <div 
          className="relative group"
          onMouseEnter={() => setActiveLayer('agentic')}
          onMouseLeave={() => setActiveLayer(null)}
        >
          <div className={`absolute -inset-4 bg-gradient-to-r from-rose-500/10 to-orange-500/10 rounded-3xl blur-xl transition-opacity duration-500 ${activeLayer === 'agentic' ? 'opacity-100' : 'opacity-0'}`} />
          <div className="relative bg-slate-50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8">
            <LayerHeader title="KubeKub Agentic" icon={Zap} color="text-rose-400" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <TechCard title="KAgent" icon={Cpu} subtext="Autonomous Orchestration" type="agent" />
              <TechCard title="Agent Gateway" icon={Network} subtext="Agent Protocol Handling" type="agent" />
              <TechCard title="Envoy AI Gateway" icon={Share2} subtext="LLM Traffic Management" type="agent" />
            </div>
            
            <div className="absolute left-1/2 bottom-0 w-0.5 h-12 bg-gradient-to-b from-slate-300 dark:from-slate-700 to-transparent translate-y-full -translate-x-1/2 hidden md:block" />
          </div>
        </div>

        {/* Authentication & Authorization Layer */}
        <div 
          className="relative group"
          onMouseEnter={() => setActiveLayer('auth')}
          onMouseLeave={() => setActiveLayer(null)}
        >
          <div className={`absolute -inset-4 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 rounded-3xl blur-xl transition-opacity duration-500 ${activeLayer === 'auth' ? 'opacity-100' : 'opacity-0'}`} />
          <div className="relative bg-slate-50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8">
            <LayerHeader title="KubeKub Identity" icon={ShieldCheck} color="text-amber-400" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TechCard title="OAuth2 (Keycloak)" icon={UserCheck} subtext="Authentication" type="security" />
              <TechCard title="Authzen + OpenFGA" icon={ShieldCheck} subtext="Authorization" type="security" />
            </div>
            
            <div className="absolute left-1/2 bottom-0 w-0.5 h-12 bg-gradient-to-b from-slate-300 dark:from-slate-700 to-transparent translate-y-full -translate-x-1/2 hidden md:block" />
          </div>
        </div>

        {/* Layer 2: Ops */}
        <div 
          className="relative group"
          onMouseEnter={() => setActiveLayer('ops')}
          onMouseLeave={() => setActiveLayer(null)}
        >
          <div className={`absolute -inset-4 bg-gradient-to-r from-emerald-500/10 to-purple-500/10 rounded-3xl blur-xl transition-opacity duration-500 ${activeLayer === 'ops' ? 'opacity-100' : 'opacity-0'}`} />
          <div className="relative bg-slate-50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8">
            <LayerHeader title="KubeKub Ops" icon={Layers} color="text-emerald-400" />
            
            {/* GitOps Section - Platform Management */}
            <div className="bg-gradient-to-r from-indigo-100 dark:from-indigo-900/40 to-purple-100 dark:to-purple-900/40 rounded-xl p-5 border-2 border-indigo-300 dark:border-indigo-500/40 mb-6">
              <h3 className="text-sm font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                <GitBranch className="w-5 h-5" /> GitOps Platform Management
              </h3>
              <p className="text-indigo-600 dark:text-indigo-200/70 text-xs mb-4">Manages all Kubernetes resources, infrastructure, and platform components</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <TechCard title="ArgoCD" icon={GitBranch} subtext="Continuous Deployment" type="default" />
                <TechCard title="Crossplane" icon={RefreshCw} subtext="Infrastructure as Code" type="default" />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Networking & Security Sub-group */}
              <div className="bg-slate-100 dark:bg-slate-900/60 rounded-xl p-5 border border-slate-300 dark:border-slate-700/50">
                <h3 className="text-sm font-bold text-slate-700 dark:text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Shield className="w-4 h-4" /> Networking & Security
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <TechCard title="Kyverno" icon={FileCheck} subtext="Policy Engine" type="security" />
                  <TechCard title="Falco" icon={AlertTriangle} subtext="Runtime Security" type="security" />
                  <TechCard title="Calico" icon={Activity} subtext="eBPF Dataplane" type="security" />
                  <TechCard title="Istio" icon={LayoutGrid} subtext="Ambient Mesh" type="security" />
                  <TechCard title="Cert Manager" icon={Lock} subtext="TLS Automation" type="security" />
                  <TechCard title="External DNS" icon={Globe} subtext="DNS Sync" type="security" />
                  <TechCard title="Ext. Secrets" icon={Key} subtext="Secret Mgmt" type="security" />
                </div>
              </div>

              {/* Observability Sub-group */}
              <div className="bg-slate-100 dark:bg-slate-900/60 rounded-xl p-5 border border-slate-300 dark:border-slate-700/50">
                <h3 className="text-sm font-bold text-slate-700 dark:text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Eye className="w-4 h-4" /> Observability Stack
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <TechCard title="Prometheus" icon={Activity} subtext="Metrics Collection" type="obs" />
                  <TechCard title="Alertmanager" icon={Bell} subtext="Alert Routing" type="obs" />
                  <TechCard title="Grafana Mimir" icon={Database} subtext="LT Metrics Storage" type="obs" />
                  <TechCard title="Loki" icon={FileText} subtext="Log Aggregation" type="obs" />
                  <TechCard title="Tempo" icon={Search} subtext="Distributed Tracing" type="obs" />
                  <TechCard title="OpenTelemetry" icon={Radio} subtext="Instrumentation" type="obs" />
                </div>
              </div>

              {/* Backup & DR Sub-group */}
              <div className="bg-slate-100 dark:bg-slate-900/60 rounded-xl p-5 border border-slate-300 dark:border-slate-700/50 lg:col-span-2">
                <h3 className="text-sm font-bold text-slate-700 dark:text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <HardDrive className="w-4 h-4" /> Backup & Disaster Recovery
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <TechCard title="Velero" icon={HardDrive} subtext="Cluster Backup" type="default" />
                </div>
              </div>

            </div>
            <div className="absolute left-1/2 bottom-0 w-0.5 h-12 bg-gradient-to-b from-slate-300 dark:from-slate-700 to-transparent translate-y-full -translate-x-1/2 hidden md:block" />
          </div>
        </div>

        {/* Layer 1: Infrastructure */}
        <div 
          className="relative group"
          onMouseEnter={() => setActiveLayer('infra')}
          onMouseLeave={() => setActiveLayer(null)}
        >
          <div className={`absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-3xl blur-xl transition-opacity duration-500 ${activeLayer === 'infra' ? 'opacity-100' : 'opacity-0'}`} />
          <div className="relative bg-slate-50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8">
            <LayerHeader title="Infrastructure & Core" icon={Server} color="text-blue-400" />
            
            <div className="flex flex-col gap-6">
              
              {/* The Unifying Layer */}
              <div className="bg-indigo-100 dark:bg-indigo-900/20 border border-indigo-300 dark:border-indigo-500/30 rounded-lg p-4 text-center">
                <h3 className="text-lg font-bold text-indigo-700 dark:text-indigo-300 flex items-center justify-center gap-2">
                  <Box className="w-5 h-5" /> Kubernetes Core
                </h3>
                <p className="text-indigo-600 dark:text-indigo-200/60 text-sm mt-1">Unified API Abstraction Layer</p>
              </div>

              {/* Multi-Cloud & On-Prem Grid */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <TechCard title="AWS" icon={Cloud} subtext="EKS" type="cloud" />
                <TechCard title="Azure" icon={Cloud} subtext="AKS" type="cloud" />
                <TechCard title="GCP" icon={Cloud} subtext="GKE" type="cloud" />
                <TechCard title="Tencent" icon={Cloud} subtext="TKE" type="cloud" />
                <div className="col-span-2 md:col-span-1">
                   <TechCard title="Bare Metal" icon={Server} subtext="Kubespray / Minikube" type="cloud" />
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default App;
