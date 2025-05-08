
import NavBar from "@/components/NavBar";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-64 flex-shrink-0">
        <NavBar />
      </div>
      <div className="flex-1 overflow-y-auto">
        <Dashboard />
      </div>
    </div>
  );
};

export default Index;
