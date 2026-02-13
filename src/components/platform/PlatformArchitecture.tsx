import { useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Position,
} from 'reactflow';
import type { Node, Edge } from 'reactflow';
import 'reactflow/dist/style.css';

const nodeDefaults = {
  sourcePosition: Position.Bottom,
  targetPosition: Position.Top,
};

const initialNodes: Node[] = [
  // Infrastructure Layer
  {
    id: 'infra-title',
    type: 'group',
    position: { x: 0, y: 0 },
    style: { width: 1400, height: 200, backgroundColor: '#f0f9ff', border: '2px solid #0ea5e9' },
    data: { label: 'Infrastructure Layer' },
  },
  {
    id: 'aws',
    position: { x: 50, y: 50 },
    data: { label: '☁️ AWS' },
    parentNode: 'infra-title',
    extent: 'parent' as const,
    style: { backgroundColor: '#ff9900', color: 'white', border: 'none', fontWeight: 'bold' },
  },
  {
    id: 'azure',
    position: { x: 250, y: 50 },
    data: { label: '☁️ Azure' },
    parentNode: 'infra-title',
    extent: 'parent' as const,
    style: { backgroundColor: '#0078d4', color: 'white', border: 'none', fontWeight: 'bold' },
  },
  {
    id: 'gcp',
    position: { x: 450, y: 50 },
    data: { label: '☁️ GCP' },
    parentNode: 'infra-title',
    extent: 'parent' as const,
    style: { backgroundColor: '#4285f4', color: 'white', border: 'none', fontWeight: 'bold' },
  },
  {
    id: 'tencent',
    position: { x: 650, y: 50 },
    data: { label: '☁️ Tencent' },
    parentNode: 'infra-title',
    extent: 'parent' as const,
    style: { backgroundColor: '#006eff', color: 'white', border: 'none', fontWeight: 'bold' },
  },
  {
    id: 'baremetal',
    position: { x: 850, y: 50 },
    data: { label: '🖥️ Bare Metal' },
    parentNode: 'infra-title',
    extent: 'parent' as const,
    style: { backgroundColor: '#64748b', color: 'white', border: 'none', fontWeight: 'bold' },
  },
  {
    id: 'kubespray',
    position: { x: 1050, y: 50 },
    data: { label: '⚙️ Kubespray' },
    parentNode: 'infra-title',
    extent: 'parent' as const,
    style: { backgroundColor: '#326ce5', color: 'white', border: 'none', fontWeight: 'bold' },
  },
  {
    id: 'minikube',
    position: { x: 1250, y: 50 },
    data: { label: '💻 Minikube' },
    parentNode: 'infra-title',
    extent: 'parent' as const,
    style: { backgroundColor: '#326ce5', color: 'white', border: 'none', fontWeight: 'bold' },
  },

  // Kubernetes Layer
  {
    id: 'k8s-layer',
    position: { x: 0, y: 250 },
    data: { label: '⎈ Kubernetes Layer (Cloud Provider Managed)' },
    style: { 
      width: 1400, 
      height: 100, 
      backgroundColor: '#326ce5', 
      color: 'white',
      fontSize: '18px',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },

  // Kubekub-Ops Layer
  {
    id: 'ops-title',
    type: 'group',
    position: { x: 0, y: 400 },
    style: { width: 1400, height: 650, backgroundColor: '#fef3c7', border: '2px solid #f59e0b' },
    data: { label: 'Kubekub-Ops Layer (GitOps Managed)' },
  },

  // AI & ML
  {
    id: 'ai-group',
    type: 'group',
    position: { x: 20, y: 50 },
    parentNode: 'ops-title',
    extent: 'parent' as const,
    style: { width: 420, height: 250, backgroundColor: '#dbeafe', border: '2px solid #3b82f6' },
    data: { label: '🤖 AI & ML' },
  },
  { id: 'ollama', position: { x: 10, y: 40 }, data: { label: 'Ollama' }, parentNode: 'ai-group', extent: 'parent' as const },
  { id: 'kserve', position: { x: 110, y: 40 }, data: { label: 'KServe' }, parentNode: 'ai-group', extent: 'parent' as const },
  { id: 'kagent', position: { x: 210, y: 40 }, data: { label: 'Kagent' }, parentNode: 'ai-group', extent: 'parent' as const },
  { id: 'vllm', position: { x: 310, y: 40 }, data: { label: 'vLLM' }, parentNode: 'ai-group', extent: 'parent' as const },
  { id: 'openwebui', position: { x: 10, y: 100 }, data: { label: 'Open WebUI' }, parentNode: 'ai-group', extent: 'parent' as const },
  { id: 'k8sgpt', position: { x: 160, y: 100 }, data: { label: 'K8sGPT' }, parentNode: 'ai-group', extent: 'parent' as const },
  { id: 'toolhive', position: { x: 260, y: 100 }, data: { label: 'ToolHive' }, parentNode: 'ai-group', extent: 'parent' as const },

  // Security
  {
    id: 'security-group',
    type: 'group',
    position: { x: 460, y: 50 },
    parentNode: 'ops-title',
    extent: 'parent' as const,
    style: { width: 420, height: 250, backgroundColor: '#fecaca', border: '2px solid #ef4444' },
    data: { label: '🔒 Security' },
  },
  { id: 'kyverno', position: { x: 10, y: 40 }, data: { label: 'Kyverno' }, parentNode: 'security-group', extent: 'parent' as const },
  { id: 'keycloak', position: { x: 110, y: 40 }, data: { label: 'Keycloak' }, parentNode: 'security-group', extent: 'parent' as const },
  { id: 'ext-secrets', position: { x: 210, y: 40 }, data: { label: 'Ext Secrets' }, parentNode: 'security-group', extent: 'parent' as const },
  { id: 'otterize', position: { x: 310, y: 40 }, data: { label: 'Otterize' }, parentNode: 'security-group', extent: 'parent' as const },

  // Istio Service Mesh
  {
    id: 'istio-group',
    type: 'group',
    position: { x: 900, y: 50 },
    parentNode: 'ops-title',
    extent: 'parent' as const,
    style: { width: 420, height: 250, backgroundColor: '#e0e7ff', border: '2px solid #6366f1' },
    data: { label: '🕸️ Service Mesh' },
  },
  { id: 'istio-base', position: { x: 10, y: 40 }, data: { label: 'Istio Base' }, parentNode: 'istio-group', extent: 'parent' as const },
  { id: 'istiod', position: { x: 120, y: 40 }, data: { label: 'Istiod' }, parentNode: 'istio-group', extent: 'parent' as const },
  { id: 'ztunnel', position: { x: 230, y: 40 }, data: { label: 'Ztunnel' }, parentNode: 'istio-group', extent: 'parent' as const },
  { id: 'kiali', position: { x: 340, y: 40 }, data: { label: 'Kiali' }, parentNode: 'istio-group', extent: 'parent' as const },

  // Ingress & Networking
  {
    id: 'ingress-group',
    type: 'group',
    position: { x: 20, y: 320 },
    parentNode: 'ops-title',
    extent: 'parent' as const,
    style: { width: 420, height: 250, backgroundColor: '#d1fae5', border: '2px solid #10b981' },
    data: { label: '🌐 Ingress & Networking' },
  },
  { id: 'gateway-api', position: { x: 10, y: 40 }, data: { label: 'Gateway API' }, parentNode: 'ingress-group', extent: 'parent' as const },
  { id: 'envoy-gw', position: { x: 130, y: 40 }, data: { label: 'Envoy GW' }, parentNode: 'ingress-group', extent: 'parent' as const },
  { id: 'metallb', position: { x: 250, y: 40 }, data: { label: 'MetalLB' }, parentNode: 'ingress-group', extent: 'parent' as const },
  { id: 'cert-mgr', position: { x: 10, y: 100 }, data: { label: 'Cert Manager' }, parentNode: 'ingress-group', extent: 'parent' as const },
  { id: 'ext-dns', position: { x: 130, y: 100 }, data: { label: 'External DNS' }, parentNode: 'ingress-group', extent: 'parent' as const },
  { id: 'tailscale', position: { x: 270, y: 100 }, data: { label: 'Tailscale' }, parentNode: 'ingress-group', extent: 'parent' as const },

  // Monitoring
  {
    id: 'monitoring-group',
    type: 'group',
    position: { x: 460, y: 320 },
    parentNode: 'ops-title',
    extent: 'parent' as const,
    style: { width: 420, height: 250, backgroundColor: '#fef08a', border: '2px solid #eab308' },
    data: { label: '📊 Monitoring' },
  },
  { id: 'grafana', position: { x: 10, y: 40 }, data: { label: 'Grafana' }, parentNode: 'monitoring-group', extent: 'parent' as const },
  { id: 'prometheus', position: { x: 110, y: 40 }, data: { label: 'Prometheus' }, parentNode: 'monitoring-group', extent: 'parent' as const },
  { id: 'metrics-server', position: { x: 230, y: 40 }, data: { label: 'Metrics Server' }, parentNode: 'monitoring-group', extent: 'parent' as const },

  // Infrastructure
  {
    id: 'infra-ops-group',
    type: 'group',
    position: { x: 900, y: 320 },
    parentNode: 'ops-title',
    extent: 'parent' as const,
    style: { width: 420, height: 250, backgroundColor: '#e9d5ff', border: '2px solid #a855f7' },
    data: { label: '☁️ Infrastructure' },
  },
  { id: 'crossplane', position: { x: 10, y: 40 }, data: { label: 'Crossplane' }, parentNode: 'infra-ops-group', extent: 'parent' as const },
  { id: 'minio', position: { x: 120, y: 40 }, data: { label: 'MinIO' }, parentNode: 'infra-ops-group', extent: 'parent' as const },
  { id: 'cloudnative-pg', position: { x: 210, y: 40 }, data: { label: 'CloudNativePG' }, parentNode: 'infra-ops-group', extent: 'parent' as const },
  { id: 'openebs', position: { x: 10, y: 100 }, data: { label: 'OpenEBS' }, parentNode: 'infra-ops-group', extent: 'parent' as const },
  { id: 'knative', position: { x: 110, y: 100 }, data: { label: 'Knative' }, parentNode: 'infra-ops-group', extent: 'parent' as const },
  { id: 'gpu-ops', position: { x: 210, y: 100 }, data: { label: 'GPU Operators' }, parentNode: 'infra-ops-group', extent: 'parent' as const },
];

const initialEdges: Edge[] = [
  // Infrastructure to K8s
  { id: 'aws-k8s', source: 'aws', target: 'k8s-layer', animated: true },
  { id: 'azure-k8s', source: 'azure', target: 'k8s-layer', animated: true },
  { id: 'gcp-k8s', source: 'gcp', target: 'k8s-layer', animated: true },
  { id: 'tencent-k8s', source: 'tencent', target: 'k8s-layer', animated: true },
  { id: 'baremetal-k8s', source: 'baremetal', target: 'k8s-layer', animated: true },
  { id: 'kubespray-k8s', source: 'kubespray', target: 'k8s-layer', animated: true },
  { id: 'minikube-k8s', source: 'minikube', target: 'k8s-layer', animated: true },
  
  // K8s to Ops Layer
  { id: 'k8s-ops', source: 'k8s-layer', target: 'ops-title', animated: true, style: { stroke: '#f59e0b', strokeWidth: 3 } },
];

export default function PlatformArchitecture() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div style={{ width: '100%', height: '1200px' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        attributionPosition="bottom-left"
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
