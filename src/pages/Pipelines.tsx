
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, RefreshCw, GitBranch, Settings, ArrowRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

// Types for our pipeline data
type PipelineStage = {
  id: string;
  name: string;
  status: "success" | "fail" | "running" | "pending";
  startTime?: string;
  duration?: string;
};

type Pipeline = {
  id: string;
  name: string;
  repository: string;
  branch: string;
  lastRun: string;
  status: "success" | "fail" | "running" | "pending";
  stages: PipelineStage[];
};

// Sample data
const pipelineData: Pipeline[] = [
  {
    id: "p1",
    name: "Frontend Deployment",
    repository: "company/frontend-app",
    branch: "main",
    lastRun: "2 hours ago",
    status: "running",
    stages: [
      { id: "s1", name: "Checkout", status: "success", startTime: "2 hours ago", duration: "10s" },
      { id: "s2", name: "Build", status: "success", startTime: "1 hour 59 min ago", duration: "5m 30s" },
      { id: "s3", name: "Test", status: "success", startTime: "1 hour 54 min ago", duration: "10m 20s" },
      { id: "s4", name: "Deploy", status: "running", startTime: "1 hour 44 min ago", duration: "Running..." }
    ]
  },
  {
    id: "p2",
    name: "Backend API",
    repository: "company/backend-api",
    branch: "develop",
    lastRun: "3 hours ago",
    status: "fail",
    stages: [
      { id: "s1", name: "Checkout", status: "success", startTime: "3 hours ago", duration: "8s" },
      { id: "s2", name: "Build", status: "success", startTime: "2 hours 59 min ago", duration: "4m 12s" },
      { id: "s3", name: "Test", status: "fail", startTime: "2 hours 55 min ago", duration: "3m 24s" },
      { id: "s4", name: "Deploy", status: "pending" }
    ]
  },
  {
    id: "p3",
    name: "Database Migration",
    repository: "company/db-scripts",
    branch: "feature/new-schema",
    lastRun: "1 day ago",
    status: "success",
    stages: [
      { id: "s1", name: "Checkout", status: "success", startTime: "1 day ago", duration: "5s" },
      { id: "s2", name: "Validation", status: "success", startTime: "1 day ago", duration: "45s" },
      { id: "s3", name: "Backup", status: "success", startTime: "1 day ago", duration: "10m 30s" },
      { id: "s4", name: "Migration", status: "success", startTime: "1 day ago", duration: "5m 25s" }
    ]
  }
];

const Pipelines = () => {
  const [selectedPipeline, setSelectedPipeline] = useState<Pipeline | null>(null);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">CI/CD Pipelines</h1>
          <p className="text-muted-foreground">Manage and monitor your automated pipelines</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <RefreshCw size={14} />
            <span>Refresh</span>
          </Button>
          <Button size="sm" className="flex items-center gap-1">
            <Plus size={14} />
            <span>New Pipeline</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Pipelines</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="successful">Successful</TabsTrigger>
          <TabsTrigger value="failed">Failed</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4 mt-4">
          {pipelineData.map((pipeline) => (
            <PipelineCard 
              key={pipeline.id} 
              pipeline={pipeline} 
              onClick={() => setSelectedPipeline(pipeline)}
              isSelected={selectedPipeline?.id === pipeline.id}
            />
          ))}
        </TabsContent>
        <TabsContent value="active" className="space-y-4 mt-4">
          {pipelineData.filter(p => p.status === "running").map((pipeline) => (
            <PipelineCard 
              key={pipeline.id} 
              pipeline={pipeline} 
              onClick={() => setSelectedPipeline(pipeline)}
              isSelected={selectedPipeline?.id === pipeline.id}
            />
          ))}
        </TabsContent>
        <TabsContent value="successful" className="space-y-4 mt-4">
          {pipelineData.filter(p => p.status === "success").map((pipeline) => (
            <PipelineCard 
              key={pipeline.id} 
              pipeline={pipeline} 
              onClick={() => setSelectedPipeline(pipeline)}
              isSelected={selectedPipeline?.id === pipeline.id}
            />
          ))}
        </TabsContent>
        <TabsContent value="failed" className="space-y-4 mt-4">
          {pipelineData.filter(p => p.status === "fail").map((pipeline) => (
            <PipelineCard 
              key={pipeline.id} 
              pipeline={pipeline} 
              onClick={() => setSelectedPipeline(pipeline)}
              isSelected={selectedPipeline?.id === pipeline.id}
            />
          ))}
        </TabsContent>
      </Tabs>

      {selectedPipeline && (
        <PipelineDetails pipeline={selectedPipeline} />
      )}
    </div>
  );
};

