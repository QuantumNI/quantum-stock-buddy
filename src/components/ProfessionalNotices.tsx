import { AlertTriangle, Truck, Users, Phone } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const ProfessionalNotices = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <Alert className="border-primary/20 bg-primary/5">
        <Users className="h-4 w-4 text-primary" />
        <AlertDescription className="text-sm">
          <strong>Trade Account Required</strong> - Pricing shown for registered trade customers. 
          Bulk discounts available for quantities over 100.
        </AlertDescription>
      </Alert>
      
      <Alert className="border-success/20 bg-success/5">
        <Truck className="h-4 w-4 text-success" />
        <AlertDescription className="text-sm">
          <strong>Next Day Delivery</strong> available on orders placed before 2pm. 
          Free delivery on orders over £150.
        </AlertDescription>
      </Alert>
      
      <Alert className="border-primary/20 bg-primary/5">
        <Phone className="h-4 w-4 text-primary" />
        <AlertDescription className="text-sm">
          <strong>Technical Support</strong> - Our experts are available to help with product selection. 
          Call 028 9073 8989.
        </AlertDescription>
      </Alert>
      
      <Alert className="border-warning/20 bg-warning/5">
        <AlertTriangle className="h-4 w-4 text-warning" />
        <AlertDescription className="text-sm">
          <strong>Professional Use Only</strong> - These products are intended for use by qualified 
          tile installation professionals.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default ProfessionalNotices;