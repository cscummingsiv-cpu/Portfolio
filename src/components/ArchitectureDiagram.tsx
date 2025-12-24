"use client";

import React, { useCallback, useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import ReactFlow, {
  Background,
  Controls,
  Edge,
  MarkerType,
  Node,
  Position,
  ReactFlowInstance,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";

interface Stage {
  id: string;
  label: string;
  sectionTitle: string;
  sectionColor: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

// Stage definitions with positions and section backgrounds
const stages: Stage[] = [
  {
    id: "retrieve",
    label: "Retrieve Podcast URLs",
    sectionTitle: "Retrieve Podcast URLs",
    sectionColor: "rgba(251, 191, 36, 0.1)", // Yellow tint
    x: 50,
    y: 200,
    width: 280,
    height: 120,
  },
  {
    id: "deduplication",
    label: "Deduplication",
    sectionTitle: "Deduplication",
    sectionColor: "rgba(249, 115, 22, 0.1)", // Orange tint
    x: 400,
    y: 200,
    width: 280,
    height: 120,
  },
  {
    id: "transcription",
    label: "Podcast Transcription",
    sectionTitle: "Podcast Transcription",
    sectionColor: "rgba(255, 255, 255, 0.5)", // White tint
    x: 750,
    y: 200,
    width: 280,
    height: 120,
  },
  {
    id: "pitch",
    label: "Pitch Generation",
    sectionTitle: "Pitch Generation",
    sectionColor: "rgba(147, 197, 253, 0.1)", // Light blue tint
    x: 1100,
    y: 200,
    width: 280,
    height: 120,
  },
  {
    id: "airtable",
    label: "Write to Airtable",
    sectionTitle: "Write to Airtable",
    sectionColor: "rgba(134, 239, 172, 0.1)", // Light green tint
    x: 1450,
    y: 200,
    width: 280,
    height: 120,
  },
  {
    id: "output",
    label: "Editorial Output",
    sectionTitle: "Editorial Output",
    sectionColor: "rgba(229, 231, 235, 0.3)", // Gray tint
    x: 1800,
    y: 200,
    width: 280,
    height: 120,
  },
];

function createNodes(): Node[] {
  return stages.map((stage) => ({
    id: stage.id,
    type: "default",
    position: { x: stage.x, y: stage.y },
    data: {
      label: (
        <div className="text-center">
          <div className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
            {stage.label}
          </div>
        </div>
      ),
    },
    style: {
      width: stage.width,
      height: stage.height,
      borderRadius: 16,
      border: "2px solid rgba(24,24,27,0.15)",
      background: "white",
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      fontSize: 14,
      fontWeight: 500,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    draggable: false,
    selectable: false,
  }));
}

function createEdges(): Edge[] {
  const edges: Edge[] = [];
  for (let i = 0; i < stages.length - 1; i++) {
    edges.push({
      id: `edge-${stages[i].id}-${stages[i + 1].id}`,
      source: stages[i].id,
      target: stages[i + 1].id,
      type: "straight",
      animated: false,
      markerEnd: { type: MarkerType.ArrowClosed },
      style: {
        strokeWidth: 2.5,
        stroke: "rgba(24,24,27,0.4)",
      },
    });
  }
  return edges;
}

function createSectionBackgrounds(): Node[] {
  return stages.map((stage) => ({
    id: `section-${stage.id}`,
    type: "default",
    position: { x: stage.x - 20, y: stage.y - 60 },
    data: {
      label: (
        <div>
          <div className="text-xs font-semibold text-zinc-600 dark:text-zinc-500 mb-2">
            {stage.sectionTitle}
          </div>
        </div>
      ),
    },
    style: {
      width: stage.width + 40,
      height: stage.height + 80,
      borderRadius: 12,
      background: stage.sectionColor,
      border: "1px solid rgba(24,24,27,0.08)",
      fontSize: 11,
      padding: "12px 16px",
      zIndex: -1,
    },
    draggable: false,
    selectable: false,
    connectable: false,
  }));
}

export interface ArchitectureDiagramRef {
  fitView: () => void;
}

interface ArchitectureDiagramProps {
  showHeader?: boolean;
  className?: string;
  isInModal?: boolean;
}

export const ArchitectureDiagram = forwardRef<ArchitectureDiagramRef, ArchitectureDiagramProps>(
  ({ showHeader = false, className = "", isInModal = false }, ref) => {
    const initialNodes = React.useMemo(() => {
      const sectionNodes = createSectionBackgrounds();
      const stageNodes = createNodes();
      return [...sectionNodes, ...stageNodes];
    }, []);

    const initialEdges = React.useMemo(() => createEdges(), []);

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const reactFlowInstance = useRef<ReactFlowInstance | null>(null);
    const fitViewCalled = useRef(false);

    const fitView = useCallback(() => {
      if (reactFlowInstance.current) {
        reactFlowInstance.current.fitView({
          padding: 0.18,
          duration: 250,
        });
        fitViewCalled.current = true;
      }
    }, []);

    useImperativeHandle(ref, () => ({
      fitView,
    }), [fitView]);

    const onInit = useCallback((instance: ReactFlowInstance) => {
      reactFlowInstance.current = instance;
      fitViewCalled.current = false;
    }, []);

    // Call fitView after component mounts
    useEffect(() => {
      if (!reactFlowInstance.current) return;

      const delay = isInModal ? 300 : 150;
      const timer = setTimeout(() => {
        requestAnimationFrame(() => {
          fitView();
        });
      }, delay);

      return () => clearTimeout(timer);
    }, [isInModal, fitView]);

    // Reset and refit when modal opens
    useEffect(() => {
      if (isInModal && reactFlowInstance.current && !fitViewCalled.current) {
        const timer = setTimeout(() => {
          requestAnimationFrame(() => {
            fitView();
          });
        }, 400);
        return () => clearTimeout(timer);
      }
    }, [isInModal, fitView]);

    const containerClass = showHeader 
      ? "rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6"
      : "";

    const heightClass = isInModal 
      ? "h-[70vh] min-h-[560px]"
      : "h-[420px] md:h-[520px]";

    return (
      <div className={`w-full ${className}`}>
        {showHeader && (
          <div className="mb-4">
            <h3 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              System Architecture
            </h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Ingestion → n8n orchestration → LLM processing → structured output
            </p>
          </div>
        )}
        <div className={containerClass}>
          <div className={`${heightClass} w-full overflow-hidden rounded-lg`}>
            <ReactFlow
              onInit={onInit}
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              panOnDrag={false}
              zoomOnScroll={false}
              zoomOnPinch={false}
              nodesDraggable={false}
              nodesConnectable={false}
              elementsSelectable={false}
              proOptions={{ hideAttribution: true }}
              fitView
              fitViewOptions={{
                padding: 0.18,
                includeHiddenNodes: false,
                minZoom: 0.3,
                maxZoom: 1.2,
              }}
            >
              <Background 
                gap={20} 
                color="rgba(24,24,27,0.02)"
                size={0.5}
              />
              <Controls className="hidden" />
            </ReactFlow>
          </div>
        </div>
      </div>
    );
  }
);

ArchitectureDiagram.displayName = "ArchitectureDiagram";
