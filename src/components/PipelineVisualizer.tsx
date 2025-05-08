
import { useState } from "react";
import { Code, GitBranch, Box, Play, CheckCircle, XCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

type PipelineStage = {
  id: string;
  name: string;
  status: "success" | "fail" | "running" | "pending";
  icon: React.ReactNode;
};

interface PipelineProps {
  name: string;
  stages: PipelineStage[];
  createdAt: string;
}

const pipelines: PipelineProps[] = [
  {
    name: "Frontend Deployment",
    createdAt: "2 hours ago",
    stages: [
      { id: "1", name: "Code", status: "success", icon: <Code size={18} /> },
      { id: "2", name: "Build", status: "success", icon: <GitBranch size={18} /> },
      { id: "3", name: "Test", status: "success", icon: <Play size={18} /> },
      { id: "4", name: "Deploy", status: "running", icon: <Box size={18} /> }
    ]
  },
  {
    name: "Backend API",
    createdAt: "3 hours ago",
    stages: [
      { id: "1", name: "Code", status: "success", icon: <Code size={18} /> },
      { id: "2", name: "Build", status: "success", icon: <GitBranch size={18} /> },
      { id: "3", name: "Test", status: "fail", icon: <Play size={18} /> },
      { id: "4", name: "Deploy", status: "pending", icon: <Box size={18} /> }
    ]
  }
];

const PipelineVisualizer = () => {
  return (
    <div className="dashboard-card">
      <h2 className="text-lg font-semibold mb-4">Active Pipelines</h2>
      <div className="space-y-6">
        {pipelines.map((pipeline) => (
          <Pipeline key={pipeline.name} {...pipeline} />
        ))}
      </div>
    </div>
  );
};

const Pipeline = ({ name, stages, createdAt }: PipelineProps) => {
  return (
    <div className="border-b border-border pb-4 last:border-0 last:pb-0">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium">{name}</h3>
        <span className="text-sm text-muted-foreground">{createdAt}</span>
      </div>
      <div className="relative flex justify-between items-center py-4">
        {/* Connecting line */}
        <div className="pipeline-line left-0 right-0 top-1/2 transform -translate-y-1/2"></div>
        
        {/* Stages */}
        {stages.map((stage, index) => (
          <div key={stage.id} className="flex flex-col items-center z-10">
            <div className={cn(
              "pipeline-node",
              stage.status === "success" && "pipeline-node-success",
              stage.status === "fail" && "pipeline-node-fail",
              stage.status === "running" && "pipeline-node-running",
            )}>
              {stage.status === "success" ? (
                <CheckCircle size={20} />
              ) : stage.status === "fail" ? (
                <XCircle size={20} />
              ) : stage.status === "running" ? (
                <Clock size={20} />
              ) : (
                stage.icon
              )}
            </div>
            <span className="mt-2 text-sm font-medium">{stage.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PipelineVisualizer;
