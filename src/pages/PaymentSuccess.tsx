import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export const PaymentSuccess = () => {
  useEffect(() => {
    // Auto-redirect to Calendly after 3 seconds
    const timer = setTimeout(() => {
      window.location.href = "https://calendly.com/your-calendly-link";
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleCalendlyRedirect = () => {
    window.location.href = "https://calendly.com/your-calendly-link";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md mx-auto text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Payment Successful!</CardTitle>
          <CardDescription>
            Thank you for your payment. Your consultation booking has been confirmed.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            You will be automatically redirected to schedule your meeting in 3 seconds...
          </p>
          <Button 
            onClick={handleCalendlyRedirect}
            className="w-full"
            size="lg"
          >
            Schedule Your Meeting Now
          </Button>
          <p className="text-xs text-muted-foreground">
            Or click the button above to schedule immediately
          </p>
        </CardContent>
      </Card>
    </div>
  );
};