import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const BookingPayment = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const handleInitialBooking = () => {
    setShowPaymentForm(true);
  };

  const handlePayment = async () => {
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);
    try {
      console.log("Calling create-payment function...");
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: { email }
      });

      if (error) {
        console.error("Edge function error:", error);
        throw error;
      }

      console.log("Payment session created:", data);
      
      if (data?.url) {
        // Open Stripe checkout in a new tab
        window.open(data.url, '_blank');
      } else {
        throw new Error("No payment URL received");
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Failed to create payment session. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle>Book Your Consultation</CardTitle>
        <CardDescription>
          30-minute consultation session - $35.00
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!showPaymentForm ? (
          <div className="space-y-4">
            <div className="text-center p-4 bg-primary/10 rounded-lg">
              <p className="text-2xl font-bold text-primary">$35.00</p>
              <p className="text-sm text-muted-foreground">One-time payment</p>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>✓ 30-minute consultation session</p>
              <p>✓ Personalized bioinformatics advice</p>
              <p>✓ Project roadmap discussion</p>
              <p>✓ Technical guidance</p>
            </div>
            <Button 
              onClick={handleInitialBooking}
              className="w-full"
              size="lg"
            >
              Book Consultation - $35
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center p-3 bg-primary/10 rounded-lg">
              <p className="text-lg font-semibold">Payment Required: $35.00</p>
            </div>
            <div>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button 
              onClick={handlePayment}
              disabled={isLoading}
              className="w-full"
              size="lg"
            >
              {isLoading ? "Processing..." : "Pay $35 & Book Meeting"}
            </Button>
            <Button 
              onClick={() => setShowPaymentForm(false)}
              variant="outline"
              className="w-full"
            >
              Back
            </Button>
          </div>
        )}
        <p className="text-xs text-muted-foreground text-center">
          After payment, you'll be redirected to schedule your meeting
        </p>
      </CardContent>
    </Card>
  );
};