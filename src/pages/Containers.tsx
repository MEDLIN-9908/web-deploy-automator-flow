
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Play, Square, RefreshCw, Plus, Search, Trash2, Info } from "lucide-react";
import { cn } from "@/lib/utils";

type Container = {
  id: string;
  name: string;
  image: string;
  status: "running" | "stopped" | "restarting";
  created: string;
  ports: string;
  cpu: string;
  memory: string;
};

// Sample containers data
const containersData: Container[] = [
  {
    id: "a23bc4d5e6f7",
    name: "web-server",
    image: "nginx:latest",
    status: "running",
    created: "3 days ago",
    ports: "80:80, 443:443",
    cpu: "0.1%",
    memory: "128MB / 512MB"
  },
  {
    id: "b34cd5e6f7g8",
    name: "api-service",
    image: "node:16-alpine",
    status: "running",
    created: "1 day ago",
    ports: "3000:3000",
    cpu: "0.5%",
    memory: "256MB / 1GB"
  },
  {
    id: "c45de6f7g8h9",
    name: "database",
    image: "postgres:14",
    status: "stopped",
    created: "5 days ago",
    ports: "5432:5432",
    cpu: "0%",
    memory: "0MB / 1GB"
  },
  {
    id: "d56ef7g8h9i0",
    name: "cache-service",
    image: "redis:alpine",
    status: "restarting",
    created: "2 days ago",
    ports: "6379:6379",
    cpu: "0.2%",
    memory: "64MB / 256MB"
  },
  {
    id: "e67fg8h9i0j1",
    name: "monitoring",
    image: "grafana/grafana:latest",
    status: "running",
    created: "1 week ago",
    ports: "3000:3000",
    cpu: "0.3%",
    memory: "96MB / 256MB"
  }
];

const Containers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredContainers = containersData.filter(container => 
    container.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    container.image.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Docker Containers</h1>
          <p className="text-muted-foreground">Manage and monitor your Docker containers</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <RefreshCw size={14} />
            <span>Refresh</span>
          </Button>
          <Button size="sm" className="flex items-center gap-1">
            <Plus size={14} />
            <span>New Container</span>
          </Button>
        </div>
      </div>

      <div className="flex items-center w-full max-w-sm">
        <Input
          placeholder="Search containers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mr-2"
        />
        <Button variant="outline" size="icon" className="shrink-0">
          <Search size={18} />
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="running">Running</TabsTrigger>
          <TabsTrigger value="stopped">Stopped</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <ContainerTable containers={filteredContainers} />
        </TabsContent>
        <TabsContent value="running" className="mt-4">
          <ContainerTable containers={filteredContainers.filter(c => c.status === "running")} />
        </TabsContent>
        <TabsContent value="stopped" className="mt-4">
          <ContainerTable containers={filteredContainers.filter(c => c.status === "stopped")} />
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Resource Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <ResourceCard title="Total Containers" value={containersData.length} />
            <ResourceCard title="Running" value={containersData.filter(c => c.status === "running").length} />
            <ResourceCard title="CPU Usage" value="1.1%" />
            <ResourceCard title="Memory Usage" value="544MB / 3GB" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const ContainerTable = ({ containers }: { containers: Container[] }) => {
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Ports</TableHead>
            <TableHead>CPU / Memory</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {containers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4">
                No containers found
              </TableCell>
            </TableRow>
          ) : (
            containers.map((container) => (
              <TableRow key={container.id}>
                <TableCell className="font-medium">{container.name}</TableCell>
                <TableCell className="text-sm">{container.image}</TableCell>
                <TableCell>
                  <StatusBadge status={container.status} />
                </TableCell>
                <TableCell className="text-sm">{container.ports}</TableCell>
                <TableCell className="text-sm">
                  {container.cpu} / {container.memory}
                </TableCell>
                <TableCell className="text-right">
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
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

const StatusBadge = ({ status }: { status: Container["status"] }) => {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
        status === "running" ? "bg-green-100 text-green-800" :
        status === "stopped" ? "bg-gray-100 text-gray-800" :
        "bg-yellow-100 text-yellow-800"
      )}
    >
      {status === "running" && <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>}
      {status === "stopped" && <span className="w-1.5 h-1.5 bg-gray-500 rounded-full mr-1.5"></span>}
      {status === "restarting" && <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-1.5 animate-pulse"></span>}
      {status}
    </span>
  );
};

const ResourceCard = ({ title, value }: { title: string; value: string | number }) => {
  return (
    <Card>
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </CardContent>
    </Card>
  );
};

export default Containers;
