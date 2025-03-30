
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Database } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { populateDummyData } from "@/utils/dummyDataService";
import { toast } from "@/hooks/use-toast";

const DummyDataButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const handlePopulateData = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "You need to be logged in to populate dummy data.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      const result = await populateDummyData(user.id);
      
      if (result.success) {
        toast({
          title: "Success!",
          description: "Dummy data has been populated successfully.",
        });
      } else {
        toast({
          title: "Operation Failed",
          description: result.message || "Failed to populate data.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Error populating dummy data:", error);
      toast({
        title: "Error",
        description: "Failed to populate dummy data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePopulateData}
      disabled={isLoading}
      className="bg-indigo-600 hover:bg-indigo-700 flex items-center gap-2"
    >
      <Database className="h-4 w-4" />
      {isLoading ? "Creating Data..." : "Populate Dummy Data"}
    </Button>
  );
};

export default DummyDataButton;
