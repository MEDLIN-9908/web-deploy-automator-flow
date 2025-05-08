
import { cn } from "@/lib/utils";

interface StatusCardProps {
  title: string;
  value: string | number;
  status?: "success" | "warning" | "error" | "info";
  icon: React.ReactNode;
  className?: string;
}

const StatusCard = ({ title, value, status = "info", icon, className }: StatusCardProps) => {
  const getStatusColor = () => {
    switch (status) {
      case "success": return "text-green-500";
      case "warning": return "text-yellow-500";
      case "error": return "text-destructive";
      default: return "text-primary";
    }
  };

  return (
    <div className={cn("dashboard-card", className)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className={cn("text-2xl font-bold mt-1", getStatusColor())}>{value}</h3>
        </div>
        <div className={cn("p-2 rounded-full", 
          status === "success" ? "bg-green-100" : 
          status === "warning" ? "bg-yellow-100" :
          status === "error" ? "bg-red-100" : 
          "bg-blue-100"
        )}>
          <div className={cn("h-8 w-8", getStatusColor())}>
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
