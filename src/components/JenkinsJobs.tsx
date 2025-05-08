
import { Clock, CheckCircle, AlertCircle, RefreshCw, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

type JenkinsJob = {
  id: string;
  name: string;
  status: "success" | "failure" | "in_progress" | "not_built";
  lastBuild: string;
  duration: string;
};

const jenkinsJobs: JenkinsJob[] = [
  {
    id: "1",
    name: "Backend-Build",
    status: "success",
    lastBuild: "10 minutes ago",
    duration: "2m 34s"
  },
  {
    id: "2",
    name: "Frontend-Build",
    status: "success",
    lastBuild: "15 minutes ago",
    duration: "1m 45s"
  },
  {
    id: "3",
    name: "Integration-Tests",
    status: "failure",
    lastBuild: "30 minutes ago",
    duration: "5m 12s"
  },
  {
    id: "4",
    name: "Deploy-Staging",
    status: "in_progress",
    lastBuild: "Now",
    duration: "1m 20s..."
  },
  {
    id: "5",
    name: "Security-Scan",
    status: "not_built",
    lastBuild: "Yesterday",
    duration: "10m 5s"
  }
];

const JenkinsJobs = () => {
  return (
    <div className="dashboard-card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Jenkins Jobs</h2>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <RefreshCw size={14} />
          <span>Refresh</span>
        </Button>
      </div>
      <div className="space-y-2">
        {jenkinsJobs.map((job) => (
          <div 
            key={job.id}
            className="flex items-center justify-between p-3 rounded-md border border-border hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              {job.status === "success" && (
                <CheckCircle className="h-5 w-5 text-green-500" />
              )}
              {job.status === "failure" && (
                <AlertCircle className="h-5 w-5 text-destructive" />
              )}
              {job.status === "in_progress" && (
                <Clock className="h-5 w-5 text-yellow-500 animate-pulse" />
              )}
              {job.status === "not_built" && (
                <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
              )}
              <div>
                <p className="font-medium">{job.name}</p>
                <div className="flex text-xs text-muted-foreground gap-2">
                  <span>{job.lastBuild}</span>
                  <span>•</span>
                  <span>{job.duration}</span>
                </div>
              </div>
            </div>
            <Button 
              variant={job.status === "in_progress" ? "outline" : "secondary"} 
              size="sm"
              disabled={job.status === "in_progress"}
              className="flex items-center gap-1"
            >
              <Play size={14} />
              <span>Run</span>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JenkinsJobs;
