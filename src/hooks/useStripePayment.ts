import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useStripePayment = () => {
  const [isLoading, setIsLoading] = useState(false);

  const processPayment = async (email: string) => {
    setIsLoading(true);
    try {
      console.log("=== STRIPE PAYMENT: Starting process ===");
      console.log("Email:", email);
      
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: { email }
      });

      console.log("=== STRIPE PAYMENT: Edge function response ===");
      console.log("Data:", data);
      console.log("Error:", error);

      if (error) {
        console.error("Edge function error:", error);
        toast.error(`Payment failed: ${error.message}`);
        return false;
      }

      if (!data?.url) {
        console.error("No payment URL received");
        toast.error("No payment URL received from server");
        return false;
      }
      
      console.log("=== STRIPE PAYMENT: Redirecting to Stripe ===");
      console.log("Stripe URL:", data.url);
      
      // Open Stripe checkout in a new tab
      window.open(data.url, '_blank');
      toast.success("Redirecting to Stripe checkout...");
      return true;
    } catch (error) {
      console.error("=== STRIPE PAYMENT: Error ===", error);
      toast.error(`Failed to create payment: ${error.message}`);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { processPayment, isLoading };
};