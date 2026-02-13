import React, { useState } from 'react';
import { 
  Cloud, Shield, Activity, Box, Zap, Server, Layers, Eye, 
  Database, Lock, Globe, Cpu, Search, FileText, BarChart, 
  GitBranch, RefreshCw, Command, FileCheck, Network, 
  HardDrive, Key, Workflow, Anchor, Radio, Settings,
  LucideIcon
} from 'lucide-react';

// --- Types & Interfaces ---

interface Technology {
  name: string;
  desc: string;
  icon: LucideIcon;
  sub?: string;
}

interface SectionData {
  id: string;
  title: string;
  color: 'orange' | 'purple' | 'blue' | 'indigo' | 'slate' | 'pink' | 'emerald';
  icon: LucideIcon;
  items: Technology[];
}

interface ArchitectureData {
  platform: {
    name: string;
    description: string;
    version: string;
    management: string;
  };
  columns: {
    control: SectionData[];
    runtime: SectionData[];
    observability: SectionData[];
  };
}

// --- Data Population from platform-technologies.yaml ---

const architecture: ArchitectureData = {
  platform: {
    name: "kubekub-ai-lab",
    description: "Production-ready Kubernetes platform for secure Agentic AI workloads",
    version: "2026.2.13",
    management: "ArgoCD GitOps"
  },
  columns: {
    control: [
      {
        id: 'gitops',
        title: 'Control Plane (GitOps)',
        color: 'orange',
        icon: GitBranch,
        items: [
          { name: "ArgoCD", desc: "GitOps continuous delivery tool", icon: RefreshCw, sub: "Management" },
          { name: "Crossplane", desc: "Universal cloud infrastructure management", icon: Cloud, sub: "IaC" },
          { name: "Crossplane GCP", desc: "Google Cloud Platform provider", icon: Globe, sub: "Provider" },
          { name: "Crossplane Keycloak", desc: "Keycloak resource management", icon: Key, sub: "Provider" }
        ]
      }
    ],
    runtime: [
      {
        id: 'ai',
        title: 'Layer 4: AI & Agentic Runtime',
        color: 'purple',
        icon: Zap,
        items: [
          { name: "Kagent", desc: "Agentic AI platform with security & telemetry", icon: Cpu, sub: "Agentic-Platform" },
          { name: "Ollama", desc: "Local LLM inference runtime", icon: Box, sub: "Inference" },
          { name: "vLLM", desc: "High-throughput LLM inference (PagedAttention)", icon: Zap, sub: "Inference" },
          { name: "KServe", desc: "K8s-native model serving with autoscaling", icon: Server, sub: "Inference" },
          { name: "ToolHive Operator", desc: "Tool registry for AI agents", icon: Box, sub: "Tools" },
          { name: "Open WebUI", desc: "Self-hosted web interface for LLMs", icon: FileText, sub: "UI" },
          { name: "dot.ai", desc: "AI workflow orchestration", icon: Workflow, sub: "Orchestration" },
          { name: "K8sGPT", desc: "Cluster diagnostics using AI", icon: Search, sub: "Operations" },
          { name: "Gateway API Ext", desc: "AI inference routing extensions", icon: Network, sub: "Networking" }
        ]
      },
      {
        id: 'middleware',
        title: 'Layer 3: Connectivity & Security',
        color: 'blue',
        icon: Shield,
        items: [
          { name: "Istio Ambient", desc: "Sidecar-less mesh (Ztunnel)", icon: Layers, sub: "Service Mesh" },
          { name: "Envoy AI Gateway", desc: "Optimized for AI inference traffic", icon: Network, sub: "Gateway" },
          { name: "Kyverno", desc: "Policy engine for security/compliance", icon: FileCheck, sub: "Policy" },
          { name: "Keycloak", desc: "IAM platform (OIDC/OAuth2)", icon: Key, sub: "Identity" },
          { name: "External Secrets", desc: "Syncs secrets from external vaults", icon: Lock, sub: "Secrets" },
          { name: "Otterize", desc: "Zero-trust network policy automation", icon: Shield, sub: "NetPol" },
          { name: "Cert Manager", desc: "Automated TLS management", icon: FileCheck, sub: "Certificates" },
          { name: "External DNS", desc: "Automated DNS record management", icon: Globe, sub: "DNS" },
          { name: "Tailscale Operator", desc: "Zero-config VPN mesh", icon: Radio, sub: "VPN" },
          { name: "Knative Serving", desc: "Serverless workload execution", icon: Zap, sub: "Serverless" }
        ]
      },
      {
        id: 'compute',
        title: 'Layer 2: Compute & Accelerators',
        color: 'indigo',
        icon: Server,
        items: [
          { name: "NVIDIA GPU Op", desc: "Automated NVIDIA GPU management", icon: Cpu, sub: "GPU" },
          { name: "AMD GPU Op", desc: "AMD GPU support & management", icon: Cpu, sub: "GPU" }
        ]
      },
      {
        id: 'infra',
        title: 'Layer 1: Base Infrastructure',
        color: 'slate',
        icon: Anchor,
        items: [
          { name: "Tigera Operator", desc: "Calico CNI & network policy", icon: Network, sub: "CNI" },
          { name: "CloudNativePG", desc: "PostgreSQL for cloud-native", icon: Database, sub: "Database" },
          { name: "MinIO Operator", desc: "S3-compatible object storage", icon: HardDrive, sub: "Storage" },
          { name: "OpenEBS", desc: "Container-attached storage", icon: HardDrive, sub: "Storage" },
          { name: "CoreDNS", desc: "Service discovery", icon: Globe, sub: "DNS" },
          { name: "OLM", desc: "Operator Lifecycle Manager", icon: Settings, sub: "Lifecycle" },
          { name: "MetalLB", desc: "Bare-metal load balancer", icon: Server, sub: "LoadBalancer" }
        ]
      }
    ],
    observability: [
      {
        id: 'monitoring',
        title: 'Observability',
        color: 'pink',
        icon: Eye,
        items: [
          { name: "Grafana", desc: "Visualization & dashboards", icon: Activity, sub: "Visualization" },
          { name: "Prometheus", desc: "Metrics collection & storage", icon: BarChart, sub: "Metrics" },
          { name: "Metrics Server", desc: "Resource metrics for HPA", icon: Activity, sub: "Metrics" },
          { name: "Kiali", desc: "Mesh observability console", icon: Network, sub: "Mesh Obs" }
        ]
      }
    ]
  }
};