// Pipeline Card Component
const PipelineCard = ({ 
  pipeline, 
  onClick, 
  isSelected 
}: { 
  pipeline: Pipeline; 
  onClick: () => void;
  isSelected: boolean;
}) => {
  return (
    <Card 
      className={cn(
        "cursor-pointer hover:shadow-md transition-all border",
        isSelected ? "border-primary bg-primary/5" : "border-border"
      )}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <StatusIndicator status={pipeline.status} />
            <div>
              <h3 className="font-medium">{pipeline.name}</h3>
              <div className="flex text-xs text-muted-foreground gap-2 items-center mt-1">
                <GitBranch size={12} />
                <span>{pipeline.repository}</span>
                <span>•</span>
                <span>{pipeline.branch}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="text-right mr-3">
              <p className="text-sm">Last run</p>
              <p className="text-sm text-muted-foreground">{pipeline.lastRun}</p>
            </div>
            <ArrowRight size={16} className="text-muted-foreground" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Status Indicator Component
const StatusIndicator = ({ status }: { status: Pipeline["status"] }) => {
  let bgColor = "";
  let statusText = "";

  switch (status) {
    case "success":
      bgColor = "bg-green-500";
      statusText = "Success";
      break;
    case "fail":
      bgColor = "bg-destructive";
      statusText = "Failed";
      break;
    case "running":
      bgColor = "bg-yellow-400";
      statusText = "Running";
      break;
    case "pending":
      bgColor = "bg-gray-300";
      statusText = "Pending";
      break;
  }

  return (
    <div className="flex items-center gap-1.5">
      <div className={`h-3 w-3 rounded-full ${bgColor} ${status === "running" && "animate-pulse"}`}></div>
      <span className="text-xs font-medium">{statusText}</span>
    </div>
  );
};

// Pipeline Details Component
const PipelineDetails = ({ pipeline }: { pipeline: Pipeline }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2">
              <StatusIndicator status={pipeline.status} />
              <span>{pipeline.name}</span>
            </CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1">
              <GitBranch size={14} />
              <span>{pipeline.repository} • {pipeline.branch}</span>
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Clock size={14} className="mr-1" />
              History
            </Button>
            <Button variant="outline" size="sm">
              <Settings size={14} className="mr-1" />
              Configure
            </Button>
            <Button size="sm">Run Pipeline</Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <h4 className="text-sm font-medium mb-3">Pipeline Stages</h4>
        <div className="relative flex justify-between items-center py-8 px-4">
          {/* Connecting line */}
          <div className="absolute left-0 right-0 top-1/2 h-1 bg-muted transform -translate-y-1/2"></div>
          
          {/* Stages */}
          {pipeline.stages.map((stage, index) => (
            <div key={stage.id} className="flex flex-col items-center z-10">
              <div 
                className={cn(
                  "relative flex items-center justify-center w-12 h-12 rounded-full shadow-lg z-10 transition-all",
                  stage.status === "success" ? "bg-green-500 text-white" :
                  stage.status === "fail" ? "bg-destructive text-white" :
                  stage.status === "running" ? "bg-yellow-400 animate-pulse" :
                  "bg-gray-300"
                )}
              >
                <div className="text-sm font-bold">{index + 1}</div>
              </div>
              <span className="mt-2 text-sm font-medium">{stage.name}</span>
              {stage.startTime && (
                <div className="mt-1 flex flex-col items-center text-xs text-muted-foreground">
                  <span>{stage.startTime}</span>
                  <span>{stage.duration}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Pipelines;
