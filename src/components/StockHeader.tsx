import { Phone, Wifi } from "lucide-react";

const StockHeader = () => {
  return (
    <header className="bg-gradient-primary text-white shadow-elevated">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="mb-4 lg:mb-0">
            <h1 className="text-3xl lg:text-4xl font-bold mb-2">
              Quantum Stock Availability Portal
            </h1>
            <p className="text-lg text-white/90">
              Tile Accessories & Installation Tools
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 text-sm">
            <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse-slow"></div>
              <span>Last synced: 2 minutes ago</span>
            </div>
            
            <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
              <Phone className="h-4 w-4" />
              <span>Need help? Call 028 9073 8989</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default StockHeader;