// --- Components ---

const Card: React.FC<{ item: Technology; color: string }> = ({ item, color }) => (
  <div className={`
    flex items-start gap-3 p-3 rounded-lg border bg-white shadow-sm transition-all hover:shadow-md hover:scale-[1.02] cursor-default group
    border-${color}-100 hover:border-${color}-300
  `}>
    <div className={`p-2 rounded bg-${color}-50 text-${color}-600 group-hover:bg-${color}-100 transition-colors`}>
      <item.icon size={16} />
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-center mb-0.5">
        <div className="text-xs font-bold text-slate-800 truncate pr-2">{item.name}</div>
        {item.sub && (
          <span className={`text-[9px] uppercase font-bold tracking-wider text-${color}-500 bg-${color}-50 px-1.5 py-0.5 rounded`}>
            {item.sub}
          </span>
        )}
      </div>
      <div className="text-[10px] text-slate-500 leading-tight">{item.desc}</div>
    </div>
  </div>
);

const Section: React.FC<{ section: SectionData }> = ({ section }) => (
  <div className={`
    flex flex-col gap-3 p-4 rounded-xl border bg-${section.color}-50/30 border-${section.color}-200 h-full
  `}>
    <div className={`flex items-center gap-2 text-${section.color}-800 border-b border-${section.color}-200 pb-2 mb-1`}>
      <section.icon size={18} />
      <h3 className="text-sm font-bold uppercase tracking-wide">{section.title}</h3>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
      {section.items.map((item, idx) => (
        <Card key={idx} item={item} color={section.color} />
      ))}
    </div>
  </div>
);

const KubeKubArchitecture: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-start md:items-end border-b pb-6 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight flex items-center gap-3">
            <Box className="text-purple-600" size={32} />
            {architecture.platform.name}
          </h1>
          <p className="text-slate-500 mt-2 text-sm max-w-2xl">
            {architecture.platform.description}
          </p>
        </div>
        <div className="flex flex-col items-end">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 text-slate-50 rounded-full text-xs font-mono mb-1">
            <GitBranch size={12} />
            {architecture.platform.management}
          </div>
          <div className="text-xs text-slate-400 font-mono">
            {architecture.platform.version}
          </div>
        </div>
      </div>

      {/* Main Diagram Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6 items-stretch">
        
        {/* LEFT: Control Plane */}
        <div className="col-span-12 md:col-span-3 lg:col-span-2 flex flex-col gap-6">
          {architecture.columns.control.map(s => <Section key={s.id} section={s} />)}
          
          <div className="mt-auto p-4 bg-slate-100 border border-slate-200 rounded-xl text-[10px] text-slate-500">
             <div className="font-bold text-slate-700 mb-2">Cluster Info</div>
             <div className="grid grid-cols-2 gap-2">
               <div>Type:</div>
               <div className="font-mono text-slate-800">Kind / Prod</div>
               <div>Focus:</div>
               <div className="font-mono text-slate-800">Agentic AI</div>
             </div>
          </div>
        </div>

        {/* CENTER: The Stack (Runtime) */}
        <div className="col-span-12 md:col-span-9 lg:col-span-8 flex flex-col gap-4">
          {/* We map the runtime stack in order */}
          {architecture.columns.runtime.map(s => <Section key={s.id} section={s} />)}
        </div>

        {/* RIGHT: Observability */}
        <div className="col-span-12 md:col-span-12 lg:col-span-2 flex flex-col md:flex-row lg:flex-col gap-6">
          {architecture.columns.observability.map(s => <Section key={s.id} section={s} />)}
          
          {/* Legend / Info Box */}
          <div className="flex-1 p-4 bg-white border rounded-xl text-xs text-slate-500 shadow-sm">
            <h4 className="font-bold text-slate-700 mb-2 flex items-center gap-2">
              <Activity size={14} /> Stack Stats
            </h4>
            <ul className="space-y-2">
              <li className="flex justify-between border-b border-slate-100 pb-1">
                <span>Total Tech:</span> 
                <span className="font-mono font-bold text-slate-800">70+</span>
              </li>
              <li className="flex justify-between border-b border-slate-100 pb-1">
                <span>Categories:</span> 
                <span className="font-mono font-bold text-slate-800">10</span>
              </li>
              <li className="pt-1">
                <span className="block mb-1">Primary Focus:</span> 
                <span className="inline-block px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full text-[10px] font-bold">
                  AI Security
                </span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

export default KubeKubArchitecture;
