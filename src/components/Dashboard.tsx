
import PipelineStatus from "./PipelineStatus";
import PipelineVisualizer from "./PipelineVisualizer";
import DockerContainers from "./DockerContainers";
import JenkinsJobs from "./JenkinsJobs";

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Manage your CI/CD pipelines and containers</p>
      </div>
      
      <PipelineStatus />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PipelineVisualizer />
        <JenkinsJobs />
      </div>
      
      <DockerContainers />
    </div>
  );
};

export default Dashboard;
