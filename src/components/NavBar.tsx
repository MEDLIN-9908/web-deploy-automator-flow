
import { Home, Activity, Box, Server, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const NavItem = ({ href, icon, label }: NavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === href;
  
  return (
    <Link to={href}>
      <div
        className={cn(
          "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
          isActive
            ? "bg-primary text-primary-foreground"
            : "hover:bg-muted text-muted-foreground hover:text-foreground"
        )}
      >
        <div className="text-lg">{icon}</div>
        <span className="font-medium">{label}</span>
      </div>
    </Link>
  );
};

const NavBar = () => {
  return (
    <div className="h-screen border-r bg-card px-3 py-8">
      <div className="flex items-center gap-2 px-2 mb-8">
        <div className="rounded-md bg-primary p-1.5">
          <Server className="h-6 w-6 text-primary-foreground" />
        </div>
        <h1 className="text-xl font-bold">DeployFlow</h1>
      </div>
      <nav className="space-y-2">
        <NavItem href="/" icon={<Home size={18} />} label="Dashboard" />
        <NavItem href="/pipelines" icon={<Activity size={18} />} label="Pipelines" />
        <NavItem href="/containers" icon={<Box size={18} />} label="Containers" />
        <NavItem href="/settings" icon={<Settings size={18} />} label="Settings" />
      </nav>
    </div>
  );
};

export default NavBar;
