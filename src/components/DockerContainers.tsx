
import { RefreshCw, Info, Play, Square, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Container = {
  id: string;
  name: string;
  image: string;
  status: "running" | "stopped" | "restarting";
  created: string;
  ports: string;
};

const containers: Container[] = [
  {
    id: "a23bc4d5",
    name: "web-server",
    image: "nginx:latest",
    status: "running",
    created: "3 days ago",
    ports: "80:80, 443:443"
  },
  {
    id: "b34cd5e6",
    name: "api-service",
    image: "node:16-alpine",
    status: "running",
    created: "1 day ago",
    ports: "3000:3000"
  },
  {
    id: "c45de6f7",
    name: "database",
    image: "postgres:14",
    status: "stopped",
    created: "5 days ago",
    ports: "5432:5432"
  },
  {
    id: "d56ef7g8",
    name: "cache-service",
    image: "redis:alpine",
    status: "restarting",
    created: "2 days ago",
    ports: "6379:6379"
  }
];

const DockerContainers = () => {
  return (
    <div className="dashboard-card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Docker Containers</h2>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <RefreshCw size={14} />
          <span>Refresh</span>
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="text-xs uppercase border-b border-border">
            <tr>
              <th className="text-left py-3 font-medium">Name</th>
              <th className="text-left py-3 font-medium">Image</th>
              <th className="text-left py-3 font-medium">Status</th>
              <th className="text-left py-3 font-medium">Created</th>
              <th className="text-left py-3 font-medium">Ports</th>
              <th className="text-right py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {containers.map((container) => (
              <tr key={container.id} className="hover:bg-muted/50">
                <td className="py-3">{container.name}</td>
                <td className="py-3 text-sm">{container.image}</td>
                <td className="py-3">
                  <span className={cn(
                    "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                    container.status === "running" ? "bg-green-100 text-green-800" :
                    container.status === "stopped" ? "bg-gray-100 text-gray-800" :
                    "bg-yellow-100 text-yellow-800"
                  )}>
                    {container.status}
                  </span>
                </td>
                <td className="py-3 text-sm">{container.created}</td>
                <td className="py-3 text-sm">{container.ports}</td>
                <td className="py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" title="Info">
                      <Info size={16} />
                    </Button>
                    {container.status === "running" ? (
                      <Button variant="ghost" size="icon" title="Stop">
                        <Square size={16} />
                      </Button>
                    ) : (
                      <Button variant="ghost" size="icon" title="Start">
                        <Play size={16} />
                      </Button>
                    )}
                    <Button variant="ghost" size="icon" title="Delete">
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DockerContainers;
