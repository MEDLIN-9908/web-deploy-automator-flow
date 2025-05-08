
import { BarChart, CheckCircle, AlertCircle, Clock, Activity } from "lucide-react";
import StatusCard from "./StatusCard";

const pipelineData = {
  successful: 24,
  failed: 3,
  running: 2,
  total: 29
};

const PipelineStatus = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatusCard 
        title="Successful Deployments" 
        value={pipelineData.successful} 
        status="success" 
        icon={<CheckCircle className="h-full w-full" />} 
      />
      <StatusCard 
        title="Failed Deployments" 
        value={pipelineData.failed} 
        status="error" 
        icon={<AlertCircle className="h-full w-full" />} 
      />
      <StatusCard 
        title="Running Pipelines" 
        value={pipelineData.running} 
        status="warning" 
        icon={<Clock className="h-full w-full" />} 
      />
      <StatusCard 
        title="Total Pipelines" 
        value={pipelineData.total} 
        status="info" 
        icon={<BarChart className="h-full w-full" />} 
      />
    </div>
  );
};

export default PipelineStatus;
