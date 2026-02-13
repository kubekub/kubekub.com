import { useCallback, useMemo } from 'react';
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

interface Technology {
  name: string;
  description: string;
  category: string;
  subcategory?: string;
}

interface Category {
  description: string;
  technologies: Technology[];
}

interface PlatformData {
  platform: {
    name: string;
    description: string;
    management: string;
  };
  categories: {
    [key: string]: Category;
  };
}

interface PlatformArchitectureProps {
  platformData: PlatformData;
}

const nodeDefaults = {
  sourcePosition: Position.Bottom,
  targetPosition: Position.Top,
};

// Category styling configuration
const categoryStyles: Record<string, { bg: string; border: string; label: string; emoji: string }> = {
  ai: { bg: '#dbeafe', border: '#3b82f6', label: 'AI & ML', emoji: '🤖' },
  security: { bg: '#fecaca', border: '#ef4444', label: 'Security', emoji: '🔒' },
  istio: { bg: '#e0e7ff', border: '#6366f1', label: 'Service Mesh', emoji: '🕸️' },
  ingress: { bg: '#d1fae5', border: '#10b981', label: 'Ingress & Networking', emoji: '🌐' },
  monitoring: { bg: '#fef08a', border: '#eab308', label: 'Monitoring', emoji: '📊' },
  base: { bg: '#e9d5ff', border: '#a855f7', label: 'Infrastructure', emoji: '☁️' },
  gpu: { bg: '#fce7f3', border: '#ec4899', label: 'GPU', emoji: '⚡' },
  serverless: { bg: '#ccfbf1', border: '#14b8a6', label: 'Serverless', emoji: '⚙️' },
  crossplane: { bg: '#ddd6fe', border: '#8b5cf6', label: 'Crossplane', emoji: '🔗' },
  database: { bg: '#fed7aa', border: '#f97316', label: 'Database', emoji: '💾' },
};

function generateNodesFromData(platformData: PlatformData): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  // Infrastructure Layer (static)
  nodes.push({
    id: 'infra-title',
    type: 'group',
    position: { x: 0, y: 0 },
    style: { width: 1400, height: 200, backgroundColor: '#f0f9ff', border: '2px solid #0ea5e9' },
    data: { label: 'Infrastructure Layer' },
  });

  const infraProviders = [
    { id: 'aws', label: '☁️ AWS', color: '#ff9900' },
    { id: 'azure', label: '☁️ Azure', color: '#0078d4' },
    { id: 'gcp', label: '☁️ GCP', color: '#4285f4' },
    { id: 'tencent', label: '☁️ Tencent', color: '#006eff' },
    { id: 'baremetal', label: '🖥️ Bare Metal', color: '#64748b' },
    { id: 'kubespray', label: '⚙️ Kubespray', color: '#326ce5' },
    { id: 'minikube', label: '💻 Minikube', color: '#326ce5' },
  ];

  infraProviders.forEach((provider, idx) => {
    nodes.push({
      id: provider.id,
      position: { x: 50 + idx * 200, y: 50 },
      data: { label: provider.label },
      parentNode: 'infra-title',
      extent: 'parent' as const,
      style: { backgroundColor: provider.color, color: 'white', border: 'none', fontWeight: 'bold' },
    });
    edges.push({
      id: `${provider.id}-k8s`,
      source: provider.id,
      target: 'k8s-layer',
      animated: true,
    });
  });

  // Kubernetes Layer (static)
  nodes.push({
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
  });

  edges.push({
    id: 'k8s-ops',
    source: 'k8s-layer',
    target: 'ops-title',
    animated: true,
    style: { stroke: '#f59e0b', strokeWidth: 3 },
  });

  // Kubekub-Ops Layer (static container)
  nodes.push({
    id: 'ops-title',
    type: 'group',
    position: { x: 0, y: 400 },
    style: { width: 1400, height: 650, backgroundColor: '#fef3c7', border: '2px solid #f59e0b' },
    data: { label: 'Kubekub-Ops Layer (GitOps Managed)' },
  });

  // Generate category groups and technologies dynamically
  const categories = Object.entries(platformData.categories);
  const categoriesPerRow = 3;
  const categoryWidth = 420;
  const categoryHeight = 250;
  const categorySpacing = 20;

  categories.forEach(([categoryKey, categoryData], idx) => {
    const row = Math.floor(idx / categoriesPerRow);
    const col = idx % categoriesPerRow;
    const xPos = categorySpacing + col * (categoryWidth + categorySpacing);
    const yPos = 50 + row * (categoryHeight + categorySpacing);

    const style = categoryStyles[categoryKey] || {
      bg: '#f3f4f6',
      border: '#9ca3af',
      label: categoryKey,
      emoji: '📦',
    };

    // Create category group
    const groupId = `${categoryKey}-group`;
    nodes.push({
      id: groupId,
      type: 'group',
      position: { x: xPos, y: yPos },
      parentNode: 'ops-title',
      extent: 'parent' as const,
      style: {
        width: categoryWidth,
        height: categoryHeight,
        backgroundColor: style.bg,
        border: `2px solid ${style.border}`,
      },
      data: { label: `${style.emoji} ${style.label}` },
    });

    // Add technologies within the group
    const technologies = categoryData.technologies || [];
    const techsPerRow = 3;
    const techWidth = 120;
    const techSpacing = 10;

    technologies.forEach((tech, techIdx) => {
      const techRow = Math.floor(techIdx / techsPerRow);
      const techCol = techIdx % techsPerRow;
      const techX = techSpacing + techCol * techWidth;
      const techY = 40 + techRow * 60;

      nodes.push({
        id: `${categoryKey}-${tech.name.toLowerCase().replace(/\s+/g, '-')}`,
        position: { x: techX, y: techY },
        data: { label: tech.name },
        parentNode: groupId,
        extent: 'parent' as const,
      });
    });
  });

  return { nodes, edges };
}

export default function PlatformArchitecture({ platformData }: PlatformArchitectureProps) {
  const { nodes: initialNodes, edges: initialEdges } = useMemo(
    () => generateNodesFromData(platformData),
    [platformData]
  );

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
