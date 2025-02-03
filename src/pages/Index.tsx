import { useState } from "react";
import { Button } from "@/components/ui/button";
import TicketDialog from "@/components/TicketDialog";

const Index = () => {
  const [isTicketOpen, setIsTicketOpen] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Button 
        onClick={() => setIsTicketOpen(true)}
        className="bg-blue-600 hover:bg-blue-700"
      >
        Open Ticket
      </Button>
      
      <TicketDialog 
        isOpen={isTicketOpen} 
        onClose={() => setIsTicketOpen(false)} 
      />
    </div>
  );
};

export default Index;